import Joi from 'joi';

exports.signinValidate = (req, res, next) => {
    const userValiation = Joi.object({
        email: Joi.string().required().email().trim(),
        password: Joi.string().required().trim()
    });
    const result = userValiation.validate(req.body);
    // if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    if (result.error) return res.status(400).json({ message: res.__("provide email & pwd") });
    next();
}