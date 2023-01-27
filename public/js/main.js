/* Set the width of the side navigation to 250px */
// function openNav() {
// 	document.getElementById('mySidenav').style.width = '250px'

// 	let showList = document.getElementById('main')
// 	showList.classList.add('sidenav_open')
// 	showList.classList.remove('sidenav_close')
// }

// /* Set the width of the side navigation to 0 */
// function closeNav() {
// 	let hideList = document.getElementById('main')
// 	hideList.classList.remove('sidenav_open')
// 	hideList.classList.add('sidenav_close')
// 	document.getElementById('mySidenav').style.width = '0px'
// }

//SET ACTIVE LINKS
document.querySelectorAll('.nav-link').forEach((link) => {
	if (window.location.href.toString().includes(link.href)) {
		link.setAttribute('aria-current', 'page')
	}
})

// AÑO FOOTER
const footer_year = new Date()
let year = footer_year.getFullYear()
document.getElementById('footer_year').innerHTML = '© ' + year + ' - German Cruz'

// ********************************BOTON VOLVER ARRIBA**************************************
//Get the button
var mybutton = document.getElementById('btnArriba')

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
	scrollFunction()
}

function scrollFunction() {
	if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
		mybutton.style.display = 'block'
	} else {
		mybutton.style.display = 'none'
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0
	document.documentElement.scrollTop = 0
}
// ********************************BOTON VOLVER ARRIBA**************************************

// **********************************SHOW HIDE OPERA CODES WITH CHECBOX***********************

if (document.querySelectorAll('.opera-code-check')) {
	function checkAllCodes() {
		let checkbox = document.querySelectorAll('.opera-code-check')
		for (let i = 0; i < checkbox.length; i++) {
			checkbox[i].checked = true
		}
	}
}

function filterCheckbox() {
	let table = document.getElementById('myTable')
	let tr = table.getElementsByTagName('tr')
	let checkboxCG = document.getElementById('campogolf')
	let checkboxMG = document.getElementById('minigolf')
	let checkboxPago = document.getElementById('pagos')

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName('td')[2]
		if (td) {
			tdValue = td.textContent || td.innerText
			if (checkboxCG.checked == true && tdValue == 'Campo Golf') {
				tr[i].style.display = ''
			} else if (checkboxMG.checked == true && tdValue == 'Mini Golf') {
				tr[i].style.display = ''
			} else if (checkboxPago.checked == true && tdValue == 'Pagos') {
				tr[i].style.display = ''
			} else {
				tr[i].style.display = 'none'
			}
		}
	}
}

//*****************************BUSQUEDA EN TABLAS********************************/
let delay = 0
let delayTimeout
if ((imgResult = document.getElementById('noResults'))) {
	imgResult.style.display = 'none'
}
function filtroBusqueda(secs) {
	delay = secs * 1000
	clearTimeout(delayTimeout)

	delayTimeout = setTimeout(mySearchFunction, delay)
}

function mySearchFunction() {
	// Declare variables
	let input, filter, table, tr, td1, td2, i, imgResult
	input = document.getElementById('myInput')
	imgResult = document.getElementById('noResults')
	filter = input.value.toUpperCase()
	table = document.getElementById('myTable')
	tr = table.getElementsByTagName('tr')

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		td1 = tr[i].getElementsByTagName('td')[0]
		td2 = tr[i].getElementsByTagName('td')[1]
		td3 = tr[i].getElementsByTagName('td')[2]
		td4 = tr[i].getElementsByTagName('td')[3]
		if (td1 || td2 || td3 || td4) {
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
				imgResult.style.display = 'none'
			} else {
				tr[i].style.display = 'none'
			}
		} else {
			imgResult.style.display = 'block'
		}
	}
}

//*****************************FIN BUSQUEDA EN TABLAS********************************/

//DISABLED BUTTON
if (document.getElementById('btnEditUser')) {
	document.getElementById('btnEditUser').disabled = true
}

//PASS CAOMPARE
let checkPass = function () {
	let password = document.getElementById('password')
	let pass_conf = document.getElementById('pass_conf')

	if (password.length != 0 && pass_conf.length != 0 && password.value != '' && pass_conf.value != '' && password.value == pass_conf.value) {
		document.getElementById('message').style.color = 'green'
		document.getElementById('message').innerHTML = 'Contraseñas coinciden'
		if (document.getElementById('btnEditUser')) {
			document.getElementById('btnEditUser').disabled = false
		}
	} else {
		document.getElementById('message').style.color = 'red'
		document.getElementById('message').innerHTML = 'No coinciden'
		if (document.getElementById('btnEditUser')) {
			document.getElementById('btnEditUser').disabled = true
		}
	}
}
// PONER TEXTO MAYUSCULAS EN FORMS
function mayus(e) {
	e.value = e.value.toUpperCase()
}

// titulos
if (document.getElementById('navbar_titulo_pagina')) {
	let main_title = document.getElementById('navbar_titulo_pagina').innerHTML
	document.getElementById('navbarLG_titulo').innerHTML = main_title
	document.getElementById('navbarSM_titulo').innerHTML = main_title
	if (document.getElementById('navbar_titulo_pagina').innerHTML != 'Guía Hard Rock Golf club') {
		document.getElementById('page_title').innerHTML = main_title + ' - Guía Hard Rock Golf club'
	} else {
		document.getElementById('page_title').innerHTML = main_title
	}
}

//************************UPLOAD BUTTON DISABLED */
function inform() {
	let nombreGuia = document.getElementById('nombreGuia').value
	let descripcion = document.getElementById('descripcion').value
	let file = document.getElementById('fileGuide').value

	if (!file || nombreGuia.length == 0 || descripcion.length == 0) {
		document.getElementById('upload').disabled = true
	} else if (file && nombreGuia && descripcion) {
		document.getElementById('upload').disabled = false
	}
}

// AGREGAR NUEVOS
if (document.getElementById('add_new_form')) {
	const form = document.getElementById('add_new_form')
	form.addEventListener('submit', (evt) => {
		let selected = confirm('Seguro que desea agregarlo?')
		if (selected == false) {
			evt.preventDefault()
		}
	})
}

// EDITAR
if (document.getElementById('edit_form')) {
	const form = document.getElementById('edit_form')
	form.addEventListener('submit', (evt) => {
		let selected = confirm('Seguro que desea editarlo?')
		if (selected == false) {
			evt.preventDefault()
		}
	})
}

// ELIMINAR
function confirm_delete() {
	let answer = confirm('Seguro que desea eliminarlo?')
	if (answer == false) {
		return false
	}
}

// FOCUS
let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
if (!isMobile) {
	// FOCUS NEW IMPUT FORM
	if (document.getElementById('nombre')) {
		const input = document.getElementById('nombre')

		// fires when a page is loaded fully
		window.addEventListener('load', (e) => {
			input.focus()
		})
	}

	//SEARCH BAR
	if (document.getElementById('myInput')) {
		const busqueda = document.getElementById('myInput')

		// fires when a page is loaded fully
		window.addEventListener('load', (e) => {
			busqueda.focus()
		})
	}
}
