import { Router } from "express";

import { 
    getRates,
    getRate,
    createRate,
    updateRate,
    deleteRate
 } from "../controllers/rates.controller.js";

const ratesRouter = Router();

ratesRouter.get("/", getRates);

ratesRouter.get("/:id",getRate);
 
ratesRouter.post("/", createRate);

ratesRouter.put("/:id", updateRate);

ratesRouter.delete("/:id", deleteRate);


export default ratesRouter;