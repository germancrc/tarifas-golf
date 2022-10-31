import { Router } from "express";

import { 
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
 } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/", getUsers);

usersRouter.get("/:id",getUser);
 
usersRouter.post("/", createUser);

usersRouter.put("/:id", updateUser);

usersRouter.delete("/:id", deleteUser);


export default usersRouter;