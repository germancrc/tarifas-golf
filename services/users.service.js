import db from "../config/db.js"

export const getUsers = () =>{
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM usuarios';
        db.execute(query)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
}

export const getUser = (id) =>{
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM usuarios WHERE id = ?';
        db.execute(query, [id])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
}

export const createUser = (usuario) =>{
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO usuarios (nombre, username, password, rol) VALUES (?, ?, ?, ?)';

        const {nombre, username, password, rol} = usuario;

        db.execute(query, [nombre, username, password, rol])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
}

export const updateUser = (id, usuario) =>{
    return new Promise((resolve, reject) => {
        const query = 'UPDATE usuarios SET nombre = ?, username = ? , password = ? , rol = ? WHERE id = ?';

        const { nombre, username, password, rol} = usuario;

        db.execute(query, [nombre, username, password, rol, id])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
}

export const deleteUsuario = (id) =>{
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM usuarios WHERE id = ?';

        db.execute(query, [id])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
}