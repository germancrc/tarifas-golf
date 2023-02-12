const db = require('../database/db')
const { promisify } = require('util')

//********************************************* CRUD ***********************************
exports.createRate = async (req, res) => {
	try {
		const nombre = req.body.nombre
		const precio = req.body.precio
		const cod_opera = req.body.cod_opera
		const cliente = req.body.cliente
		const tips = req.body.tips

		db.query(
			'INSERT INTO tarifas SET ?',
			{ nombre: nombre, precio: precio, cod_opera: cod_opera, cliente: cliente, tips: tips },
			(error, results) => {
				if (error) {
					console.log(error)
				}
				req.flash('message', 'La tarifa ' + nombre + ' fué agregada con éxito')
				res.redirect('/ajustes/conf_tarifas_cg')
				console.log(results)
			}
		)
	} catch (error) {
		console.log(error)
	}
}

//MOSTRAR CODIGOS OPERA NUEVA TARIFA CG
exports.getOperaCodes = (req, res) => {
	try {
		db.query('SELECT * FROM opera_codes where uso = "campo golf" order by codigo asc', (error, results) => {
			if (results) {
				res.render('ajustes/new_tarifa_cg', { logged: req.user, alert: false, results: results, error: false })
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error)
	}
}

//MOSTRAR TODOS LAS TARIFA CG
exports.getRatesCg = (req, res) => {
	try {
		db.query('SELECT * FROM tarifas ORDER BY nombre asc', (error, results) => {
			if (results) {
				res.render('ajustes/conf_tarifas_cg', { logged: req.user, alert: false, results: results, error: false, message: req.flash('message') })
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error)
	}
}

// MOSTRAR 1 TARIFA CG
exports.getRateCg = (req, res) => {
	let resultsRates = []
	let resultsCodes = []
	try {
		const { id } = req.params
		db.query('SELECT * FROM tarifas WHERE id=?', [id], (error, resultsRates) => {
			if (error) throw error

			db.query('SELECT * FROM opera_codes where uso = "campo golf" order by codigo asc', (error, resultsCodes) => {
				if (error) throw error
				resultsCodes.push(resultsCodes)
				res.render('ajustes/edit_tarifa_cg', {
					logged: req.user,
					resultsRates: resultsRates[0],
					resultsCodes: resultsCodes,
					alert: false,
				})
			})
		})
	} catch (error) {
		console.log(error.message)
	}
}

// EDITAR 1 TARIFA CG
exports.updateRateCg = (req, res) => {
	try {
		const { id } = req.params
		const { nombre, precio, cod_opera, cliente, tips } = req.body
		const editedRate = { nombre, precio, cod_opera, cliente, tips }
		db.query('UPDATE tarifas SET ? WHERE id = ?', [editedRate, id])
		req.flash('message', 'La tarifa ' + nombre + ' fué editada con éxito')
		res.redirect('/ajustes/conf_tarifas_cg')
	} catch (error) {
		console.log(error)
	}
}

// BORRAR TARIFA CG
exports.deleteRateCg = (req, res) => {
	try {
		const { id } = req.params
		db.query('DELETE FROM tarifas WHERE id = ?', [id])
		req.flash('message', 'Tarifa eliminada con éxito')
		res.redirect('/ajustes/conf_tarifas_cg')
	} catch (error) {
		console.log(error)
	}
}

//********************************************* END CRUD ***********************************

//********************************************* VIEWS ***********************************
// VISTA TARIFAS
exports.viewRatesCg = (req, res) => {
	res.render('tarifas', { logged: req.user, alert: false })
}

exports.viewRatesTurista = (req, res) => {
	db.query('SELECT * FROM tarifas where cliente IN ("extranjero", "varios") ORDER BY nombre asc', (error, results) => {
		if (results) {
			res.render('tarifas/tarifa-turista', {
				logged: req.user,
				results: results,
				alert: false,
			})
		} else {
			throw error
		}
	})
}
exports.viewRatesTtoo = (req, res) => {
	db.query('SELECT * FROM ttooRates order by nombre asc', (error, results) => {
		if (results) {
			res.render('tarifas/tarifa-ttoo', {
				logged: req.user,
				results: results,
				alert: false,
			})
		} else {
			throw error
		}
	})
}

exports.viewRatesLocal = (req, res) => {
	db.query('SELECT * FROM tarifas where cliente IN ("local", "varios") ORDER BY nombre asc', (error, results) => {
		if (results) {
			res.render('tarifas/tarifa-local', {
				logged: req.user,
				results: results,
				alert: false,
			})
		} else {
			throw error
		}
	})
}

exports.viewRatesHotel = (req, res) => {
	db.query('SELECT * FROM tarifas where cliente IN ("hotel", "varios") ORDER BY nombre asc', (error, results) => {
		if (results) {
			res.render('tarifas/tarifa-hotel', {
				logged: req.user,
				results: results,
				alert: false,
			})
		} else {
			throw error
		}
	})
}

//********************************************* END VIEWS ***********************************
