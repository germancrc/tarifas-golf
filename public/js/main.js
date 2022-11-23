// document.getElementById("nameGuide").innerHTML = "Guía General";

// const mensaje = document.getElementById('TextareaService');
// const contador = document.getElementById('contador');

// if(mensaje){
//     mensaje.addEventListener('input', function(e) {
//         const target = e.target;
//         const longitudMax = target.getAttribute('maxlength');
//         const longitudAct = target.value.length;
//         contador.innerHTML = `${longitudAct}/${longitudMax}`;
//     });
// }

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
    const cards = document.getElementsByClassName('card');
    
    for(let i = 0; i < cards.length; i++){
        let title = cards[i].querySelector("div.card-title");
        
        if(title.innerText.toUpperCase().indexOf(inputMobile) > -1){
            cards[i].style.display = "block";
        }else{
            cards[i].style.display = "none";
        }
    }

}


//*****************************BUSQUEDA EN TABLAS********************************/

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

