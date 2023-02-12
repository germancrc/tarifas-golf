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

		db.query('SELECT username FROM usuarios where username = ?', [username], (error, results) => {
			if (results.length > 0) {
				req.flash('message', 'El usuario ' + username + ' ya existe')
				res.redirect('/ajustes/new_usuario')
			} else {
				db.query('INSERT INTO usuarios SET ?', { nombre: nombre, username: username, password: passHash, rol: rol }, (error, results) => {
					if (results) {
						req.flash('message', 'Usuario ' + username + ' agregado con éxito')
						res.redirect('/ajustes/conf_usuarios')
					}
				})
			}
		})
	} catch (error) {
		console.log(error)
	}
}

//NUEVO USER
exports.newUser = (req, res) => {
	res.render('ajustes/new_usuario', {
		logged: req.user,
		alert: false,
		error: false,
		message: req.flash('message'),
	})
}

//MOSTRAR TODOS LOS USERS
exports.getUsers = (req, res) => {
	try {
		db.query("SELECT * FROM usuarios  where username not in ('admin', 'superuser' ) ORDER BY username asc", (error, results) => {
			if (results) {
				res.render('ajustes/conf_usuarios', {
					logged: req.user,
					alert: false,
					results: results,
					error: false,
					message: req.flash('message'),
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
				res.render('ajustes/edit_usuario', {
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

		if (old_password.length > 0) {
			db.query('select * from usuarios where id = ?', [id], (error, results) => {
				if (error) {
					throw error
				} else {
					bcrypt.compare(old_password, results[0].password, function (err, result) {
						if (result == false) {
							res.render('ajustes/edit_usuario', {
								alert: true,
								errorMessage: 'Contraseña actual incorrecta',
								logged: req.user,
								user: results[0],
							})
						} else {
							db.query('UPDATE usuarios SET password = ? WHERE id = ?', [password, id])
							req.flash('message', 'El usuario ' + username + ' fué editado con éxito')
							res.redirect('/ajustes/conf_usuarios')
						}
					})
				}
			})
		} else {
			db.query('UPDATE usuarios SET ? WHERE id = ?', [editedUser, id])
			req.flash('message', 'El usuario ' + username + ' fué editado con éxito')
			res.redirect('/ajustes/conf_usuarios')
		}
	} catch (error) {
		console.log(error)
	}
}

// BORRAR USER
exports.deleteUser = (req, res) => {
	try {
		const { id } = req.params
		db.query('DELETE FROM usuarios WHERE id = ?', [id])
		req.flash('message', 'Usuario eliminado con éxito')
		res.redirect('/ajustes/conf_usuarios')
	} catch (error) {
		console.log(error)
	}
}

//VIEW
exports.view_edit_current_user = async (req, res) => {
	res.render('edit-usuario-actual', { alert: false, logged: req.user })
}

// EDITAR CURRENT USER
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
						alert: true,
						// alertTitle: 'Registration',
						errorMessage: 'Contraseña actual incorrecta',
						logged: req.user,
						user: results[0],
					})
				} else {
					db.query('UPDATE usuarios SET password = ? WHERE id = ?', [password, id])
					req.flash('message', 'Contraseña actualizada')
					res.redirect('/index')
				}
			})
		})
	} catch (error) {
		console.log(error)
	}
}
