import db from "../config/dbconnect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const getAllUSers = async (req, res, next) => {
  try {
    const [users] = await db.query("Select * from users");
    res.status(200).json({
      data: users,
      Result: "Suceesful data Fetched",
    });
  } catch (error) {
    next(error);
  }
};
//login Api
export const login = async (req, res, next) => {
  try {
    // 1.get email and passwords from user side
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password required" });
    }

    const [result] = await db.execute("Select * FROM users WHERE email=? ", [
      email,
    ]);
    const user = result[0];
    // 2. users found?
    if (result.length === 0) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // checkt the found user  passwoird
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // jwt token
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: process.env.EXPIRE }
    );

    // //create in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      samesite: "strict",
    });
    // 3.sucess

    res.status(200).json({
      message: "Login Successful",
      user: {
        id: user.id,
        email: user.email,
       
      },
    });
  } catch (error) {
    next(error);
  }
};

//signout
export const signout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Successfully sign out" });
  } catch (error) {
    next(error);
  }
};
