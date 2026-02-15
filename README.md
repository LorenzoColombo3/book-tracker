# 📚 Book Tracker App
Una Web Application moderna sviluppata con **React** e **Vite** che permette agli utenti di cercare libri tramite la *Google Books API* e gestire la propria libreria personale utilizzando **Firebase** come backend.

## Funzionalità principali
* **Ricerca Avanzata:** attraverso l'integrazione con servizi esterni, l'utente può cercare libri filtrando per titolo, autore o codice ISBN;
* **Visualizzazione dettagli libro:**  ogni libro trovato dispone di una scheda dedicata che mostra la copertina, gli autori, l'ISBN e una descrizione estesa del contenuto;
* **Gestione della propria libreria:** gli utenti registrati possono aggiungere libri alla propria collezione mediante un apposito pulsante e rimuoverli in qualsiasi momento; 
* **Sistema di autenticazione:** l'accesso alle funzioni di salvataggio è protetto da un sistema di registrazione ed accesso che garantisce la persistenza dei dati personali per ciascun utente.

## Demo Online
Il progetto è deployato e consultabile al seguente link: https://lorenzocolombo3.github.io/book-tracker/#/

## Avvio in locale del progetto
per avviare il progetto in locale è necessario: 
* clonare la repository github in locale;
* creare un progetto firebase attivando firebase authentication e firestone datastore;
* creare una chiave api mediante google cloud console per le API Google Books;
* le credenziali di accesso per i servizi firebase e per le api Google Books saranno da inserire in un file .env configurato come segue:

```text
VITE_FIREBASE_API_KEY=LaTuaChiave
VITE_FIREBASE_AUTH_DOMAIN=book-tracker.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=book-tracker
VITE_FIREBASE_STORAGE_BUCKET=book-tracker.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=TuoID
VITE_FIREBASE_APP_ID=TuoAppID
VITE_GOOGLE_BOOKS_API_KEY=LaTuaChiaveGoogleBooks
```

* in fine sarà possibile installare le dipendenze e avviare il progetto in locale.