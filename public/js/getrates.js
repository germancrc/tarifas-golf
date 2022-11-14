const caddieRate = document.getElementById('caddieCont')
let ratesHtml = ''

const getCaddie = async () => {
    await fetch('https://apigolf.cyclic.app/api/tarifas/16')
      .then((response) => {
        return response.json();
      })
      .then((tarifas) => {
        console.log(tarifas.data[0].nombre);
        ratesHtml += 
        `
        <p>${tarifas.data[0].nombre}</p>
        
        `

  

    }
    )};

        caddieRate.innerHTML = ratesHtml; //pintar tarifas en HTML
    

getCaddie();