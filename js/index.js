import {
    saveRate, 
    saveService, 
    getServices, 
    getRates
} from './firebase.js'

const servicesForm = document.getElementById('services-form')
const ratesForm = document.getElementById('rates-form')
const servicesContainer = document.getElementById('services-container')
const ratesContainer = document.getElementById('rates-container')

window.addEventListener('DOMContentLoaded', async () =>{

    const listServices = await getServices();
    const listRates = await getRates();

    let servicesHtml = ''
    let ratesHtml = ''

    listServices.forEach(docServ => {
       console.log(docServ.data());
       const servicio = docServ.data()
        servicesHtml += 
        `
        <tr>
        <td>${servicio.Servicio}</td>
        <td>${'USD ' + servicio.Precio}</td>
        </tr>
        `
    });

    listRates.forEach(docRate => {
       console.log(docRate.data());
       const tarifa = docRate.data()
        ratesHtml += 
        `
        <tr>
        <td>${tarifa.Tarifa}</td>
        <td>${'USD ' + tarifa.Precio}</td>
        </tr>
        `
    });

    servicesContainer.innerHTML = servicesHtml;
    ratesContainer.innerHTML = ratesHtml;

    
})


servicesForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const servTitle = servicesForm['service-title']
    const servPrice = servicesForm['service-price']

    saveService(servTitle.value, servPrice.value)

    servicesForm.reset();
})


ratesForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const rateTitle = ratesForm['rate-title']
    const ratePrice = ratesForm['rate-price']

    saveRate(rateTitle.value, ratePrice.value)

    ratesForm.reset();
})