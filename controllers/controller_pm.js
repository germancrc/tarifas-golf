const db = require('../database/db')

exports.crear_pm = async (req, res) => {
	try {
		const pm = req.body.pm
		const ttoo_depto = req.body.ttoo_depto
		const nombre_opera = req.body.nombre_opera
		const descripcion = req.body.descripcion

		db.query('INSERT INTO pms SET ?', { pm: pm, ttoo_depto: ttoo_depto, nombre_opera: nombre_opera, descripcion: descripcion }, (error, results) => {
			if (results) {
				req.flash('message', `PM ${pm} agregada con éxito`)
				res.redirect('/ajustes/conf_pm')
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error)
	}
}

//RENDER NEW OPERA CODE PAGE
exports.new_pm = (req, res) => {
	try {
		res.render('ajustes/new_pm', { logged: req.user, alert: false, error: false, message: req.flash('message') })
	} catch (error) {
		console.log(error)
	}
}

//MOSTRAR TODAS TAREAS
exports.get_all_pm = (req, res) => {
	try {
		db.query('SELECT * FROM pms ORDER BY pm asc', (error, results) => {
			if (results) {
				res.render('ajustes/conf_pm', { logged: req.user, alert: false, results: results, error: false, message: req.flash('message') })
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error)
	}
}

// MOSTRAR 1 TAREA
exports.get_pm = (req, res) => {
	try {
		const id = req.params.id
		db.query('SELECT * FROM pms WHERE id=?', [id], (error, results) => {
			if (results) {
				res.render('ajustes/edit_pm', { logged: req.user, pms: results[0], alert: false })
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error.message)
	}
}

// EDITAR 1 PM
exports.update_pm = (req, res) => {
	try {
		const { id } = req.params
		const { pm, ttoo_depto, nombre_opera, descripcion } = req.body
		const editedPM = { pm, ttoo_depto, nombre_opera, descripcion }
		db.query('UPDATE pms SET ? WHERE id = ?', [editedPM, id])
		req.flash('message', 'PM editada con éxito')
		res.redirect('/ajustes/conf_pm')
	} catch (error) {
		console.log(error)
	}
}

// BORRAR PM
exports.delete_pm = (req, res) => {
	try {
		const { id } = req.params
		db.query('DELETE FROM pms WHERE id = ?', [id])
		req.flash('message', 'PM eliminada con éxito')
		res.redirect('/ajustes/conf_pm')
	} catch (error) {
		console.log(error)
	}
}

//VIEW PM
exports.view_pm = async (req, res) => {
	try {
		db.query('SELECT * FROM pms ORDER BY pm asc', (error, results) => {
			if (results) {
				res.render('pm', { logged: req.user, alert: false, results: results, error: false })
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error)
	}
}
