// document.getElementById("nameGuide").innerHTML = "Guía General";

// const mensaje = document.getElementById('TextareaService');
// const contador = document.getElementById('contador');

// if(mensaje){
//     mensaje.addEventListener('input', function(e) {
//         const target = e.target;
//         const longitudMax = target.getAttribute('maxlength');
//         const longitudAct = target.value.length;
//         contador.innerHTML = `${longitudAct}/${longitudMax}`;
//     });
// }



let checkPass = function() {
     if (document.getElementById('password').value ===
       document.getElementById('pass-conf').value) {
        if(document.getElementById('password').value.length != 0){
             document.getElementById('message').style.color = 'green';
             document.getElementById('message').className = 'mt-2 text-center';
             document.getElementById('message').innerHTML = 'Contraseñas coinciden';
             document.getElementById('modalUserName').className = 'btn btn-primary';
         }
     } else {
         document.getElementById('message').style.color = 'red';
         document.getElementById('message').className = 'mt-2 text-center';
         document.getElementById('message').innerHTML = 'No coinciden';
         document.getElementById('modalUserName').className = 'btn btn-primary disabled';
     }
   }

   function mayus(e) {
     e.value = e.value.toUpperCase();
 }

//RUTA VP 
function reservaVP() {
    document.querySelector("#formBgroup").style.display = "none";
    document.querySelector("#start-again").style.display = "block";
    document.querySelector("#tarVP").style.display = "block";
}

//RUTA HARD ROCK LISA P
function hrGolf() {
    document.querySelector("#formBgroup").style.display = "none";
    document.querySelector("#start-again").style.display = "block";
    document.querySelector("#tarHRlp").style.display = "block";
}

function reservaLisa(){
    document.querySelector(
        "#rutaHR").style.display = "none";
        document.querySelector(
        "#tarVP").style.display = "block";
}

//reserva recepcion
function noFueLisa(){
    document.querySelector(
        "#tarHRlp").style.display = "none";
        document.querySelector(
        "#tieneCortesia").style.display = "block";
}

function noCortesia(){
    document.querySelector(
        "#tieneCortesia").style.display = "none";
        document.querySelector(
        "#clienteCasino").style.display = "block";
}

function noCasino(){
    document.querySelector(
    "#clienteCasino").style.display = "none";
    document.querySelector(
    "#verificarSocio").style.display = "block";
}

function esSocio(){
    document.querySelector(
    "#verificarSocio").style.display = "none";
    document.querySelector(
    "#socioLeg").style.display = "block";
}
function tieneEba(){
    document.querySelector(
    "#verificarSocio").style.display = "none";
    document.querySelector(
    "#socioLeg").style.display = "block";
}







function hrGolfAdmin() {
    let element = document.getElementById("hardGolfAdmin");
    document.getElementById("hardGolfAdmin").className = "btnHotelNew";
    console.log(element);
    document.querySelector(
    "#vp").style.display = "none";
    document.querySelector(
    "#hardRock").style.display = "none";
    document.querySelector(
    "#web").style.display = "none";
    document.querySelector(
    "#ezlinkWeb").style.display = "none";
}
function webGolf() {
    let element = document.getElementById("paginaWeb");
    document.getElementById("paginaWeb").className = "btnHotelNew";
    console.log(element);
    document.querySelector(
    "#vp").style.display = "none";
    document.querySelector(
    "#hardRock").style.display = "none";
    document.querySelector(
    "#golfAdmin").style.display = "none";
    document.querySelector(
    "#ezlinkWeb").style.display = "none";
}
function ezGolf() {
    let element = document.getElementById("ezGolfBook");
    document.getElementById("ezGolfBook").className = "btnHotelNew";
    console.log(element);
    document.querySelector(
    "#vp").style.display = "none";
    document.querySelector(
    "#hardRock").style.display = "none";
    document.querySelector(
    "#golfAdmin").style.display = "none";
    document.querySelector(
    "#web").style.display = "none";
}



/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  

