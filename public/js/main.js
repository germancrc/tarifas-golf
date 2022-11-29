/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

//*****************************BUSQUEDA EN TABLAS********************************/
function myFunction() {
    // Declare variables
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
      }
    }

    const inputMobile = document.getElementById('myInput').value.toUpperCase();
    const cards = document.getElementsByClassName('cardHome');
    
    for(let i = 0; i < cards.length; i++){
        let title = cards[i].querySelector('div.card-title');
        let descrip = cards[i].querySelector('div.accordion-body');
        
        
        if(title.innerText.toUpperCase().indexOf(inputMobile) > -1 || descrip.innerText.toUpperCase().indexOf(inputMobile) > -1) {
            cards[i].style.display = "";
        }else{
            cards[i].style.display = "none";
        }
    }

}

function buscarCodigo(){

   // Declare variables
   let input, filter, table, tr, td, i, txtValue;
   input = document.getElementById("myInput");
   filter = input.value.toUpperCase();
   table = document.getElementById("myTable");
   tr = table.getElementsByTagName("tr");
 
   // Loop through all table rows, and hide those who don't match the search query
   for (i = 0; i < tr.length; i++) {
     td = tr[i].getElementsByTagName("td")[1];
     if (td) {
       txtValue = td.textContent || td.innerText;
       if (txtValue.toUpperCase().indexOf(filter) > -1) {
         tr[i].style.display = "";
       } else {
           tr[i].style.display = "none";
       }  
     }
   }

   const inputMobile = document.getElementById('myInput').value.toUpperCase();
   const cards = document.getElementsByClassName('cardHome');
   
   for(let i = 0; i < cards.length; i++){
       let title = cards[i].querySelector('div.card-title');
       let descrip = cards[i].querySelector('div.accordion-body');
       
       
       if(title.innerText.toUpperCase().indexOf(inputMobile) > -1 || descrip.innerText.toUpperCase().indexOf(inputMobile) > -1) {
           cards[i].style.display = "";
       }else{
           cards[i].style.display = "none";
       }
   }   

}

// //VER SI ES MOVIL O PC
// if ("ontouchstart" in document.documentElement)
// {
//   document.getElementById("myInput").className = "col form-control me-5";
// }
// else
// {
//   document.getElementById("inputBuscar").className = "col-5";
// }




//*****************************FIN BUSQUEDA EN TABLAS********************************/

let checkPass = function() {
     if (document.getElementById('password').value ===
       document.getElementById('pass-conf').value) {
        if(document.getElementById('password').value.length != 0){
             document.getElementById('message').style.color = 'green';
             document.getElementById('message').className = 'mt-2 text-center';
             document.getElementById('message').innerHTML = 'Contraseñas coinciden';
             document.getElementById('modalUserName').className = 'btn btn-primary';
         }
     } else {
         document.getElementById('message').style.color = 'red';
         document.getElementById('message').className = 'mt-2 text-center';
         document.getElementById('message').innerHTML = 'No coinciden';
         document.getElementById('modalUserName').className = 'btn btn-primary disabled';
     }
   }

   function mayus(e) {
     e.value = e.value.toUpperCase();
 }
