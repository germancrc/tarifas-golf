const db = require('../database/db')
const fs = require('fs')

//subir guias
exports.uploadGuide = async (req, res) => {
	try {
		const aplicacion = req.body.aplicacion
		const archivo = req.file.originalname
		const fileData = req.file.buffer.toString('base64')
		const fileSize = req.file.size

		db.query(
			'INSERT INTO guias_hrgolf SET ?',
			{
				aplicacion: aplicacion,
				archivo: archivo,
				fileData: fileData,
				fileSize: fileSize,
			},
			(error, results) => {
				if (error) {
					console.log(error)
				}
				res.redirect('/ajustes/guias-conf')
			}
		)
	} catch (error) {
		console.log(error)
	}
}

//MOSTRAR todas guias
exports.getGuides = (req, res) => {
	try {
		db.query(
			'select id, aplicacion, archivo,  DATE_FORMAT(CONVERT_TZ(actualizado,"+00:00","-04:00"), "%d/%c/%y - %H:%i:%s") as actualizado, fileSize from guias_hrgolf ORDER BY aplicacion asc, actualizado desc',
			(error, results) => {
				if (results) {
					res.render('ajustes/guias-conf', {
						user: req.user,
						alert: false,
						results: results,
						error: false,
					})
				} else {
					throw error
				}
			}
		)
	} catch (error) {
		console.log(error)
	}
}

// exports.getGuides = (req, res) => {
// 	// let resultsAllGuides = []
// 	try {
// 		db.query('SELECT aplicacion from guias_hrgolf group by aplicacion', (error, resultsFilteredGuides) => {
// 			if (error) throw error
// 			// resultsFilteredGuides.push(resultsFilteredGuides)
// 			resultsFilteredGuides = resultsFilteredGuides.map(({ aplicacion }) => aplicacion)
// 			console.log(resultsFilteredGuides)

// 			db.query('select * from guias_hrgolf where aplicacion != "opera"', (error, resultsAllGuides) => {
// 				if (error) throw error
// 				resultsAllGuides.push(resultsAllGuides)
// 				console.log(resultsAllGuides)
// 				res.render('ajustes/guias-conf', {
// 					user: req.user,
// 					alert: false,
// 					results: resultsAllGuides,
// 					error: false,
// 				})
// 			})
// 		})
// 	} catch (error) {
// 		console.log(error)
// 	}
// }

// BORRAR GUIA
exports.deleteGuide = (req, res) => {
	try {
		const { id } = req.params
		db.query('DELETE FROM guias_hrgolf WHERE id = ?', [id])
		res.redirect('/ajustes/guias-conf')
	} catch (error) {
		console.log(error)
	}
}

// DESCARGAR GUIA
exports.downloadGuide = (req, res) => {
	try {
		const id = req.params.id
		db.query('SELECT aplicacion, fileData FROM guias_hrgolf WHERE id=?', [id], (error, data) => {
			if (data) {
				let archivo = data[0].aplicacion
				let datos = data[0].fileData
				res.type('application/pdf')
				res.header('Content-Disposition', `attachment; filename="${archivo}.pdf"`)
				res.send(Buffer.from(datos, 'base64'))
			} else {
				throw error
			}
		})
	} catch (error) {
		console.log(error.message)
	}
}
