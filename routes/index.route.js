import { Router } from "express";
import servicesRouter from "./services.route.js";
import ratesRouter from "./rates.route.js";

const indexRouter = Router();

const prefix = "/api";

indexRouter.get(prefix, (req, res) => {
    res.send("BIENVENIDO");
});

indexRouter.use(`${prefix}/servicios`,  servicesRouter);
indexRouter.use(`${prefix}/tarifas`,  ratesRouter);





export default indexRouter;