const db = require('../database/db')

exports.createService = async (req, res) => {
	try {
		const nombre = req.body.nombre
		const precio = req.body.precio
		const cod_opera = req.body.cod_opera
		const descripcion = req.body.descripcion

		db.query(
			'INSERT INTO servicios SET ?',
			{
				nombre: nombre,
				precio: precio,
				descripcion: descripcion,
				cod_opera: cod_opera,
			},
			(error, results) => {
				if (error) {
					console.log(error)
				}
				res.redirect('/ajustes/servicios-conf')
			}
		)
	} catch (error) {
		console.log(error)
	}
}

//MOSTRAR CODIGOS OPERA NUEVO SERVICIO
exports.getOperaCodes = (req, res) => {
	try {
		db.query('SELECT * FROM opera_codes where uso = "campo golf" order by codigo asc', (error, results) => {
			if (results) {
				res.render('ajustes/new-servicio', {
					user: req.user,
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

//MOSTRAR TODOS LOS SERVICIOS
exports.getServices = (req, res) => {
	try {
		db.query('SELECT * FROM servicios ORDER BY nombre asc', (error, results) => {
			if (results) {
				res.render('ajustes/servicios-conf', {
					user: req.user,
					results: results,
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

// MOSTRAR 1 SERVICIO
exports.getService = (req, res) => {
	let resultsServices = []
	let resultsCodes = []
	try {
		const { id } = req.params
		db.query('SELECT * FROM servicios WHERE id=?', [id], (error, resultsServices) => {
			if (error) throw error
			resultsServices.push(resultsServices)

			db.query('SELECT * FROM opera_codes where uso = "campo golf" order by codigo asc', (error, resultsCodes) => {
				if (error) throw error
				resultsCodes.push(resultsCodes)
				res.render('ajustes/edit-servicio', {
					user: req.user,
					resultsServices: resultsServices[0],
					resultsCodes: resultsCodes,
					alert: false,
				})
			})
		})
	} catch (error) {
		console.log(error.message)
	}
}

// EDITAR 1 SERVICIO
exports.updateService = (req, res) => {
	try {
		const { id } = req.params
		const { nombre, precio, cod_opera, descripcion } = req.body
		const editedServ = { nombre, precio, cod_opera, descripcion }
		db.query('UPDATE servicios SET ? WHERE id = ?', [editedServ, id])
		res.redirect('/ajustes/servicios-conf')
	} catch (error) {
		console.log(error)
	}
}

// BORRAR SERVICIO
exports.deleteService = (req, res) => {
	try {
		const { id } = req.params
		db.query('DELETE FROM servicios WHERE id = ?', [id])
		res.redirect('/ajustes/servicios-conf')
	} catch (error) {
		console.log(error.message)
	}
}
