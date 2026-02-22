# Meteo App - Vanilla JS Weather Dashboard

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-EB6E4B?style=for-the-badge&logo=OpenWeatherMap&logoColor=white)

Un'applicazione web per la consultazione del meteo, sviluppata in Vanilla JavaScript (ES6 Modules) per dimostrare competenze nella gestione del DOM, chiamate API asincrone e modularità del codice.


---

## Caratteristiche Principali

- **Ricerca Dinamica del Meteo:** Recupero dati in tempo reale tramite OpenWeatherMap API, inclusi geolocalizzazione, meteo attuale e previsioni.
- **Previsioni a 5 Giorni:** Visualizzazione dettagliata in un modale dinamico che raggruppa i dati per giornata, calcolando automaticamente le temperature minime e massime previste.
- **Dark Mode Persistente:** Cambio tema chiaro/scuro integrato con Bootstrap e salvataggio delle preferenze dell'utente nel `localStorage`.
- **Internazionalizzazione (i18n):** Supporto multilingua nativo (Italiano, Inglese, Spagnolo) con aggiornamento istantaneo dell'interfaccia e dei testi delle API.
- **Gestione Unità di Misura:** Switch rapido tra sistema metrico (°C) e imperiale (°F), mantenendo la scelta dell'utente nel `localStorage`.
- **Gestione Avanzata degli Errori:** Validazione degli input tramite Regex e modali di avviso personalizzati (città non trovata, campo vuoto, caratteri non validi) per una UX ottimale.
- **Architettura Modulare:** Codice strutturato in moduli ES6 separati per singola responsabilità (chiamate API, UI, impostazioni) per garantire scalabilità e pulizia.

---

## Tecnologie Utilizzate

* **Frontend:** HTML5, Vanilla JavaScript (ES6)
* **Styling & UI:** Bootstrap 5, Bootstrap Icons
* **Architettura:** Moduli ES6 (`import`/`export`)
* **State Management:** `localStorage` (per lingua, tema e unità di misura)
* **API:** OpenWeatherMap API (Current, 5-Day Forecast, Geocoding)

---
## 👤 Autore

Sviluppato da **Silvia Piga** come progetto di portfolio.

* **LinkedIn:** www.linkedin.com/in/silvia-piga-81648037b
* **GitHub:** @pigasilviasp-dot (https://github.com/pigasilviasp-dot)