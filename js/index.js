import {
    saveRate, 
    saveService, 
    getServices, 
    getRates,
    onGetServices,
    onGetRates
} from './firebase.js'

const servicesForm = document.getElementById('services-form')
const ratesForm = document.getElementById('rates-form')
const servicesContainer = document.getElementById('services-container')
const ratesContainer = document.getElementById('rates-container')
const servicesHomePage = document.getElementById('servicesHomePage')

window.addEventListener('DOMContentLoaded', async () =>{ //cuando carga la app

    //para listar servicios HOME PAGE
    onGetServices((listServices) => {
        let servicesHome = ''
        
        listServices.forEach(docServ => {
            console.log(docServ.data());
            const servicio = docServ.data()
            servicesHome += 
            `
              <div class="col">
              <div class="card mb-4 box-shadow" id="serviceTest">
                <div class="card-header fixSizeHead">
                  <h5 class="my-0 font-weight-normal text-center">${servicio.Servicio}</h5>
              </div>
              <div class="card-body bodyCardZise">
                  <h1 class="card-title pricing-card-title text-center">${'USD ' + servicio.Precio} <small class="text-muted">p/p</small></h1>
                  <p>${servicio.Descripcion} </p>
              </div>
              </div>
              </div>

            `;
        });
        servicesHomePage.innerHTML = servicesHome //pintar servicios en HTML
    })


    //para listar servicios PAGINA AJUSTES
    onGetServices((listServices) => {
        let servicesHtml = ''
        
        listServices.forEach(docServ => {
            console.log(docServ.data());
            const servicio = docServ.data()
            servicesHtml += 
            `
            <tr>
                <td>
                    ${servicio.Servicio}
                </td>
                <td>
                    ${'USD ' + servicio.Precio}
                </td>
                <td>
                    ${servicio.Descripcion}
                </td>
                <td>
                    <button class="btn btn-warning"><i class="bi bi-pen"></i></button>
                    <button class="btn btn-danger"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
            `;
        });
        servicesContainer.innerHTML = servicesHtml; //pintar servicios en HTML
    })


   
    //para listar tarifas
    onGetRates((listRates) => {
        let ratesHtml = ''
        
        listRates.forEach(docRate => {
            console.log(docRate.data());
            const tarifa = docRate.data()
            ratesHtml += 
            `
            <tr>
                <td>
                    ${tarifa.Tarifa}
                </td>
                <td>
                    ${'USD ' + tarifa.Precio}
                </td>
                <td>
                    <button class="btn btn-warning"><i class="bi bi-pen"></i></button>
                    <button class="btn btn-danger"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
            `;
        });

    ratesContainer.innerHTML = ratesHtml; //pintar tarifas en HTML
    })
    
})


//Get values modal servicios
servicesForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const servTitle = servicesForm['service-title']
    const servPrice = servicesForm['service-price']
    const servDescription = servicesForm['TextareaService']
    
    saveService(servTitle.value, servPrice.value, servDescription.value)
    
    servicesForm.reset();
})


//Get values modal tarifas
ratesForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const rateTitle = ratesForm['rate-title']
    const ratePrice = ratesForm['rate-price']

    saveRate(rateTitle.value, ratePrice.value)

    ratesForm.reset();
})