const mongoose = require("mongoose");
const Joi = require("joi");

const formSchema = new mongoose.Schema({
  position: { type: String, required: true },
  name: { type: String, required: true },
  nik: { type: String, required: true },
  born: { type: String, required: true },
  gender: { type: String, required: true },
  religion: { type: String, required: true },
  bloodType: { type: String, required: true },
  status: { type: String, required: true },
  addressId: { type: String, required: true },
  addressActual: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  education: [
    {
      level: String,
      insitution: String,
      major: String,
      graduatedYear: String,
      score: String,
    },
  ],
  training: [
    {
      title: String,
      certificate: String,
      year: String,
    },
  ],
  workHistory: [
    {
      company: String,
      position: String,
      salary: String,
      year: String,
    },
  ],
  skill: { type: String, required: true },
  anyPlacement: { type: String, required: true },
  expectedSalary: { type: String, required: true },
  signatureInfo: String,
});

const Form = mongoose.model("Form", formSchema);

const validate = (data) => {
  const schema = Joi.object({
    position: Joi.string().label("Posisi yang dilamar"),
    name: Joi.string().label("Nama"),
    nik: Joi.string().label("No. KTP"),
    born: Joi.string().label("Tempat Tanggal Lahir"),
    gender: Joi.string().label("Jenis kelamin"),
    religion: Joi.string().label("agama"),
    bloodType: Joi.string().label("bloodType"),
    status: Joi.string().label("status"),
    addressId: Joi.string().label("addressId"),
    addressActual: Joi.string().label("addressActual"),
    email: Joi.string().label("email"),
    phone: Joi.string().label("phone"),
    emergencyContact: Joi.string().label("emergencyContact"),
    education: Joi.array().items({
      level: Joi.string(),
      insitution: Joi.string(),
      major: Joi.string(),
      graduatedYear: Joi.string(),
      score: Joi.string(),
    }),
    training: Joi.array().items({
      title: Joi.string(),
      certificate: Joi.string(),
      year: Joi.string(),
    }),
    workHistory: Joi.array().items({
      company: Joi.string(),
      position: Joi.string(),
      salary: Joi.string(),
      year: Joi.string(),
    }),
    skill: Joi.string().label("skill"),
    anyPlacement: Joi.string().label("anyPlacement"),
    expectedSalary: Joi.string().label("expectedSalary"),
    signatureInfo: Joi.string().label("signatureInfo"),
  });
  return schema.validate(data);
};

module.exports = { Form, validate };
