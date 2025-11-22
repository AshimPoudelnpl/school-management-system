
import jwt from "jsonwebtoken"
export const islogin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({
        message: "Hey hacker we have to login first",
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user=decoded;
    next();

  } catch (error) {
    console.log(error)
  }
};
