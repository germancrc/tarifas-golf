const db = require('../database/db')
const { promisify } = require('util')

exports.createRateMg = async (req, res) => {
	try {
		const nombre = req.body.nombre
		const precio = req.body.precio
		const cod_opera = req.body.cod_opera
		const descripcion = req.body.descripcion

		db.query('INSERT INTO tarifasmg SET ?', { nombre: nombre, precio: precio, cod_opera: cod_opera, descripcion: descripcion }, (error, results) => {
			if (error) {
				console.log(error)
			}
			req.flash('message', 'Tarifa agregada con éxito')
			res.redirect('/ajustes/tarifas-mg')
			//    console.log(results);
		})
	} catch (error) {
		console.log(error)
	}
}

//MOSTRAR CODIGOS OPERA NUEVA TARIFA-MG
exports.getOperaCodes = (req, res) => {
	try {
		db.query('SELECT * FROM opera_codes where uso = "mini golf" order by codigo asc', (error, results) => {
			if (results) {
				res.render('ajustes/new-tarifas-mg', { user: req.user, alert: false, results: results, error: false })
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error)
	}
}

//MOSTRAR TODOS TARIFA-MG
exports.getRatesMg = (req, res) => {
	try {
		db.query('SELECT * FROM tarifasmg', (error, results) => {
			if (results) {
				res.render('ajustes/tarifas-mg', { user: req.user, alert: false, results: results, error: false, message: req.flash('message') })
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error)
	}
}

// MOSTRAR 1 TARIFA-MG
exports.getRateMg = (req, res) => {
	let resultsRates = []
	let resultsCodes = []
	try {
		const { id } = req.params
		db.query('SELECT * FROM tarifasmg WHERE id=?', [id], (error, resultsRatesMg) => {
			if (error) throw error

			db.query('SELECT * FROM opera_codes where uso = "mini golf" order by codigo asc', (error, resultsCodes) => {
				if (error) throw error
				resultsCodes.push(resultsCodes)
				res.render('ajustes/edit-tarifa-mg', {
					user: req.user,
					resultsRatesMg: resultsRatesMg[0],
					resultsCodes: resultsCodes,
					alert: false,
				})
			})
		})
	} catch (error) {
		console.log(error.message)
	}
}

// EDITAR 1 TARIFA-MG
exports.updateRateMg = (req, res) => {
	try {
		const { id } = req.params
		const { nombre, precio, cod_opera, descripcion } = req.body
		const editedRate = { nombre, precio, cod_opera, descripcion }
		db.query('UPDATE tarifasmg SET ? WHERE id = ?', [editedRate, id])
		req.flash('message', 'Tarifa editada con éxito')
		res.redirect('/ajustes/tarifas-mg')
	} catch (error) {
		console.log(error)
	}
}

// BORRAR TARIFA-MG
exports.deleteRateMg = (req, res) => {
	try {
		const { id } = req.params
		db.query('DELETE FROM tarifasmg WHERE id = ?', [id])
		req.flash('message', 'Tarifa eliminada con éxito')
		res.redirect('/ajustes/tarifas-mg')
	} catch (error) {
		console.log(error)
	}
}
