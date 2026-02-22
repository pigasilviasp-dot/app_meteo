import { getWeatherApiKey, weatherApiUrl } from "./weather-api-info.js";
import { getCurrentLang, getCurrentUnit } from "./settings.js";

let weatherApiKey= getWeatherApiKey();

function getCoordinatesByCityName(cityName){
  let coordByCityNameUrl = `${weatherApiUrl}/geo/1.0/direct?q=${cityName}&limit=1&appid=${weatherApiKey}`  
    return fetch(coordByCityNameUrl)
        .then(res =>{
            if (!res.ok) {
            throw new Error("API_ERROR");
        }
        return res.json();
        }) 
        .then(data => {
            if (!data || data.length === 0) {
                throw new Error("CITY_NOT_FOUND");
            }
            return data[0];
            });
}



function getCurrentWeather(lat, lon){
    const lang= getCurrentLang();
    const unit=getCurrentUnit();
    let currentWeatherUrl= `${weatherApiUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=${unit}&lang=${lang}`;
    return fetch (currentWeatherUrl)
     .then(res =>{
            if (!res.ok) {
            throw new Error("API_ERROR");
        }
        return res.json();
     })
}

function getWeatherForecast(lat,lon){
    const lang= getCurrentLang();
    const unit=getCurrentUnit();
    let weatherForecastUrl =`${weatherApiUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=${unit}&lang=${lang}`;
    return fetch(weatherForecastUrl)
        .then(res =>{
            if (!res.ok) {
            throw new Error("API_ERROR");
        }
        return res.json();
     })
}

function getWeatherIcon(iconCode){
    let weatherIcon = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    return weatherIcon;
}


export {getCoordinatesByCityName,getCurrentWeather,getWeatherIcon, getWeatherForecast}