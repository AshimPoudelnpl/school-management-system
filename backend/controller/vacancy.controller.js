import db from "../config/dbconnect.js";

export const addVacancy = async (req, res,next) => {
  try {
    const { position, description, deadline } = req.body;
    if (!position || !description || !deadline) {
      res.status(401).json({
        message: "Vacancy is not published",
      });
    }
    await db.execute(
      "insert into vacancy(position,description,deadline) values (?,?,?)",
      [position, description, deadline]
    );
    res.status(201).json({
      message: "vacancy addded Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getVacancy = async (req, res,next) => {
  try {
    const [resultvacancy] = await db.execute("select * from vacancy");
    console.log(resultvacancy);
    res.status(201).json({
      message: "vacancy Published",
      result: resultvacancy,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteVacancy = async (req, res,next) => {
  try {
    const { id } = req.params;
    const [existing] = await db.execute("select id from vacancy where id=?", [
      id,
    ]);

    if (existing.length === 0) {
      return res.status(400).json({
        message: `vacancy not found with this ${id}`,
      });
    }
    await db.execute("DELETE from vacancy where id =?",[id])
    return res.status(202).json({
        message:"vacancy deleted successfully"
    })
  } catch (error) {
    next(error);
  }
};
