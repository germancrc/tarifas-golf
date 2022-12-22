/* Set the width of the side navigation to 250px */
function openNav() {
	document.getElementById('mySidenav').style.width = '250px'
}

/* Set the width of the side navigation to 0 */
function closeNav() {
	document.getElementById('mySidenav').style.width = '0'
}

//*****************************BUSQUEDA EN TABLAS********************************/
let delay = 0
let delayTimeout

function filtroBusqueda(secs) {
	delay = secs * 1000
	clearTimeout(delayTimeout)

	delayTimeout = setTimeout(mySearchFunction, delay)
}

function mySearchFunction() {
	// Declare variables
	let input, filter, table, tr, td1, td2, i
	input = document.getElementById('myInput')
	filter = input.value.toUpperCase()
	table = document.getElementById('myTable')
	tr = table.getElementsByTagName('tr')

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		td1 = tr[i].getElementsByTagName('td')[0]
		td2 = tr[i].getElementsByTagName('td')[1]
		td3 = tr[i].getElementsByTagName('td')[2]
		td4 = tr[i].getElementsByTagName('td')[3]
		if (td1 || td2) {
			txtValue1 = td1.textContent || td1.innerText
			txtValue2 = td2.textContent || td2.innerText
			txtValue3 = td3.textContent || td3.innerText
			txtValue4 = td4.textContent || td4.innerText
			if (
				txtValue1.toUpperCase().indexOf(filter) > -1 ||
				txtValue2.toUpperCase().indexOf(filter) > -1 ||
				txtValue3.toUpperCase().indexOf(filter) > -1 ||
				txtValue4.toUpperCase().indexOf(filter) > -1
			) {
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
		// let opera = cards[i].querySelector('span.opera')

		if (
			title.innerText.toUpperCase().indexOf(inputMobile) > -1 ||
			descrip.innerText.toUpperCase().indexOf(inputMobile) > -1
			// opera.innerText.toUpperCase().indexOf(inputMobile) > -1
		) {
			cards[i].style.display = ''
		} else {
			cards[i].style.display = 'none'
		}
	}
}

//*****************************FIN BUSQUEDA EN TABLAS********************************/

let checkPass = function () {
	if (document.getElementById('password').value === document.getElementById('pass-conf').value) {
		if (document.getElementById('password').value.length != 0) {
			document.getElementById('message').style.color = 'green'
			document.getElementById('message').className = 'mt-2 text-center'
			document.getElementById('message').innerHTML = 'Contraseñas coinciden'
			document.getElementById('modalUserName').className = 'btn btn-primary'
		}
	} else {
		document.getElementById('message').style.color = 'red'
		document.getElementById('message').className = 'mt-2 text-center'
		document.getElementById('message').innerHTML = 'No coinciden'
		document.getElementById('modalUserName').className = 'btn btn-primary disabled'
	}
}
// PONER TEXTO MAYUSCULAS EN FORMS
function mayus(e) {
	e.value = e.value.toUpperCase()
}

// titulos
let navbarLG = document.getElementById('navbarLG').innerHTML
document.getElementById('navbarSM').innerHTML = navbarLG
document.getElementById('nuevoTitulo').innerHTML = navbarLG + ' - Guía Hard Rock Golf PC'

//************************UPLOAD BUTTON DISABLED */
function inform() {
	let nombreGuia = document.getElementById('nombreGuia').value
	let file = document.getElementById('fileGuide').value

	if (!file || nombreGuia.length == 0) {
		document.getElementById('upload').disabled = true
	} else if (file && nombreGuia) {
		document.getElementById('upload').disabled = false
	}
}
