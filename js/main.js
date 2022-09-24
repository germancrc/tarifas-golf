function btnRecargar(){
  document.querySelector("#recarga").style.display = "none";
}

function clienteHotel() {
    document.querySelector(
    "#clienteHotel").style.display = "block";
    document.querySelector(
    "#clienteLocal").style.display = "none";
    document.querySelector(
    "#cTurista").style.display = "none";
    document.querySelector(
      "#cardLocal").style.visibility = "hidden";
    document.querySelector(
      "#cardExt").style.visibility = "hidden";
      document.querySelector("#recarga").style.display = "block";
}
function clienteLocal() {
  document.querySelector(
    "#clienteHotel").style.display = "none";
    document.querySelector(
    "#clienteLocal").style.display = "block";
    document.querySelector(
    "#cTurista").style.display = "none";
    document.querySelector(
      "#cardHotel").style.visibility = "hidden";
    document.querySelector(
      "#cardExt").style.visibility = "hidden";
      document.querySelector("#recarga").style.display = "block";
}
function cTurista() {
  document.querySelector(
    "#clienteHotel").style.display = "none";
    document.querySelector(
    "#clienteLocal").style.display = "none";
    document.querySelector(
    "#cTurista").style.display = "block";
    document.querySelector(
      "#cardLocal").style.visibility = "hidden";
    document.querySelector(
      "#cardHotel").style.visibility = "hidden";
      document.querySelector("#recarga").style.display = "block";
}
