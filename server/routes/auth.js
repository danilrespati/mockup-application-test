const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "invalid Email or Password" });

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/validate", async (req, res) => {
  const token = req.body["token"];
  if (!token) {
    res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const email = jwt.verify(token, process.env.JWT_PRIVATEKEY).email;
    res.status(200).send({
      data: { email },
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Unauthorized" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
