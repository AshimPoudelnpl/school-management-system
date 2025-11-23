import express from "express"
import { addVacancy, deleteVacancy, getVacancy } from "../controller/vacancy.controller.js";
import { islogin } from "../middlewares/isLogin.js";
 const vacanyRouter=express.Router()
 vacanyRouter.post("/add-vacancy", islogin, addVacancy);
 vacanyRouter.get("/get-vacancy",  getVacancy);
 vacanyRouter.delete("/delete-vacancy/:id", islogin, deleteVacancy);
 
 export default vacanyRouter;
 