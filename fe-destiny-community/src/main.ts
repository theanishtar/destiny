import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
<<<<<<< HEAD
import { initializeApp } from 'firebase/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJbb35x5IWeD8LaAptFOARDOCz-oEJid4",
  authDomain: "destiny-davisy.firebaseapp.com",
  projectId: "destiny-davisy",
  storageBucket: "destiny-davisy.appspot.com",
  messagingSenderId: "657490885713",
  appId: "1:657490885713:web:1739dde38a29f027e20c70",
  measurementId: "G-2H8D03768X"
};

const firebaseApp = initializeApp(firebaseConfig);
=======


>>>>>>> status-online
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
