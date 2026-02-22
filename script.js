import { getCoordinatesByCityName, getCurrentWeather, getWeatherForecast, getWeatherIcon } from "./modules/weather-api-calls.js";
import { checkInput } from "./modules/checkInput.js";
import { createModal } from "./modules/buildModal.js";
import { onMoreInfo } from "./modules/infoWeather.js";
import { updateInterface, translations, getCurrentLang } from "./modules/settings.js";

const cityInput = document.getElementById('city');
const submit = document.getElementById('submit');
const cardCityInput = document.getElementById('cardCityInput');
const defaultCard = document.getElementById('defaultCard');

const defaultCities = ["Roma", "Milano", "Napoli", "Torino", "Parigi", "Londra", "New York", "Toronto"];
let lastSearchedCity = "";

document.addEventListener('DOMContentLoaded', () => {
    const savedUnit = localStorage.getItem('units') || 'metric';
    const activeBtn = document.querySelector(`input[name="units"][value="${savedUnit}"]`);
    if (activeBtn) activeBtn.checked = true;

    updateInterface();
    getDataMainCard();
});

submit.addEventListener('click', (e) => {
    e.preventDefault();
    searchCityWeather(cityInput.value);
});

function searchCityWeather(city) {
    if (!checkInput(city)) return;
    const lang = getCurrentLang();
    const t = translations[lang] || translations['it'];
    
    if (!checkInput(city)) return;

    lastSearchedCity = city;

    getCoordinatesByCityName(city)
        .then((geoData) => {
            const lat = geoData.lat !== undefined ? geoData.lat : geoData[0].lat;
            const lon = geoData.lon !== undefined ? geoData.lon : geoData[0].lon;
            return Promise.all([
                getCurrentWeather(lat, lon),
                getWeatherForecast(lat, lon)
            ]);
        })
        .then(data => {
            const currentWeather = data[0];
            const forecastData = data[1];
            const info = setCardWeather(currentWeather);

            // Rendo visibile il contenitore e rigenero l'HTML
            cardCityInput.classList.remove('d-none');
            createCard(cardCityInput, true); 
            fillCard(cardCityInput, info, forecastData);
            
            cityInput.value = "";
        })
        .catch(error => {
            console.error(error);
            if (error.message === "CITY_NOT_FOUND") {
                createModal({ title: t.cityNotFoundTitle, body: t.cityNotFoundBody(city) });
            } else {
                createModal({ title: t.genericErrorTitle, body: t.genericErrorBody });
            }
        });
}

function createCard(container, hasCloseButton = false) {
    const lang = getCurrentLang();
    const t = translations[lang] || translations['it'];

    const closeBtnHtml = hasCloseButton ? 
        `<button type="button" class="btn-close position-absolute top-0 end-0 m-3" id="closeCardBtn" aria-label="Close"></button>` : "";
    
    container.innerHTML = `
        <div class="card shadow border-0 rounded-4 mx-auto" style="max-width:20rem; height: 100%; min-height:22rem; overflow: hidden;">
            ${closeBtnHtml}
            <div class="card-body text-center p-3">
                <h5 class="card-title fw-bold mb-3 text-primary" style="min-height: 3rem; display:flex; align-items:center; justify-content:center;"></h5>
                <div class="py-2">
                    <img src="" class="card-icon" style="width: 80px; height: 80px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.4));">
                </div>
                <p class="card-text card-description fs-6 text-capitalize"></p>
                <button class="btn btn-primary btn-more-info" id="moreInfoBtn">${t.moreInfo}</button>
            </div>
        </div>`;
}

function fillCard(container, info, forecastData) {
    container.querySelector('.card-title').innerText = info.cityName;
    container.querySelector('.card-icon').src = info.icon;
    container.querySelector('.card-temperature') 
        ? container.querySelector('.card-temperature').innerText = info.temperature + "°"
        : container.querySelector('.card-title').innerHTML += `<br>${info.temperature}°`;
    
    container.querySelector('.card-description').innerText = info.description;

    const btn = container.querySelector(".btn-more-info");
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener("click", (e) => {
        e.preventDefault();
        onMoreInfo(forecastData, info.cityName);
    });

    // Gestione Bottone Chiudi
    const closeBtn = container.querySelector("#closeCardBtn");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            cardCityInput.classList.add('d-none');
            cardCityInput.innerHTML = "";
            lastSearchedCity = ""; 
        });
    }
}

function setCardWeather(data) {
    return {
        cityName: data.name,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: getWeatherIcon(data.weather[0].icon)
    };
}

//funzione di caricamento per le città di dafault
function getDataMainCard() {
    defaultCard.innerHTML = `<div class="text-center w-100"><div class="spinner-border text-primary" role="status"></div></div>`;

    Promise.all(
        defaultCities.map(city =>
            getCoordinatesByCityName(city)
                .then(geoData => {
                    const lat = geoData.lat !== undefined ? geoData.lat : geoData[0].lat;
                    const lon = geoData.lon !== undefined ? geoData.lon : geoData[0].lon;
                    return Promise.all([getCurrentWeather(lat, lon), getWeatherForecast(lat, lon)]);
                })
        )
    )
    .then(results => {
        defaultCard.innerHTML = ""; 
        results.forEach(dataSet => {
            const info = setCardWeather(dataSet[0]);
            const forecastData = dataSet[1];

            const col = document.createElement("div");
            col.classList.add("col-6", "col-sm-4", "col-xl-3", "mb-4");
            
            createCard(col, false);
            fillCard(col, info, forecastData);
            defaultCard.appendChild(col);
        });
    })
    .catch(err => console.error("Errore Main Cards:", err));
}

// cambio lingua
document.querySelectorAll('.lang-switch').forEach(pulsante => {
    pulsante.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = e.currentTarget.getAttribute('data-lang');
        localStorage.setItem('language', lang);
        
        updateInterface();
        getDataMainCard(); 

        if (lastSearchedCity !== "") {
            searchCityWeather(lastSearchedCity);
        }
    });
});
// cambio unità
document.querySelectorAll('.unit-switch').forEach(btn => {
    btn.addEventListener('change', (e) => {
        localStorage.setItem('units', e.target.value);
        getDataMainCard(); 
        if (lastSearchedCity !== "") {
            searchCityWeather(lastSearchedCity);
        }
    });
});