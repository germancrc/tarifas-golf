const db = require('../database/db')
const bcrypt = require('bcryptjs')

// CREAR USER
exports.view_minigolf = async (req, res) => {
	db.query('SELECT * FROM tarifasmg order by cod_opera asc', (error, results) => {
		if (results) {
			res.render('minigolf', {
				user: req.user,
				results: results,
				alert: false,
			})
		} else {
			throw error
		}
	})
}

exports.view_opera = async (req, res) => {
	db.query('SELECT * FROM opera_codes WHERE nombre != "NO SE POSTEA EN OPERA" order by uso, codigo asc', (error, results) => {
		if (results) {
			res.render('opera', {
				user: req.user,
				alert: false,
				results: results,
				error: false,
			})
		} else {
			throw error
		}
	})
}

exports.view_index = async (req, res) => {
	db.query('SELECT * FROM servicios ORDER BY nombre asc', (error, results) => {
		if (results) {
			res.render('index', {
				user: req.user,
				results: results,
				alert: false,
			})
		} else {
			throw error
		}
	})
}

exports.view_edit_current_user = async (req, res) => {
	res.render('edit-usuario-actual', { alert: false, user: req.user })
}

// EDITAR 1 USER
exports.update_current_user = async (req, res) => {
	try {
		const { id } = req.params
		const old_password = req.body.old_password
		const pass = req.body.password
		let password = await bcrypt.hash(pass, 8)
		db.query('select * from usuarios where id = ?', [id], (error, results) => {
			bcrypt.compare(old_password, results[0].password, function (err, result) {
				if (result == false) {
					res.render('edit-usuario-actual', {
						errorMessage: 'Contraseña actual incorrecta.',
						logged: req.user,
						user: results[0],
					})
				} else {
					db.query('UPDATE usuarios SET password = ? WHERE id = ?', [password, id])
					res.redirect('/index')
				}
			})
		})
	} catch (error) {
		console.log(error)
	}
}
