import { Voter } from "../models/voter.js";
import {
  voterRegistrationValidation,
  voterLoginValidation,
} from "../helpers/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../helpers/sendEmail.js";

export const registerVoter = async (req, res) => {
  const { fullName, matricule, level, school, department, password, email } =
    req.body;
  //validate request data
  const { error } = voterRegistrationValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if voter already exist
  const matriculeExist = await Voter.findOne({ matricule: matricule });
  if (matriculeExist) return res.status(400).send("Matricule already exist");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const voter = new Voter({
    fullName,
    matricule,
    email,
    level,
    school,
    department,
    password: hashedPassword,
  });

  try {
    await voter.save();
    sendEmail(email, fullName)
      .then((response) => res.send({ message: "user created successfully" }))
      .catch((error) => res.status(500).send(error));
  } catch (error) {
    res.status(400).send(error);
  }
};

export const voterLogin = async (req, res) => {
  const { matricule, password } = req.body;
  //validate request data
  const { error } = voterLoginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    //check if voter exist
    const user = await Voter.findOne({ matricule });
    if (!user) return res.status(400).send("Matricule is not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password");

    //remove password field
    const modifiedUserData = user.toJSON();
    delete modifiedUserData.password;

    const token = jwt.sign({ _id: user._id }, process.env.USER_TOKEN_SECRET);
    res.header("auth-token", token).send({ ...modifiedUserData, token });
  } catch (error) {
    res.status(400).json(error);
  }
};
