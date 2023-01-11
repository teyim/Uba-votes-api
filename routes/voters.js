import express from "express";
import { Voter } from "../models/voter.js";
import {
  voterRegistrationValidation,
  voterLoginValidation,
} from "../helpers/validation.js";
import { verifyAdminToken } from "../middlewares/verifyToken.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

//regiter voter
router.post("/register", verifyAdminToken, async (req, res) => {
  const { fullName, matricule, email, campaigns, password } = req.body;
  //validate request data
  const { error } = voterRegistrationValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if voter already exist
  const matriculeExist = await Voter.findOne({ matricule: matricule });
  if (matriculeExist) return res.status(400).send("Matruicule already exist");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const voter = new Voter({
    fullName,
    matricule,
    email,
    campaigns,
    password: hashedPassword,
  });

  try {
    const savedVoter = await voter.save();
    res.send(savedVoter);
  } catch (error) {
    res.status(400).send(error);
  }
});

//get specific voter
router.post("/login", async (req, res) => {
  const { matricule, password } = req.body;
  //validate request data
  const { error } = voterLoginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    //check if voter already exist
    const user = await Voter.findOne({ matricule: matricule });
    if (!user) return res.status(400).send("Matricule is not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password");

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({ user, token });
  } catch (error) {
    res.json({ message: error });
  }
});

//delete specifc voter
router.delete("/:voterId", verifyAdminToken, async (req, res) => {
  const { voterId } = req.params;
  try {
    const voter = await Voter.remove({ _id: voterId });
    res.json(voter);
  } catch (error) {
    res.json({ message: error });
  }
});

//update Voter Info
router.patch("/:voterId", verifyAdminToken, async (req, res) => {
  const { voterId } = req.params;
  const { fullName, matricule, campaigns } = req.body;
  try {
    const updatedVoter = await Voter.updateOne(
      { _id: voterId },
      {
        $set: {
          fullName,
          matricule,
          campaigns,
        },
      }
    );
    res.json(updatedVoter);
  } catch (error) {
    res.json({ message: error });
  }
});

export default router;
