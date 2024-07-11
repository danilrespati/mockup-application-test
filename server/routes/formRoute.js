const router = require("express").Router();
const { Form, validate } = require("../models/form");
const { User } = require("../models/user");

router.post("/submit", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const form = await Form.findOne({ email: req.body.email });
    if (form) {
      await Form.updateOne({ email: req.body.email }, req.body);
      res.status(200).send({ message: "Form updated" });
    } else {
      await new Form({ ...req.body }).save();
      res.status(201).send({ message: "Form saved" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});
router.post("/delete", async (req, res) => {
  try {
    const form = await Form.findOne({ email: req.body.email });
    if (!form) return res.status(404).send({ message: "Data not found!" });
    const result = await Form.findOneAndDelete({ email: req.body.email });
    res.status(200).send({ data: result, message: "Form deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});
router.post("/get-list", async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).send({ data: forms, message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});
router.post("/get", async (req, res) => {
  try {
    const form = await Form.findOne({ email: req.body.email });
    if (!form) {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(200)
          .send({ data: { email: req.body.email }, message: "Form fetched" });
      }
      return res.status(404).send({ message: "Data not found!" });
    }
    res.status(200).send({ data: form, message: "Form fetched" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
