document.getElementById("nameGuide").innerHTML = "Guía General";

//RUTA VP 
function reservaVP() {
    document.querySelector(
    "#formBgroup").style.display = "none";
    document.querySelector(
    "#tarVP").style.display = "block";
}

//RUTA HARD ROCK LISA P
function hrGolf() {
    document.querySelector(
    "#formBgroup").style.display = "none";
    document.querySelector(
    "#tarHRlp").style.display = "block";
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
        "#verificarSocio").style.display = "block";
}

function noSocio(){
    document.querySelector(
        "#verificarSocio").style.display = "none";
        document.querySelector(
        "#clienteCasino").style.display = "block";
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

  

