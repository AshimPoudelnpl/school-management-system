import db from "../config/dbconnect.js";

export const addTeacher = async (req, res, next) => {
  try {
    const { name, email, phone, position } = req.body;

    if (!name || !email || !phone || !position) {
      return res.status(400).json({ message: "All fiels are required" });
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
    const [results] = await db.execute(
      "insert into teacher (name,email,phone,position) values (?,?,?,?)",
      [name, email, phone, position]
    );
    res.status(400).json({
      message: "teachers added successfuly",
      data: results.insertId,
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
    console.log(result);
  } catch (error) {
    next(error);
  }
};
export const deleteteacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const [existing] = await db.execute("select id from teacher where id=?", [
      id,
    ]);
    if (existing.length == 0) {
      return res.status(404).json({
        message: `teacher not found with this ${id}`,
      });
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
  const { id } = req.params;

  try {
    const { name, email, phone, position } = req.body;
    console.log(req.body);
    // chack if user is exists
    const [teacher] = await db.execute("select * from teacher where id=?", [
      id,
    ]);

    if (teacher.length === 0) {
      return res.status(404).json({
        message: "Teacher is not found",
      });
    }
    const [existEmail] = await db.execute("select * from teacher where id=?", [
      id,
    ]);

    if (existEmail.length > 0) {
      return res.status(404).json({
        message: "Emalil Already Exists",
      });
    }
    const oldteacher = teacher[0];
    await db.execute(
      "update teacher set name=?,email=?,phone=?,position=? where id=?",
      [
        name ?? oldteacher.name,
        email ?? oldteacher.email,
        phone ?? oldteacher.phone,
        position ?? oldteacher.position,
        id,
      ]
    );
    res.status(200).json({ message: "teacher updated successsfully" });
  } catch (error) {
    next(error);
  }
};
