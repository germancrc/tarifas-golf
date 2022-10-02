document.getElementById("nameGuide").innerHTML = "Nombre de la Guía?";

function reservaVP() {
    let element = document.getElementById("vacPlan");
    document.getElementById("vacPlan").className = "btnHotelNew";
    console.log(element);
    document.querySelector(
    "#hardRock").style.display = "none";
    document.querySelector(
    "#golfAdmin").style.display = "none";
    document.querySelector(
    "#web").style.display = "none";
    document.querySelector(
    "#ezlinkWeb").style.display = "none";
    document.querySelector(
    "#tarVP").style.display = "block";

    scrollvista();
}

function reservaVP2() {
    let element = document.getElementById("vacPlan");
    document.getElementById("vacPlan").className = "btnHotelNew";
    console.log(element);
    document.querySelector(
    "#hardRock").style.display = "none";
    document.querySelector(
    "#golfAdmin").style.display = "none";
    document.querySelector(
    "#web").style.display = "none";
    document.querySelector(
    "#ezlinkWeb").style.display = "none";
    document.querySelector(
    "#tarVP").style.display = "block";

    scrollvista();
}

function hrGolf() {
    let element = document.getElementById("hardGolf");
    document.getElementById("hardGolf").className = "btnHotelNew";
    console.log(element);
    document.querySelector(
    "#vp").style.display = "none";
    document.querySelector(
    "#golfAdmin").style.display = "none";
    document.querySelector(
    "#web").style.display = "none";
    document.querySelector(
    "#ezlinkWeb").style.display = "none";
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

function scrollvista() {
    const centerView = document.getElementById("goUp");
    centerView.scrollIntoView({behavior:"smooth", block:"center"});
  }
  

