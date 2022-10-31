
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
  import { 
    getFirestore, 
    collection, 
    addDoc,
    getDoc,
    getDocs,
    deleteDoc,
    onSnapshot,
    updateDoc,
    doc

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
  //export const getServices = () => getDocs(collection(db, 'servicios'))
  
  //ACTUALIZAR LISTA SERVICIOS
  export const onGetServices = (callServices) => onSnapshot(collection(db, 'servicios'), callServices)
  
  //OBTENER 1 SERVICIO
  export const getService = id => getDoc(doc(db, 'servicios', id))

  //GUARDAR SERVICIOS
   export const saveService = (servTitle, servPrice, servDescription) => {
    addDoc(collection(db, 'servicios'), {Servicio: servTitle, Precio: servPrice, Descripcion: servDescription});
  }

  //ACTUALIZAR SERVICIOS
  export const updateService = (id, updatedData) => 
  updateDoc(doc(db, 'servicios', id), updatedData)

  //BORRAR SERVICIOS
  export const deleteService = id => 
  deleteDoc(doc(db, 'servicios', id))
  
  
  
  //LISTAR TARIFAS
  //export const getRates = () => getDocs(collection(db, 'tarifas'))
  
  //ACTUALIZAR LISTA TARIFAS
  export const onGetRates = (callRates) => 
  onSnapshot(collection(db, 'tarifas'), callRates)

  //OBTENER 1 TARIFA
  export const getRate = id => getDoc(doc(db, 'tarifas', id))

  //GUARDAR TARIFAS
   export const saveRate = (rateTitle, ratePrice) => {
    addDoc(collection(db, 'tarifas'), {Tarifa: rateTitle, Precio: ratePrice});
  }

  //ACTUALIZAR TARIFAS
  export const updateRate = (id, updatedData) => 
  updateDoc(doc(db, 'tarifas', id), updatedData)

  //BORRAR TARIFAS
  export const deleteRate = id => 
  deleteDoc(doc(db, 'tarifas', id))

  
