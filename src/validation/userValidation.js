import Joi from 'joi';

exports.userValidate = (req, res, next) => {
    const userValiation = Joi.object({
        name: Joi.string().min(2).required().trim(),
        phone: Joi.number().min(10).required(),
        email: Joi.string().min(4).required().email().trim(),
        password: Joi.string().min(6).max(32).trim(),
        gender: Joi.string().min(4).max(6).trim(),
        birthdate: Joi.date().required(),
        role: Joi.string().valid('admin', 'landlord', 'client').required(),
        profileimage: Joi.string().uri().trim()
    });
    const result = userValiation.validate(req.body);
    // if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    if (result.error) return res.status(400).json({ message: res.__("required") });
    next();
}