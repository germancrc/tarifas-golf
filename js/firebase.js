
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
  import { 
    getFirestore, 
    collection, 
    addDoc,
    getDocs,
    onSnapshot
  } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAWs6GMzaT_x_8QJLF7RNSNQI6ydFhMVYI",
    authDomain: "hrgolf-tarifas.firebaseapp.com",
    projectId: "hrgolf-tarifas",
    storageBucket: "hrgolf-tarifas.appspot.com",
    messagingSenderId: "574584994996",
    appId: "1:574584994996:web:1dc4cce613df242ba82be1"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore();

  //LISTAR SERVICIOS
  export const getServices = () => getDocs(collection(db, 'servicios'))

  //ACTUALIZAR LISTA SERVICIOS
  export const onGetServices = (callServices) => onSnapshot(collection(db, 'servicios'), callServices)
  
  
  
  //LISTAR TARIFAS
  export const getRates = () => getDocs(collection(db, 'tarifas'))
  
  //ACTUALIZAR LISTA TARIFAS
  export const onGetRates = (callRates) => onSnapshot(collection(db, 'tarifas'), callRates)



  //GUARDAR SERVICIOS
   export const saveService = (servTitle, servPrice, servDescription) => {
    addDoc(collection(db, 'servicios'), {Servicio: servTitle, Precio: servPrice, Descripcion: servDescription});
    console.log("Datos enviados");
  }

  //GUARDAR TARIFAS
   export const saveRate = (rateTitle, ratePrice) => {
    addDoc(collection(db, 'tarifas'), {Tarifa: rateTitle, Precio: ratePrice});
    console.log("Datos enviados");
  }
