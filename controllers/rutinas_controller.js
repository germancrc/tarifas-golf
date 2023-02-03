const db = require('../database/db')

exports.create_tarea = async (req, res) => {
	try {
		const tarea = req.body.tarea
		const turno_tarea = req.body.turno_tarea

		db.query('INSERT INTO tareas_diarias SET ?', { tarea: tarea, turno_tarea: turno_tarea }, (error, results) => {
			if (results) {
				req.flash('message', 'Tarea agregada con éxito')
				res.redirect('/ajustes/rutinas-conf')
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
				res.render('ajustes/rutinas-conf', { logged: req.user, alert: false, results: results, error: false, message: req.flash('message') })
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

// EDITAR 1 TAREA
exports.update_tarea = (req, res) => {
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

// BORRAR TAREA
exports.delete_tarea = (req, res) => {
	try {
		const { id } = req.params
		db.query('DELETE FROM tareas_diarias WHERE id = ?', [id])
		req.flash('message', 'Tarea eliminada con éxito')
		res.redirect('/ajustes/rutinas-conf')
	} catch (error) {
		console.log(error)
	}
}

//VIEW RUTINAS
exports.view_rutinas = async (req, res) => {
	try {
		db.query('SELECT * FROM tareas_diarias', (error, results) => {
			if (results) {
				res.render('RUTINAS', { logged: req.user, alert: false, results: results, error: false })
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error)
	}
}
