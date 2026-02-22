const translations = {
    it: {
        searchLabel: "Cerca il meteo della tua città!",
        searchPlaceholder: "digita qui la città...",
        searchBtn: "Cerca",
        alertTitle: "Attenzione!",
        alertEmpty: "Inserisci una città",
        alertInvalid: "Inserisci una città valida",
        cityNotFoundTitle: "Città non trovata",
        cityNotFoundBody: (city) => `La città "${city}" non è stata trovata`,
        genericErrorTitle: "Errore",
        genericErrorBody: "Si è verificato un errore durante il recupero dei dati meteo.",
        moreInfo: "Scopri di più",
        closeButton: "Chiudi",
        footerInfo: "Previsioni per i prossimi 5 giorni"
    },
    en: {
        searchLabel: "Search the weather in your city!",
        searchPlaceholder: "type city name...",
        searchBtn: "Search",
        alertTitle: "Warning!",
        alertEmpty: "Please enter a city",
        alertInvalid: "Please enter a valid city name",
        cityNotFoundTitle: "City not found",
        cityNotFoundBody: (city) => `The city "${city}" was not found`,
        genericErrorTitle: "Error",
        genericErrorBody: "An error occurred while retrieving weather data.",
        moreInfo: "More info",
        closeButton: "Close",
        footerInfo: "5-day forecast"
    },
    es:{
        searchLabel: "¡Busca el tiempo en tu ciudad!",
        searchPlaceholder: "escribe aquí la ciudad...",
        searchBtn: "Buscar",
        alertTitle: "¡Atención!",
        alertEmpty: "Introduce una ciudad",
        alertInvalid: "Introduce una ciudad válida",
        cityNotFoundTitle: "Ciudad no encontrada",
        cityNotFoundBody: (city) => `La ciudad "${city}" no ha sido encontrada`,
        genericErrorTitle: "Error",
        genericErrorBody: "Se è producido un error al obtener los datos meteorológicos.",
        moreInfo: "saber más",
        closeButton:"Cierra",
        footerInfo: "Previsión para los próximos 5 días"
    }
};

export function getCurrentLang() {
    return localStorage.getItem('language') || 'it';
}

export function updateInterface() {
    const lang = getCurrentLang();
    const t = translations[lang] || translations['it'];

    document.querySelector('label[for="city"]').innerText = t.searchLabel;
    document.getElementById('city').placeholder = t.searchPlaceholder;
    document.getElementById('submit').innerText = t.searchBtn;
}

export { translations };

export function getCurrentUnit() {
   return localStorage.getItem('units') || 'metric';
}