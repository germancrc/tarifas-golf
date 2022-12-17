//************************SHOW SPINNER */
let btnGuiaBase = document.getElementById('btnGuiaBase')
let spinner = document.getElementById('showSpin')

function showSpinner() {
	spinner.className = 'd-block'
	btnGuiaBase.className = 'd-none'
}

// PAGE RELOADED
let data = window.performance.getEntriesByType('navigation')[0].type
if ((data = 'reload')) {
	spinner.className = 'd-none'
	btnGuiaBase.className = 'd-block'
}
