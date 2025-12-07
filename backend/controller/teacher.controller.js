import db from "../config/dbconnect.js";
import { removeImage } from "../utils/removeImg.js";

export const addTeacher = async (req, res, next) => {
  try {
    const { name, email, phone, position } = req.body;

    if (!name || !email || !phone || !position) {
      if (req.file) {
        removeImage(req.file.imagePath);
      }
      return res.status(400).json({ message: "All fields are required" });
    }
    const [existingEmail] = await db.execute(
      "select id from teacher where email=?",
      [email]
    );
    if (existingEmail.length > 0) {
      return res.status(409).json({
        message: "Email Already exists.use another email",
      });
    }
    const imagePath = req.file ? `uploads/teachers/${req.file.filename}` : null;
    const [results] = await db.execute(
      "insert into teacher (name,email,phone,position,img) values (?,?,?,?,?)",
      [name, email, phone, position, imagePath]
    );
    res.status(201).json({
      message: "teachers added successfuly",
      image: imagePath,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllteachers = async (req, res, next) => {
  try {
    const [result] = await db.execute("Select * from teacher");
    res.status(200).json({
      message: "All teachers get Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteteacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const [existing] = await db.execute(
      "select id,img from teacher where id=?",
      [id]
    );
    if (existing.length == 0) {
      return res.status(404).json({
        message: `teacher not found with this ${id}`,
      });
    }

    // Delete image if exists
    if (existing[0].img) {
      removeImage(`uploads/teachers/${existing[0].img.split("/").pop()}`);
    }

    await db.execute("delete from teacher where id=?", [id]);
    return res.status(200).json({
      message: `Teachers is deletted Successfully ${id}`,
    });
  } catch (error) {
    next(error);
  }
};
export const updateTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
  
    
    
    if (!req.body) {
      return res.status(400).json({
        status: "Failed",
        message: "Request body is undefined. Ensure multer middleware is configured correctly."
      });
    }
    
    const { name, email, phone, position } = req.body;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    // Check if teacher exists
    const [existing] = await db.execute("SELECT * FROM teacher WHERE id = ?", [
      id,
    ]);

    if (existing.length === 0) {
      return res.status(404).json({
        message: `Teacher not found with id ${id}`,
      });
    }

    const teacher = existing[0];

    // Use previous values if fields not provided
    const updatedName = name || teacher.name;
    const updatedEmail = email || teacher.email;
    const updatedPhone = phone || teacher.phone;
    const updatedPosition = position || teacher.position;

    // Check email duplicate (if changed)
    if (email && email !== teacher.email) {
      const [emailCheck] = await db.execute(
        "SELECT id FROM teacher WHERE email = ? AND id != ?",
        [email, id]
      );

      if (emailCheck.length > 0) {
        return res.status(409).json({
          message: "Email already exists. Use another email.",
        });
      }
    }

    // Handle image update
    let updatedImg = teacher.img;

    if (req.file) {
      updatedImg = `uploads/teachers/${req.file.filename}`;

      // remove old image
      if (teacher.img) {
        const oldImgPath = `uploads/teachers/${teacher.img.split("/").pop()}`;
        removeImage(oldImgPath);
      }
    }

    // ✔ FIXED SQL (added img column)
    await db.execute(
      "UPDATE teacher SET name = ?, email = ?, phone = ?, position = ?, img = ? WHERE id = ?",
      [
        updatedName,
        updatedEmail,
        updatedPhone,
        updatedPosition,
        updatedImg,
        id,
      ]
    );

    return res.status(200).json({
      status: "Success",
      message: "Teacher updated successfully",
    });

  } catch (error) {
    next(error);
  }
};

