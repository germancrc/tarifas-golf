const db = require('../database/db')
const bcrypt = require('bcryptjs')

// CREAR USER
exports.view_minigolf = async (req, res) => {
	db.query('SELECT * FROM pms where ttoo_depto = "mini golf"', (error, resultsPM) => {
		if (error) throw error
		db.query('SELECT * FROM tarifasmg order by cod_opera asc', (error, results) => {
			if (results) {
				res.render('minigolf', {
					logged: req.user,
					results: results,
					resultsPM: resultsPM,
					alert: false,
				})
			} else {
				throw error
			}
		})
	})
}

exports.view_index = async (req, res) => {
	db.query('SELECT * FROM pms where ttoo_depto = "campo de golf"', (error, resultsPM) => {
		if (error) throw error
		db.query('SELECT * FROM servicios ORDER BY nombre asc', (error, results) => {
			if (results) {
				res.render('index', {
					logged: req.user,
					results: results,
					resultsPM: resultsPM,
					alert: false,
					message: req.flash('message'),
				})
			} else {
				throw error
			}
		})
	})
}
