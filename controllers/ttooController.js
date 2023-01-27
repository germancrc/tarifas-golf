const db = require('../database/db')
const { promisify } = require('util')

exports.createTtoo = async (req, res) => {
	try {
		const nombre = req.body.nombre
		const green_fee = req.body.green_fee
		const twilight = req.body.twilight
		const cod_opera = req.body.cod_opera
		const operacion = req.body.operacion

		db.query('SELECT nombre FROM ttooRates where nombre = ?', [nombre], (error, results) => {
			if (results.length > 0) {
				req.flash('message', 'El TTOO ' + nombre + ' ya existe')
				res.redirect('/ajustes/new-ttoo')
			} else {
				db.query(
					'INSERT INTO ttooRates SET ?',
					{ nombre: nombre, green_fee: green_fee, twilight: twilight, cod_opera: cod_opera, operacion: operacion },
					(error, results) => {
						if (error) {
							console.log(error)
						}
						req.flash('message', 'El TTOO ' + nombre + ' fué agrgado con éxito')
						res.redirect('/ajustes/ttoo-conf')
					}
				)
			}
		})
	} catch (error) {
		console.log(error)
	}
}

//MOSTRAR CODIGOS OPERA NUEVO TTOO
exports.getOperaCodes = (req, res) => {
	try {
		db.query('SELECT * FROM opera_codes WHERE nombre LIKE "%agencia%"', (error, results) => {
			if (results) {
				res.render('ajustes/new-ttoo', { user: req.user, alert: false, results: results, error: false, message: req.flash('message') })
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error)
	}
}

//MOSTRAR TODOS LOS TTOO
exports.getTtoos = (req, res) => {
	try {
		db.query('SELECT * FROM ttooRates order by nombre asc', (error, results) => {
			if (results) {
				res.render('ajustes/ttoo-conf', { user: req.user, alert: false, results: results, error: false, message: req.flash('message') })
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error)
	}
}

// MOSTRAR 1 TTOO
exports.getTtoo = (req, res) => {
	try {
		const id = req.params.id
		db.query('SELECT * FROM ttooRates WHERE id=?', [id], (error, results) => {
			if (results) {
				res.render('ajustes/edit-ttoo', { user: req.user, ttoo: results[0], alert: false })
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error.message)
	}
}

// EDITAR 1 TTOO
exports.updateTtoo = (req, res) => {
	try {
		const { id } = req.params
		const { nombre, green_fee, twilight, cod_opera, operacion } = req.body
		const editedTtoo = { nombre, green_fee, twilight, cod_opera, operacion }
		db.query('UPDATE ttooRates SET ? WHERE id = ?', [editedTtoo, id])
		req.flash('message', 'El TTOO ' + nombre + ' fué editado con éxito')
		res.redirect('/ajustes/ttoo-conf')
	} catch (error) {
		console.log(error)
	}
}

// BORRAR TTOO
exports.deleteTtoo = (req, res) => {
	try {
		const { id } = req.params
		db.query('DELETE FROM ttooRates WHERE id = ?', [id])
		req.flash('message', 'TTOO eliminado con éxito')
		res.redirect('/ajustes/ttoo-conf')
	} catch (error) {
		console.log(error)
	}
}
