import { createModal } from "./buildModal.js";
import { getWeatherIcon } from "./weather-api-calls.js";
import { translations, getCurrentLang } from "./settings.js";


function onMoreInfo(forecastData, cityName) {
    const lang=getCurrentLang();
    const t=translations[lang];
    if (!forecastData || !forecastData.list) {
        createModal({
            title: "Errore",
            body: "Dati previsioni non disponibili."
        });
        return;
    }
    const dailyForecasts = {};

    forecastData.list.forEach(item => {
        // Estraggo la data 
        const dateKey = item.dt_txt.split(' ')[0];

        if (!dailyForecasts[dateKey]) {
            // Se è la prima volta che incontro questo giorno inizializzo l'oggetto
            dailyForecasts[dateKey] = {
                dateUnix: item.dt,
                min: item.main.temp_min,
                max: item.main.temp_max,
                icon: item.weather[0].icon,
                description: item.weather[0].description,
                count: 1
            };
        } else {
            // Se il giorno esiste già aggiorno min e max se trovo valori più estremi
            dailyForecasts[dateKey].min = Math.min(dailyForecasts[dateKey].min, item.main.temp_min);
            dailyForecasts[dateKey].max = Math.max(dailyForecasts[dateKey].max, item.main.temp_max);
            
            // Prendo l'icona di mezzogiorno
            if (item.dt_txt.includes("12:00:00")) {
                dailyForecasts[dateKey].icon = item.weather[0].icon;
                dailyForecasts[dateKey].description = item.weather[0].description;
            }
        }
    });

    // Converto l'oggetto in un array per poterlo ciclare e creare l'HTML
    const dailyArray = Object.values(dailyForecasts);

    let modalContent = `<div class="list-group list-group-flush">`;

    dailyArray.forEach(day => {
        const date = new Date(day.dateUnix * 1000);
        const dateString = date.toLocaleDateString(lang, { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long' 
        });

        const iconSrc = getWeatherIcon(day.icon);
        const tempMax = Math.round(day.max);
        const tempMin = Math.round(day.min);

        modalContent += `
            <div class="list-group-item d-flex justify-content-between align-items-center">
                <div class="ms-2 me-auto">
                    <div class="fw-bold text-capitalize">${dateString}</div>
                    <small class="text-muted text-capitalize">${day.description}</small>
                </div>
                <div class="d-flex align-items-center">
                    <img src="${iconSrc}" alt="icona meteo" style="width: 50px; height: 50px;">
                    <div class="ms-3 text-end" style="min-width: 80px;">
                        <span class="d-block fw-bold text-danger">Max ${tempMax}°</span>
                        <span class="d-block fw-bold text-info">Min ${tempMin}°</span>
                    </div>
                </div>
            </div>
        `;
    });

    modalContent += `</div>`;
    modalContent += `<div class="p-2 text-center text-muted small">${t.footerInfo}</div>`;

    createModal({
        title: `Previsioni: <span class="text-primary">${cityName}</span>`,
        body: modalContent,
        size: "modal-lg"
    });
}

export { onMoreInfo };