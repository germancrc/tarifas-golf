import * as ratesService from "../services/rates.service.js"


export const getRates = (req, res) => {
    ratesService
    .getRates()
    .then((result) => {
        res.status(200).json({
            message: "Tarifas recuperadas satisfactoriamente",
            data: result[0]
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });
};

export const getRate = (req, res) => {
    const {id} = req.params;
    ratesService
    .getRate(id)
    .then((result) => {
        res.status(200).json({
            message: "Tarifa recuperada satisfactoriamente",
            data: result[0]
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });
};

export const createRate = (req, res) => {
    const tarifa = req.body;
    ratesService
    .createRate(tarifa)
    .then(() => {
        res.status(200).json({
            message: "Tarifa creada satisfactoriamente",
            data: tarifa,
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });
};

export const updateRate = (req, res) => {
    const tarifa = req.body;
    const {id} = req.params;
    ratesService
    .updateRate(id, tarifa)
    .then(() => {
        res.status(200).json({
            message: "Tarifa actualizada satisfactoriamente",
            data: tarifa,
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });
};


export const deleteRate = (req, res) => {
    const {id} = req.params;
    ratesService
    .deleteRate(id)
    .then(() => {
        res.status(200).json({
            message: "Tarifa Borrada satisfactoriamente"
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });
};