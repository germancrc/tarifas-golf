import * as usersService from "../services/users.service.js"


export const getUsers = (req, res) => {
    usersService
    .getUsers()
    .then((result) => {
        res.status(200).json({
            message: "Usuarios recuperadas satisfactoriamente",
            data: result[0]
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });
};

export const getUser = (req, res) => {
    const {id} = req.params;
    usersService
    .getUser(id)
    .then((result) => {
        res.status(200).json({
            message: "Usuario recuperado satisfactoriamente",
            data: result[0]
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });
};

export const createUser = (req, res) => {
    const usuario = req.body;
    usersService
    .createUser(usuario)
    .then(() => {
        res.status(200).json({
            message: "Usuario creada satisfactoriamente",
            data: usuario,
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });
};

export const updateUser = (req, res) => {
    const usuario = req.body;
    const {id} = req.params;
    usersService
    .updateUser(id, usuario)
    .then(() => {
        res.status(200).json({
            message: "Usuario actualizado satisfactoriamente",
            data: usuario,
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });
};


export const deleteUser = (req, res) => {
    const {id} = req.params;
    usersService
    .deleteUser(id)
    .then(() => {
        res.status(200).json({
            message: "Usuario Borrado satisfactoriamente"
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });
};