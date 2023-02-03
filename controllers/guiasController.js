const db = require('../database/db')

//subir guias
exports.uploadGuide = async (req, res) => {
	try {
		const aplicacion = req.body.aplicacion
		const descripcion = req.body.descripcion
		const archivo = req.file.originalname
		const fileData = req.file.buffer.toString('base64')
		const fileSize = req.file.size
		const autor = req.body.autor

		db.query(
			'INSERT INTO guias_hrgolf SET ?',
			{
				aplicacion: aplicacion,
				descripcion: descripcion,
				archivo: archivo,
				fileData: fileData,
				fileSize: fileSize,
				upload_by: autor,
			},
			(error, results) => {
				if (error) {
					console.log(error)
				}
				req.flash('message', 'La guía de' + aplicacion + ' fué agregada con éxito')
				res.redirect('/ajustes/guias-conf')
			}
		)
	} catch (error) {
		console.log(error)
	}
}

// MOSTRAR 1 guia
exports.getGuide = (req, res) => {
	try {
		const id = req.params.id
		db.query(
			'select id, aplicacion, descripcion, archivo,  DATE_FORMAT(CONVERT_TZ(actualizado,"+00:00","-04:00"), "%d/%b/%y - %H:%i:%s") as actualizado, fileSize, upload_by from guias_hrgolf WHERE id=?',
			[id],
			(error, results) => {
				if (results) {
					res.render('ajustes/edit-guide', { logged: req.user, guia: results[0], alert: false })
				} else {
					throw error
				}
			}
		)
	} catch (error) {
		console.log(error.message)
	}
}

exports.getGuides = (req, res) => {
	try {
		db.query('SELECT aplicacion, COUNT(*) as count from guias_hrgolf group by aplicacion ORDER BY aplicacion asc', (error, resultsFilteredGuides) => {
			if (error) throw error
			resultsFilteredGuides = resultsFilteredGuides.map(({ aplicacion }) => aplicacion)
			// console.log(resultsFilteredGuides)

			if (resultsFilteredGuides.length === 0) {
				try {
					db.query(
						'select guias_hrgolf.* from guias_hrgolf,(select aplicacion,max(actualizado) as actualizado from guias_hrgolf group by aplicacion) max_aplicacion where guias_hrgolf.aplicacion=max_aplicacion.aplicacion and guias_hrgolf.actualizado=max_aplicacion.actualizado order by aplicacion asc',
						(error, results) => {
							if (results) {
								res.render('ajustes/guias-conf', {
									logged: req.user,
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
			} else {
				db.query(
					'select id, aplicacion, descripcion, archivo,  DATE_FORMAT(CONVERT_TZ(actualizado,"+00:00","-04:00"), "%d/%b/%y - %H:%i:%s") as actualizado, fileSize, upload_by from guias_hrgolf where aplicacion IN (?) ORDER BY aplicacion asc, actualizado desc',
					[resultsFilteredGuides],
					(error, resultsAllGuides) => {
						if (error) throw error
						// console.log('todos: ' + [resultsAllGuides])
						res.render('ajustes/guias-conf', {
							logged: req.user,
							alert: false,
							results: resultsAllGuides,
							resultsFilteredGuides: resultsFilteredGuides,
							error: false,
							message: req.flash('message'),
						})
					}
				)
			}
		})
	} catch (error) {
		console.log(error)
	}
}

// EDITAR DESCRIPCION GUIA
exports.updateGuide = (req, res) => {
	try {
		const { id } = req.params
		const descripcion = req.body.descripcion
		const aplicacion = req.body.aplicacion
		const archivo = req.file.originalname
		const fileData = req.file.buffer.toString('base64')
		const fileSize = req.file.size
		const autor = req.body.autor

		if (archivo.length > 0) {
			db.query('UPDATE guias_hrgolf SET descripcion = ?, archivo = ?, filedata = ?, fileSize = ?, upload_by = ? WHERE id = ?', [
				descripcion,
				archivo,
				fileData,
				fileSize,
				autor,
				id,
			])
		} else {
			db.query('UPDATE guias_hrgolf SET descripcion = ?, upload_by = ? WHERE id = ?', [descripcion, autor, id])
		}
		req.flash('message', 'La guía de' + aplicacion + ' fué actualizada con éxito')
		res.redirect('/ajustes/guias-conf')
	} catch (error) {
		console.log(error)
	}
}

// BORRAR GUIA
exports.deleteGuide = (req, res) => {
	try {
		const { id } = req.params
		db.query('DELETE FROM guias_hrgolf WHERE id = ?', [id])
		req.flash('message', 'Guía eliminada con éxito')
		res.redirect('/ajustes/guias-conf')
	} catch (error) {
		console.log(error)
	}
}

// DESCARGAR GUIA
exports.downloadGuide = (req, res) => {
	try {
		const id = req.params.id
		db.query(
			'SELECT aplicacion, DATE_FORMAT(CONVERT_TZ(actualizado,"+00:00","-04:00"), "%d%b%y") as actualizado, fileData FROM guias_hrgolf WHERE id=?',
			[id],
			(error, data) => {
				if (!data) {
					console.log(error)
				} else {
					let archivo = data[0].aplicacion
					let fecha = data[0].actualizado
					let datos = data[0].fileData
					res.type('application/pdf')
					res.header('Content-Disposition', `attachment; filename="${archivo}-GUIA Act${fecha}.pdf"`)
					res.send(Buffer.from(datos, 'base64'))
				}
			}
		)
	} catch (error) {
		console.log(error.message)
	}
}

// USUARIO VER GUIA
exports.viewGuide = (req, res) => {
	try {
		db.query(
			'select guias_hrgolf.* from guias_hrgolf,(select aplicacion,max(actualizado) as actualizado from guias_hrgolf group by aplicacion) max_aplicacion where guias_hrgolf.aplicacion=max_aplicacion.aplicacion and guias_hrgolf.actualizado=max_aplicacion.actualizado order by aplicacion asc',
			(error, results) => {
				if (!results) {
					console.log(error)
				} else {
					res.render('guias', {
						logged: req.user,
						alert: false,
						results: results,
						error: true,
					})
				}
			}
		)
	} catch (error) {
		console.log(error)
	}
}
