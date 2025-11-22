import db from "../config/dbconnect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const getAllUSers = async (req, res) => {
  try {
    const [users] = await db.query("Select * from users");
    res.status(200).json({
      data: users,
      Result: "Suceesful data Fetched",
    });
  } catch (error) {
    console.log(error);
  }
};
//login Api
export const login = async (req, res) => {
  try {
    // 1.get email and passwords from user side
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and passwrd required" });
    }

    const [result] = await db.execute("Select * FROM users WHERE email=? ", [
      email,
    ]);
    const user = result[0];

    // checkt the found user  passwoird
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 2. users found?
    if (result.length === 0) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
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
        token: token,
      },
    });
    console.log(token);
  } catch (error) {
    console.log(error);
  }
};

//signout
export const signout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Successfully sign out" });
  } catch (error) {
    console.log(error);
  }
};
