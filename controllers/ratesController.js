const db = require('../database/db')
const { promisify } = require('util')

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
				res.redirect('/ajustes/tarifas-conf')
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
				res.render('ajustes/new-tarifas-cg', { user: req.user, alert: false, results: results, error: false })
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
				res.render('ajustes/tarifas-conf', { user: req.user, alert: false, results: results, error: false })
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
	try {
		const id = req.params.id
		db.query('SELECT * FROM tarifas WHERE id=?', [id], (error, results) => {
			if (results) {
				res.render('ajustes/edit-tarifa', { user: req.user, rate: results[0], alert: false })
			} else {
				throw error
			}
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
		res.redirect('/ajustes/tarifas-conf')
	} catch (error) {
		console.log(error)
	}
}

// BORRAR TARIFA CG
exports.deleteRateCg = (req, res) => {
	try {
		const { id } = req.params
		db.query('DELETE FROM tarifas WHERE id = ?', [id])
		res.redirect('/ajustes/tarifas-conf')
	} catch (error) {
		console.log(error)
	}
}
