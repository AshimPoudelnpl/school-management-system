import db from "../config/dbconnect.js";

export const addTeacher = async (req, res) => {
  try {
    const { name, email, phone, position } = req.body;
    console.log(req.body);

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
    console.log(error);
  }
};
export const getAllteachers = async (req, res) => {
  try {
    const [result] = await db.execute("Select * from teacher");
    res.status(400).json({
      message: "All teachers get Successfully",
      data: result,
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
export const deleteteacher = async (req, res) => {
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
    await db.execute("delete from teacher where id=?",[id])
    return res.status(200).json({
        message:`Teachers is deletted Successfully ${id}`
    })
  } catch (error) {
    console.log(error);
  }
};
