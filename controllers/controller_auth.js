const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../database/db')
const { promisify } = require('util')

exports.isAuthenticated = async (req, res, next) => {
	const token = req.cookies.jwt
	if (!token) {
		req.flash('message', 'Debe iniciar sesión')
		res.redirect('/')
	} else {
		const decodificada = await promisify(jwt.verify)(token, process.env.JWT_SECRETO)
		db.query('SELECT*FROM usuarios WHERE id = ?', [decodificada.id], (error, results) => {
			if (!results) {
				req.flash('message', 'Debe iniciar sesión')
				res.redirect('/')
				return next()
			} else {
				req.user = results[0]
				return next()
			}
		})
	}
}

///test expire error
// exports.isAuthenticated = async (req, res, next) => {
// 	const token = req.cookies.jwt
// 	if (!token) {
// 		req.flash('message', 'Debe iniciar sesión')
// 		res.redirect('/')
// 	} else {
// 		try {
// 			const decodificada = await promisify(jwt.verify)(token, process.env.JWT_SECRETO)
// 			db.query('SELECT*FROM usuarios WHERE id = ?', [decodificada.id], (error, results) => {
// 				if (!results) {
// 					req.flash('message', 'Debe iniciar sesión')
// 					res.redirect('/')
// 					return next()
// 				} else {
// 					req.user = results[0]
// 					return next()
// 				}
// 			})
// 			console.log(decodificada)
// 		} catch (error) {
// 			if (error instanceof jwt.TokenExpiredError) {
// 				req.flash('message', 'Debe iniciar sesión')
// 				res.redirect('/')
// 				console.log('El token ha expirado')
// 			} else if (error instanceof jwt.JsonWebTokenError) {
// 				req.flash('message', 'Debe iniciar sesión')
// 				res.redirect('/')
// 				console.log('El token es inválido')
// 			} else {
// 				req.flash('message', 'Debe iniciar sesión')
// 				res.redirect('/')
// 				console.log('Error al verificar el token', error)
// 			}
// 		}
// 	}
// }

exports.login = async (req, res) => {
	try {
		const user = req.body.user
		const password = req.body.password

		if (!user || !password) {
			req.flash('message', 'Complete todos los campos')
			res.redirect('/')
		} else {
			db.query('SELECT*FROM usuarios WHERE username = ?', [user], async (error, results) => {
				if (results.length == 0 || !(await bcrypt.compare(password, results[0].password))) {
					req.flash('message', 'Usuario y/o contraseña incorrectos')
					res.redirect('/')
				} else {
					//ya entra a la pagina principal
					const id = results[0].id
					const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
						expiresIn: process.env.JWT_TIEMPO_EXPIRA,
					})

					const cookiesOptions = {
						expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
						httpOnly: true,
					}
					res.cookie('jwt', token, cookiesOptions)
					res.redirect('index')
				}
			})
		}
	} catch (error) {
		console.log(error)
	}
}

exports.logout = (req, res) => {
	res.clearCookie('jwt')
	return res.redirect('/')
}

exports.checkAdmin = (req, res) => {
	db.query('SELECT * FROM usuarios', (error, results) => {
		if (req.user.rol === 'Admin') {
			res.render('ajustes', { logged: req.user, results: results, alert: false })
		} else {
			res.render('index', { logged: req.user, results: results, alert: false })
		}
	})
}
