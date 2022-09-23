const clienteHotel = document.querySelector('#show')
const clienteLocal = document.querySelector('#show')

let tipoCliente = (jugador) => {
    switch (jugador.value) {
        case "0":
            document.querySelector(
              "#clienteHotel").style.display = "none";
            document.querySelector(
              "#clienteLocal").style.display = "none";
            document.querySelector(
            "#clienteExt").style.display = "none";
            break;
        case "1":
            document.querySelector(
            "#clienteHotel").style.display = "block";
            document.querySelector(
            "#clienteLocal").style.display = "none";
            document.querySelector(
            "#clienteExt").style.display = "none";
          break;
        case "2":
            document.querySelector(
            "#clienteHotel").style.display = "none";
            document.querySelector(
            "#clienteLocal").style.display = "block";
            document.querySelector(
            "#clienteExt").style.display = "none";
          break;
          case "3":
            document.querySelector(
            "#clienteHotel").style.display = "none";
            document.querySelector(
            "#clienteLocal").style.display = "none";
            document.querySelector(
            "#clienteExt").style.display = "block";
          break;
      }
}

let clienteLocal = (jugadorLocal) => {
  switch (jugadorLocal.value) {
    case "0":
      document.querySelector(
        "#modalocal1").style.display = "none";
      document.querySelector(
        "#modalocal2").style.display = "none";
    break;
      case "1":
          document.querySelector(
            "#modalocal1").style.display = "block";
          document.querySelector(
            "#modalocal2").style.display = "none";
        break;
      case "2":
        document.querySelector(
          "#modalocal1").style.display = "none";
        document.querySelector(
          "#modalocal2").style.display = "block";
        break;
      }
    }
