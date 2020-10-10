import Joi from 'joi';

exports.signInValidate = (req, res, next) => {
    const userValidation = Joi.object({
        email: Joi.string().required().email().trim(),
        password: Joi.string().required().trim()
    });
    const result = userValidation.validate(req.body);
    // if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    if (result.error) return res.status(400).json({ message: res.__("provide email & pwd") });
    next();
}