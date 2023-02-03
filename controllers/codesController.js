const db = require('../database/db')
const { promisify } = require('util')

exports.createCode = async (req, res) => {
	try {
		const codigo = req.body.codigo
		const nombre = req.body.nombre
		const uso = req.body.uso
		const descripcion = req.body.descripcion

		db.query('SELECT codigo FROM opera_codes where codigo = ?', [codigo], (error, results) => {
			if (results.length > 0) {
				req.flash('message', 'El código ' + codigo + ' ya existe')
				res.redirect('/ajustes/new-opera-codes')
			} else {
				db.query('INSERT INTO opera_codes SET ?', { codigo: codigo, nombre: nombre, uso: uso, descripcion: descripcion }, (error, results) => {
					if (results) {
						req.flash('message', 'El código ' + codigo + ' - ' + nombre + ' fué agregado con éxito')
						res.redirect('/ajustes/opera-codes')
					}
				})
			}
		})
	} catch (error) {
		console.log(error)
	}
}

//RENDER NEW OPERA CODE PAGE
exports.getOperaCodes = (req, res) => {
	try {
		res.render('ajustes/new-opera-codes', { logged: req.user, alert: false, error: false, message: req.flash('message') })
	} catch (error) {
		console.log(error)
	}
}

//MOSTRAR TODOS LOS CODES
exports.getCodes = (req, res) => {
	try {
		db.query('SELECT * FROM opera_codes order by uso, codigo asc', (error, results) => {
			if (results) {
				res.render('ajustes/opera-codes', { logged: req.user, alert: false, results: results, error: false, message: req.flash('message') })
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error)
	}
}

// MOSTRAR 1 CODE
exports.getCode = (req, res) => {
	try {
		const id = req.params.id
		db.query('SELECT * FROM opera_codes WHERE id=?', [id], (error, results) => {
			if (results) {
				res.render('ajustes/edit-codes', { logged: req.user, code: results[0], alert: false })
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error.message)
	}
}

// EDITAR 1 CODE
exports.updateCode = (req, res) => {
	try {
		const { id } = req.params
		const { codigo, nombre, uso, descripcion } = req.body
		const editedCode = { codigo, nombre, uso, descripcion }
		db.query('UPDATE opera_codes SET ? WHERE id = ?', [editedCode, id])
		req.flash('message', 'El código ' + codigo + ' - ' + nombre + ' fué editado con éxito')
		res.redirect('/ajustes/opera-codes')
	} catch (error) {
		console.log(error)
	}
}

// BORRAR CODE
exports.deleteCode = (req, res) => {
	try {
		const { id } = req.params
		db.query('DELETE FROM opera_codes WHERE id = ?', [id])
		req.flash('message', 'Código eliminado con éxito')
		res.redirect('/ajustes/opera-codes')
	} catch (error) {
		console.log(error)
	}
}
