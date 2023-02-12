const db = require('../database/db')

exports.create_tarea = async (req, res) => {
	try {
		const tarea = req.body.tarea
		const turno_tarea = req.body.turno_tarea

		db.query('INSERT INTO tareas_diarias SET ?', { tarea: tarea, turno_tarea: turno_tarea }, (error, results) => {
			if (results) {
				req.flash('message', 'Tarea agregada con éxito')
				res.redirect('/ajustes/conf_rutinas')
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error)
	}
}

//MOSTRAR TODAS TAREAS
exports.get_tareas = (req, res) => {
	try {
		db.query('SELECT * FROM tareas_diarias ORDER BY turno_tarea asc', (error, results) => {
			if (results) {
				res.render('ajustes/conf_rutinas', { logged: req.user, alert: false, results: results, error: false, message: req.flash('message') })
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error)
	}
}

// MOSTRAR 1 TAREA
exports.get_tarea = (req, res) => {
	try {
		const id = req.params.id
		db.query('SELECT * FROM tareas_diarias WHERE id=?', [id], (error, results) => {
			if (results) {
				res.render('ajustes/edit_rutina', { logged: req.user, code: results[0], alert: false })
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error.message)
	}
}

// EDITAR 1 TAREA
exports.update_tarea = (req, res) => {
	try {
		const { id } = req.params
		const { tarea, turno_tarea } = req.body
		const editedRutina = { tarea, turno_tarea }
		db.query('UPDATE tareas_diarias SET ? WHERE id = ?', [editedRutina, id])
		req.flash('message', 'Tarea editada con éxito')
		res.redirect('/ajustes/conf_rutinas')
	} catch (error) {
		console.log(error)
	}
}

// BORRAR TAREA
exports.delete_tarea = (req, res) => {
	try {
		const { id } = req.params
		db.query('DELETE FROM tareas_diarias WHERE id = ?', [id])
		req.flash('message', 'Tarea eliminada con éxito')
		res.redirect('/ajustes/conf_rutinas')
	} catch (error) {
		console.log(error)
	}
}

//VIEW RUTINAS
exports.view_rutinas = async (req, res) => {
	try {
		db.query('SELECT * FROM tareas_diarias', (error, results) => {
			if (results) {
				res.render('rutinas', { logged: req.user, alert: false, results: results, error: false })
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error)
	}
}

// TEST CHECKBOX
exports.test_checkbox = async (req, res) => {
	try {
		const { id } = req.params
		const user = req.user.id

		if (req.body.checkbox_check) {
			console.log('true')
		} else {
			console.log('false')
		}
		// if (req.body.checkbox_check) {
		// 	console.log('Tarea ' + id + ' true')
		// } else {
		// 	console.log('false')
		// }
		res.redirect('/rutinas')
	} catch (error) {
		console.log(error)
	}
}
