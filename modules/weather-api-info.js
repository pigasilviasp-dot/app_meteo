import { API_KEY } from "./config.js";

const weatherApiKey =API_KEY;
const weatherApiUrl='https://api.openweathermap.org';

function getWeatherApiKey(){
    return weatherApiKey;
}

export {weatherApiUrl,getWeatherApiKey}