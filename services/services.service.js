import db from "../config/db.js"

export const getServices = () =>{
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM servicios';
        db.execute(query)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
}

export const getService = (id) =>{
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM servicios WHERE id = ?';
        db.execute(query, [id])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
}

export const createService = (servicio) =>{
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO servicios (nombre, precio, descripcion) VALUES (?, ?, ?)';

        const { nombre, precio, descripcion} = servicio;

        db.execute(query, [nombre, precio, descripcion])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
}

export const updateService = (id, servicio) =>{
    return new Promise((resolve, reject) => {
        const query = 'UPDATE servicios SET nombre = ?, precio = ?, descripcion = ? WHERE id = ?';

        const { nombre, precio, descripcion} = servicio;

        db.execute(query, [nombre, precio, descripcion, id])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
}

export const deleteService = (id) =>{
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM servicios WHERE id = ?';

        db.execute(query, [id])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
}