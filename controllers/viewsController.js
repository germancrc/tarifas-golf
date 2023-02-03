const db = require('../database/db')
const bcrypt = require('bcryptjs')

// CREAR USER
exports.view_minigolf = async (req, res) => {
	db.query('SELECT * FROM tarifasmg order by cod_opera asc', (error, results) => {
		if (results) {
			res.render('minigolf', {
				logged: req.user,
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
				logged: req.user,
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
				logged: req.user,
				results: results,
				alert: false,
				message: req.flash('message'),
			})
		} else {
			throw error
		}
	})
}
