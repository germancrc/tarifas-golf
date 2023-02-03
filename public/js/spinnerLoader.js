//************************SHOW SPINNER */
if (document.getElementById('btnGuiaBase')) {
	let btnGuiaBase = document.getElementById('btnGuiaBase')
}
let spinner = (document.getElementById('showSpin').style.display = 'none')

function showSpinner() {
	spinner.className = 'd-block'
	btnGuiaBase.className = 'd-none'
}

// PAGE RELOADED
let data = window.performance.getEntriesByType('navigation')[0].type
if ((data = 'reload')) {
	spinner.className = 'd-none'
	if (document.getElementById('btnGuiaBase')) {
		btnGuiaBase.className = 'd-block'
	}
}
