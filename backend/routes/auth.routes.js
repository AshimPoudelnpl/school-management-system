import express from "express";
import { getAllUSers, login } from "../controller/auth.controller.js";
const authRouter= express.Router();
authRouter.get("/users",getAllUSers);
authRouter.post("/login",login);

export default  authRouter;