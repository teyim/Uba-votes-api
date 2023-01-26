import { Admin } from "../models/admin.js";
import { adminLoginValidation } from "../helpers/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  //validate request data
  const { error } = adminLoginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if admin already exist
  const adminExist = await Admin.findOne({ username });
  if (adminExist) return res.status(400).send("Admin already exist");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = new Admin({
    username,
    password: hashedPassword,
  });

  try {
    const savedAdmin = await admin.save();
    res.send(savedAdmin);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  //validate request data
  const { error } = adminLoginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    //check if admin exist
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).send("Username not found");

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(400).send("Invalid password");

    const token = jwt.sign({ username }, process.env.ADMIN_TOKEN_SECRET);
    res.header("auth-token", token).send({ admin, token });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
