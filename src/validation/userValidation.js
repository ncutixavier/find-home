import Joi from 'joi';

exports.userValidate = (req, res, next) => {
    const userValiation = Joi.object({
        name: Joi.string().required().messages({
            "any.required": res.__('name is required'),
            "string.empty": res.__('name not empty')
        }),

        phone: Joi.string().min(10).required().messages({
            "string.min": res.__("Phone should be at least 10 digits"),
            "any.required": res.__('Phone should be required'),
            "string.empty": res.__('Phone is required')
        }),

        email: Joi.string().required().email().messages({
            "string.email": res.__("provide valid email"),
            "any.required": res.__('email is required'),
            "string.empty": res.__('email not empty')
        }),
        gender: Joi.string().max(8).required().messages({
            "string.max": res.__("gender should be not more 8 characters"),
            "any.required": res.__('gender is required'),
            "string.empty": res.__('gender not empty')
        }),

        birthdate: Joi.date().required().messages({
            "any.required": res.__('birthdate is required'),
            "string.empty": res.__('birthdate is required')
        }),
        
        role: Joi.string().valid('admin', 'landlord', 'client').required().messages({
            "any.required": res.__('role is required'),
            "any.only": res.__("role should be [landlord, client]"),
            "string.empty": res.__('role not empty')
        }),
        profileimage: Joi.string().uri().trim()
    });
    const result = userValiation.validate(req.body);
    if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    next();
}

exports.userUpdateValidate = (req, res, next) => {
    const userValiation = Joi.object({
        name: Joi.string().messages({
            "string.empty": res.__('name not empty')
        }),

        phone: Joi.string().min(10).messages({
            "string.min": res.__("Phone should be at least 10 digits"),
            "string.empty": res.__('Phone is required')
        }),

        email: Joi.string().email().messages({
            "string.email": res.__("provide valid email"),
            "string.empty": res.__('email not empty')
        }),
        gender: Joi.string().max(8).messages({
            "string.max": res.__("gender should be not more 8 characters"),
            "string.empty": res.__('gender not empty')
        }),

        birthdate: Joi.date().messages({
            "string.empty": res.__('birthdate is required')
        }),
        
        role: Joi.string().valid('admin', 'landlord', 'client').messages({
            "any.only": res.__("role should be [landlord, client]"),
            "string.empty": res.__('role not empty')
        }),
        profileimage: Joi.string().uri().trim()
    });
    const result = userValiation.validate(req.body);
    if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    next();
}