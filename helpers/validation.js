import Joi from "joi";

export const voterRegistrationValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(6).required(),
    matricule: Joi.string().min(10).max(10).required(),
    level: Joi.number().min(200).max(700).required(),
    school: Joi.string().required(),
    department: Joi.string().required(),
    email: Joi.string()
      .min(6)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),

    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

export const voterLoginValidation = (data) => {
  const schema = Joi.object({
    matricule: Joi.string().min(10).max(10).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

export const adminLoginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(0).max(10).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
