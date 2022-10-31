import db from "../config/db.js"

export const getRates = () =>{
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM tarifas';
        db.execute(query)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
}

export const getRate = (id) =>{
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM tarifas WHERE id = ?';
        db.execute(query, [id])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
}

export const createRate = (tarifa) =>{
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO tarifas (nombre, precio) VALUES (?, ?)';

        const { nombre, precio} = tarifa;

        db.execute(query, [nombre, precio])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
}

export const updateRate = (id, tarifa) =>{
    return new Promise((resolve, reject) => {
        const query = 'UPDATE tarifas SET nombre = ?, precio = ? WHERE id = ?';

        const { nombre, precio} = tarifa;

        db.execute(query, [nombre, precio, id])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
}

export const deleteRate = (id) =>{
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM tarifas WHERE id = ?';

        db.execute(query, [id])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
}