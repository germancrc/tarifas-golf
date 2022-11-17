
//Tarifa Caddie
function getCaddie() {
    fetch('https://apigolf.cyclic.app/api/tarifas/16')
      .then((response) => {
        return response.json();
      })
      .then((tarifas) => {
        // console.log(tarifas.data[0].nombre);
        Swal.fire({
          title: `Tarifa: ${tarifas.data[0].nombre}`,
          icon: 'success',
          html:
            `<p class="fw-bold text-danger text-center">**Tomar foto al carnet de caddie del cliente**</p>
             <h4>USD ${tarifas.data[0].precio}.00</h4> `,
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: true,
          confirmButtonText:
          `Entendido`
        })
      }
      )};
      

    
