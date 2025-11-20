import express from "express";
import { getAllUSers, login, signout } from "../controller/auth.controller.js";
import { islogin } from "../middlewares/isLogin.js";
const authRouter = express.Router();
authRouter.get("/users", islogin, getAllUSers);
authRouter.post("/login", login);
authRouter.post("/signout", signout);

export default authRouter;
