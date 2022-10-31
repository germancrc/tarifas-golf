import { Router } from "express";
import servicesRouter from "./services.route.js";
import ratesRouter from "./rates.route.js";
import usersRouter from "./users.router.js";

const indexRouter = Router();

const prefix = "/api";

indexRouter.get(prefix, (req, res) => {
    res.send("BIENVENIDO");
});

indexRouter.use(`${prefix}/servicios`,  servicesRouter);
indexRouter.use(`${prefix}/tarifas`,  ratesRouter);
indexRouter.use(`${prefix}/usuarios`,  usersRouter);





export default indexRouter;