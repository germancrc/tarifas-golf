import {
    saveRate, 
    saveService, 
    onGetServices,
    onGetRates,
    deleteService,
    getService
} from './firebase.js'



const servicesForm = document.getElementById('services-form')
const ratesForm = document.getElementById('rates-form')
const servicesContainer = document.getElementById('services-container')
const ratesContainer = document.getElementById('rates-container')
const servicesHomePage = document.getElementById('servicesHomePage')

let editStatus = false;

window.addEventListener('DOMContentLoaded', async () =>{ //cuando carga la app

    //para listar servicios HOME PAGE
    onGetServices((listServicesCards) => {
        let servicesHome = ''
        
        listServicesCards.forEach(docServHome => {
            const servicio = docServHome.data()
            servicesHome += 
            `
              <div class="col">
              <div class="card mb-4 cardShadow" id="serviceTest">
                <div class="card-header fixSizeHead">
                  <h5 class="my-0 font-weight-normal text-center">${servicio.Servicio}</h5>
              </div>
              <div class="card-body bodyCardZise">
                  <h1 class="card-title pricing-card-title text-center">${'USD ' + servicio.Precio + '.00'} <small class="text-muted">p/p</small></h1>
                  <p>${servicio.Descripcion} </p>
              </div>
              </div>
              </div>

            `;
        });
        if(servicesHomePage){
            servicesHomePage.innerHTML = servicesHome //pintar servicios en HTML
        }
    })


    //para listar servicios PAGINA AJUSTES
    onGetServices((listServices) => {
        let servicesHtml = ''
        
        listServices.forEach(docServSettings => {
            const servicio = docServSettings.data()
            servicesHtml += 
            `
            <tr>
                <td>
                    ${servicio.Servicio}
                </td>
                <td>
                    ${servicio.Precio + '.00'}
                </td>
                <td>
                    ${servicio.Descripcion}
                </td>
                <td>
                    <button data-bs-toggle="modal" data-bs-target="#serviceModal" class="btn btn-warning btnEdit" data-id="${docServSettings.id}">Editar</button>
                    
                    <button class="btn btn-danger btnDelete" data-id="${docServSettings.id}">Borrar</button>
                </td>
            </tr>
            `;
        });
        if(servicesContainer){
            servicesContainer.innerHTML = servicesHtml; //pintar servicios en HTML
        }
        
        
        const btnsDelete = servicesContainer.querySelectorAll('.btnDelete')
        
        btnsDelete.forEach(btn => {
            btn.addEventListener('click', (event) => {
                deleteService(event.target.dataset.id)
            })
        })

        const btnsEdit = servicesContainer.querySelectorAll('.btnEdit')
        
        btnsEdit.forEach(btn => {
            btn.addEventListener('click', async (event) => {
                const serv = await getService(event.target.dataset.id);
                 const fillServ = serv.data()

                servicesForm['service-title'].value = fillServ.Servicio
                servicesForm['service-price'].value = fillServ.Precio
                servicesForm['TextareaService'].value = fillServ.Descripcion

                // document.getElementById('serviceModalLabel').innerHTML = 'Editar Servicio'
                // document.getElementById('modalAddEdit').innerHTML = 'Editar Servicio'

                editStatus = true;
            })
        })
    });


   
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
        if(ratesContainer){
            ratesContainer.innerHTML = ratesHtml; //pintar tarifas en HTML
        }
    })
    
})


//Get values modal servicios
if(servicesForm){
    servicesForm.addEventListener('submit', (e) => {
        e.preventDefault()
    
        const servTitle = servicesForm['service-title']
        const servPrice = servicesForm['service-price']
        const servDescription = servicesForm['TextareaService']
        
        if(editStatus){
            console.log('Actualizando');
        }else{
            saveService(servTitle.value, servPrice.value, servDescription.value)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Servicio guardado',
                showConfirmButton: false,
                timer: 1500
              })
        }
        
        servicesForm.reset();
    })
}


//Get values modal tarifas
if(ratesForm){
    ratesForm.addEventListener('submit', (e) => {
        e.preventDefault()
    
        const rateTitle = ratesForm['rate-title']
        const ratePrice = ratesForm['rate-price']
    
        saveRate(rateTitle.value, ratePrice.value)
    
        ratesForm.reset();
    })

}


