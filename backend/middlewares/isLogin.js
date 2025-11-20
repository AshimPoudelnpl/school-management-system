export const islogin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      res.status(401).json({
        message: "Hey hacker we have to login first",
      });
    }

    next();
  } catch (error) {}
};
