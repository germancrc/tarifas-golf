const db = require("../database/db");
const fs = require("fs");

//subir guias
exports.uploadGuide = async (req, res) => {
  try {
    const aplicacion = req.body.aplicacion;
    const archivo = req.file.originalname;
    const fileData = req.file.buffer.toString("base64");

    db.query(
      "INSERT INTO guias_hrgolf SET ?",
      { aplicacion: aplicacion, archivo: archivo, fileData: fileData },
      (error, results) => {
        if (error) {
          console.log(error);
        }
        res.redirect("/ajustes/guias-conf");
      }
    );
    // console.log(aplicacion, archivo);
  } catch (error) {
    console.log(error);
  }
};

//MOSTRAR todas guias
exports.getGuides = (req, res) => {
  try {
    db.query(
      'select id, aplicacion, archivo, CONVERT_TZ(actualizado,"+00:00","-04:00") as actualizado from guias_hrgolf ORDER BY aplicacion asc, actualizado desc',
      (error, results) => {
        if (results) {
          res.render("ajustes/guias-conf", {
            user: req.user,
            alert: false,
            results: results,
            error: false,
          });
        } else {
          throw error;
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// MOSTRAR 1 guia
exports.getGuide = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

// EDITAR 1 guia
exports.updateGuide = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

// BORRAR GUIA
exports.deleteGuide = (req, res) => {
  try {
    const { id } = req.params;
    db.query("DELETE FROM guias_hrgolf WHERE id = ?", [id]);
    res.redirect("/ajustes/guias-conf");
  } catch (error) {
    console.log(error);
  }
};

// DESCARGAR GUIA
exports.downloadGuide = (req, res) => {
  try {
    const id = req.params.id;
    db.query(
      "SELECT archivo, fileData FROM guias_hrgolf WHERE id=?",
      [id],
      (error, data) => {
        if (data) {
          const descarga = { data: data[0].fileData };
          res.send(descarga);
          // console.log(descarga);
        } else {
          throw error;
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};
