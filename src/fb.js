import firebase from 'firebase'

  // Initialize Firebase
  export const fb = firebase.initializeApp({
    apiKey: "AIzaSyAy1rA26PHE3dFMRpIPnSYQu5E3HWUOAhs",
    authDomain: "apu-autenticacao.firebaseapp.com",
    databaseURL: "https://apu-autenticacao.firebaseio.com",
    projectId: "apu-autenticacao",
    storageBucket: "apu-autenticacao.appspot.com",
    messagingSenderId: "28680731535",
    appId: "1:28680731535:web:cf7d7cdba72d02cf02e9fa",
    measurementId: "G-MJDHX8CSBV"
  });

  export const auth = fb.auth();

  export default fb;