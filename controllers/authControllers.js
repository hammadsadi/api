import { makeHashPassword } from "../helper/helper.js";
import User from "../models/User.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { contactEmailSend } from "../mails/ContactMail.js";
/**
 * @Desc Create Auth
 * @Method Post
 * @Access Private
 */
export const createAuth = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All Fileds Are Required" });
  }

  // Find User
  const userCheck = await User.findOne({ email: email });

  if (userCheck) {
    return res.status(400).json({ message: "User Already Exist" });
  }

  // Create data
  const user = await User.create({
    name,
    email,
    password: makeHashPassword(password),
  });
  res.status(200).json({ user, message: "User Created Successful" });
});

/**
 * @Desc Login Auth
 * @Method Post
 * @Access Public
 */
export const loginAuth = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "All Fileds Are Required" });
  }

  // Find User
  const userCheck = await User.findOne({ email: email });
  if (!userCheck) {
    return res.status(404).json({ message: "User Not Found" });
  }

  // Check Password
  const checkPass = bcrypt.compareSync(password, userCheck.password);
  if (!checkPass) {
    return res.status(400).json({ message: "Wrong Password" });
  }

  // Create Token
  const token = jwt.sign({ email: userCheck.email }, process.env.SECREET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRE,
  });

  res.cookie("accessToken", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ user: userCheck, message: "Login Successful" });
});

/**
 * @Desc Get Login User
 * @Method Get
 * @Access Private
 */
export const getLogedInUser = (req, res) => {
  res.status(200).json({ user: req.me });
};

/**
 * @Desc Logout User
 * @Method Get
 * @Access Private
 */
export const logoutUser = (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout Successful" });
};

/**
 * @Desc Contact User
 * @Method POST
 * @Access Public
 */
export const contactUser = async (req, res) => {
  const { name, email, msg, subject } = req.body;
  await contactEmailSend({ name, email, msg, subject });
  res.status(200).json({ message: "Mail Send Successful" });
};
