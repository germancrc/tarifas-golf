import {
    onGetRates,
    getRate,
    saveRate, 
    updateRate,
    deleteRate

} from './firebase.js'

const ratesForm = document.getElementById('rates-form')
const ratesContainer = document.getElementById('rates-container')

let editStatus = false;
let id = '';

const botonAgregar = document.getElementById('btnRate');

if(botonAgregar){
    botonAgregar.addEventListener('click', function(e) {
            document.getElementById('ratesModalLabel').innerHTML = 'Agregar Tarifa'
            document.getElementById('modalRateName').innerHTML = 'Agregar Tarifa'
            document.getElementById('rate-title').value = ''
            document.getElementById('rate-price').value = ''
        });
}

window.addEventListener('DOMContentLoaded', async () =>{ //cuando carga la app


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
                    ${'USD ' + tarifa.Precio + ' .00'}
                </td>

                <td>
                    <button data-bs-toggle="modal" data-bs-target="#ratesModal" class="btn btn-warning btnEdit" data-id="${docRate.id}">Editar</button>
                    
                    <button class="btn btn-danger btnDelete" data-id="${docRate.id}">Borrar</button>
                </td>
            </tr>
            `;
        });
        if(ratesContainer){
            ratesContainer.innerHTML = ratesHtml; //pintar tarifas en HTML
        }
        
        if(ratesContainer){
            //BOTON BORRAR TARIFA
            const btnsDelete = ratesContainer.querySelectorAll('.btnDelete')
            btnsDelete.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    Swal.fire({
                        title: 'Seguro que quiere borrar esta tarifa?',
                        text: "Deberá agregarla de nuevo!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, Bórrala!'
                      }).then((result) => {
                        if (result.isConfirmed) {
                            deleteRate(event.target.dataset.id)
                          Swal.fire(
                            'Eliminada!',
                            'La tarifa ha sido eliminada.',
                            'success'
                          )
                        }
                      })
                      

                })
            })

          
            
            //EDITAR TARIFA
            const btnsEdit = ratesContainer.querySelectorAll('.btnEdit')
            
            btnsEdit.forEach(btn => {
                btn.addEventListener('click', async (event) => {
                    const rate = await getRate(event.target.dataset.id);
                        const fillRate = rate.data()
    
                    ratesForm['rate-title'].value = fillRate.Tarifa
                    ratesForm['rate-price'].value = fillRate.Precio
    
                    document.getElementById('ratesModalLabel').innerHTML = 'Editar Tarifa'
                    document.getElementById('modalRateName').innerHTML = 'Editar Tarifa'
    
                    editStatus = true;
                    id = rate.id;
                })
            })
        }
        
    });

    
})


//Get values modal tarifas
if(ratesForm){
    ratesForm.addEventListener('submit', (e) => {
        e.preventDefault()
    
        const rateTitle = ratesForm['rate-title']
        const ratePrice = ratesForm['rate-price']
        
        if(!editStatus){
            saveRate(rateTitle.value, ratePrice.value)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Tarifa '+ rateTitle.value + ' Agregada',
                showConfirmButton: false,
                timer: 1500
              })
            }else{
                
                editStatus = false;
                updateRate(id, {
                    Tarifa: rateTitle.value, 
                    Precio: ratePrice.value, 
                    
                })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Tarifa '+ rateTitle.value + ' Modificada',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        
        ratesForm.reset();
    })
}



