const bcrypt = require('bcryptjs')
const db = require('../database/db')
const { promisify } = require('util')

// CREAR USER
exports.createUser = async (req, res) => {
	try {
		const nombre = req.body.nombre
		const username = req.body.username
		const password = req.body.password
		let passHash = await bcrypt.hash(password, 8)
		const rol = req.body.rol

		db.query('INSERT INTO usuarios SET ?', { nombre: nombre, username: username, password: passHash, rol: rol }, (error, results) => {
			if (results) {
				res.redirect('/ajustes/usuarios-conf')
			}
		})
	} catch (error) {
		console.log(error)
	}
}

//MOSTRAR CODIGOS OPERA NUEVO TTOO
exports.newUser = (req, res) => {
	res.render('ajustes/new-usuario', {
		user: req.user,
		alert: false,
		error: false,
	})
}

//MOSTRAR TODOS LOS USERS
exports.getUsers = (req, res) => {
	try {
		db.query("SELECT * FROM usuarios  where username != 'superuser'", (error, results) => {
			if (results) {
				res.render('ajustes/usuarios-conf', {
					logged: req.user,
					alert: false,
					results: results,
					error: false,
				})
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error)
	}
}

// MOSTRAR 1 USER
exports.getUser = (req, res) => {
	try {
		const id = req.params.id
		db.query('SELECT * FROM usuarios WHERE id=?', [id], (error, results) => {
			if (results) {
				res.render('ajustes/edit-usuario', {
					logged: req.user,
					user: results[0],
					alert: false,
				})
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error)
	}
}

// EDITAR 1 USER
exports.updateUser = async (req, res) => {
	try {
		const { id } = req.params
		const { nombre, username, rol } = req.body
		const editedUser = { nombre, username, rol }
		const old_password = req.body.old_password
		const pass = req.body.password
		let password = await bcrypt.hash(pass, 8)
		db.query('select * from usuarios where id = ?', [id], (error, results) => {
			bcrypt.compare(old_password, results[0].password, function (err, result) {
				if (result == false) {
					res.render('ajustes/edit-usuario', {
						errorMessage: 'Contrase??a actual incorrecta.',
						logged: req.user,
						user: results[0],
					})
				} else {
					db.query('UPDATE usuarios SET ?, password = ? WHERE id = ?', [editedUser, password, id])
					res.redirect('/ajustes/usuarios-conf')
				}
			})
		})
	} catch (error) {
		console.log(error)
	}
}

// BORRAR USER
exports.deleteUser = (req, res) => {
	try {
		const { id } = req.params
		db.query('DELETE FROM usuarios WHERE id = ?', [id])
		res.redirect('/ajustes/usuarios-conf')
	} catch (error) {
		console.log(error)
	}
}
