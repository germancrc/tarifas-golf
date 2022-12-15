/* Set the width of the side navigation to 250px */
function openNav() {
	document.getElementById('mySidenav').style.width = '250px'
}

/* Set the width of the side navigation to 0 */
function closeNav() {
	document.getElementById('mySidenav').style.width = '0'
}

//*****************************BUSQUEDA EN TABLAS********************************/
function myFunction() {
	// Declare variables
	let input, filter, table, tr, td1, td2, i, txtValue
	input = document.getElementById('myInput')
	filter = input.value.toUpperCase()
	table = document.getElementById('myTable')
	tr = table.getElementsByTagName('tr')

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		td1 = tr[i].getElementsByTagName('td')[0]
		if (td1) {
			txtValue = td1.textContent || td1.innerText
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = ''
			} else {
				tr[i].style.display = 'none'
			}
		}
	}

	for (i = 0; i < tr.length; i++) {
		td2 = tr[i].getElementsByTagName('td')[3]
		if (td2) {
			txtValue = td2.textContent || td2.innerText
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = ''
			} else {
				tr[i].style.display = 'none'
			}
		}
	}

	const inputMobile = document.getElementById('myInput').value.toUpperCase()
	const cards = document.getElementsByClassName('cardHome')

	for (let i = 0; i < cards.length; i++) {
		let title = cards[i].querySelector('div.card-title')
		let descrip = cards[i].querySelector('div.accordion-body')

		if (
			title.innerText.toUpperCase().indexOf(inputMobile) > -1 ||
			descrip.innerText.toUpperCase().indexOf(inputMobile) > -1
		) {
			cards[i].style.display = ''
		} else {
			cards[i].style.display = 'none'
		}
	}
}

function buscarCodigo() {
	// Declare variables
	let input, filter, table, tr, td, i, txtValue
	input = document.getElementById('myInput')
	filter = input.value.toUpperCase()
	table = document.getElementById('myTable')
	tr = table.getElementsByTagName('tr')

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName('td')[1]
		if (td) {
			txtValue = td.textContent || td.innerText
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = ''
			} else {
				tr[i].style.display = 'none'
			}
		}
	}

	const inputMobile = document.getElementById('myInput').value.toUpperCase()
	const cards = document.getElementsByClassName('cardHome')

	for (let i = 0; i < cards.length; i++) {
		let title = cards[i].querySelector('div.card-title')
		let descrip = cards[i].querySelector('div.accordion-body')

		if (
			title.innerText.toUpperCase().indexOf(inputMobile) > -1 ||
			descrip.innerText.toUpperCase().indexOf(inputMobile) > -1
		) {
			cards[i].style.display = ''
		} else {
			cards[i].style.display = 'none'
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

let checkPass = function () {
	if (
		document.getElementById('password').value ===
		document.getElementById('pass-conf').value
	) {
		if (document.getElementById('password').value.length != 0) {
			document.getElementById('message').style.color = 'green'
			document.getElementById('message').className = 'mt-2 text-center'
			document.getElementById('message').innerHTML =
				'Contraseñas coinciden'
			document.getElementById('modalUserName').className =
				'btn btn-primary'
		}
	} else {
		document.getElementById('message').style.color = 'red'
		document.getElementById('message').className = 'mt-2 text-center'
		document.getElementById('message').innerHTML = 'No coinciden'
		document.getElementById('modalUserName').className =
			'btn btn-primary disabled'
	}
}
// PONER TEXTO MAYUSCULAS EN FORMS
function mayus(e) {
	e.value = e.value.toUpperCase()
}

//titulos
let titulo = document.getElementById('titulo').innerHTML
document.getElementById('nuevoTitulo').innerHTML =
	titulo + ' - Guía Hard Rock Golf PC'

// titulos entre navbars
let navbarLG = document.getElementById('navbarLG').innerHTML
document.getElementById('navbarSM').innerHTML = navbarLG

//Show / Hide pass changes
function openPassEdit() {
	const passChange = document.getElementById('passEdit')
	if (passChange.className == 'd-block') {
		passChange.className = 'd-none'
	} else {
		passChange.className = 'd-block'
	}
}

//Show / Hide rol changes
function openRolEdit() {
	const rolChange = document.getElementById('rolEdit')
	if (rolChange.className == 'd-block') {
		rolChange.className = 'd-none'
	} else {
		rolChange.className = 'd-block'
	}
}
