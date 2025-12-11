import express from "express";
import { islogin } from "../middlewares/isLogin.js";
import {
  addTeacher,
  deleteteacher,
  getAllteachers,
  updateTeacher,
} from "../controller/teacher.controller.js";
import { upload } from "../utils/multerHandler.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const teacherRouter = express.Router();
teacherRouter.post(
  "/add-teacher",
  islogin,
  isAdmin,
  upload.single("image"),
  addTeacher
);
teacherRouter.get("/get-teacher", islogin, getAllteachers);
teacherRouter.delete("/delete-teacher/:id", islogin, isAdmin, deleteteacher);
teacherRouter.patch(
  "/update-teacher/:id",
  upload.single("image"),
  islogin,
  isAdmin,
  updateTeacher
);

export default teacherRouter;
