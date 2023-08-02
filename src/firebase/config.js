import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDR3POSlMLo5iSNLyGnPwi8XCOD10MHQXI",
    authDomain: "disney-clone-c9316.firebaseapp.com",
    projectId: "disney-clone-c9316",
    storageBucket: "disney-clone-c9316.appspot.com",
    messagingSenderId: "1070562786566",
    appId: "1:1070562786566:web:30457a6787796a927f3287"
};

initializeApp(firebaseConfig)

export const auth = getAuth()