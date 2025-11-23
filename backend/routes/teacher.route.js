import express from "express";
import { islogin } from "../middlewares/isLogin.js";
import {
  addTeacher,
  deleteteacher,
  getAllteachers,
  updateTeacher,
} from "../controller/teacher.controller.js";

const teacherRouter = express.Router();
teacherRouter.post("/add-teacher", islogin, addTeacher);
teacherRouter.get("/get-teacher", islogin, getAllteachers);
teacherRouter.delete("/delete-teacher/:id", islogin, deleteteacher);
teacherRouter.patch("/update-teacher/:id", islogin, updateTeacher);

export default teacherRouter;
