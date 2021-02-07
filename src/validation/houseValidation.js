import Joi from 'joi';

exports.houseValidate = (req, res, next) => {
    const houseValidation = Joi.object({
        image: Joi.string().required().messages({
            "any.required": res.__('image is required'),
            "string.empty": res.__('image not empty')
        }),
        
        location: Joi.string().required().messages({
            "any.required": res.__('location is required'),
            "string.empty": res.__('location not empty')
        }),

        bedrooms: Joi.number().min(1).required().messages({
            "any.required": res.__('bedrooms should be required'),
            "number.empty": res.__('bedrooms should not be empty'),
            "number.min": res.__('bedrooms should minimun equal to 1'),
            "any.only": res.__('bedrooms should be number number')
        }),

        price: Joi.number().min(5000).required().messages({
            "any.required": res.__('price should be required'),
            "number.empty": res.__('price should not be empty'),
            "number.min": res.__('price should minimun equal to 5000'),
            "any.only": res.__('price should be number number')
        }),

        bathrooms: Joi.number().min(1).required().messages({
            "any.required": res.__('bathrooms should be required'),
            "number.empty": res.__('bathrooms should not be empty'),
            "number.min": res.__('bathrooms should minimun equal to 1'),
            "any.only": res.__('bathrooms should be number')
        }),

        status: Joi.string().valid('available', 'not available').required().messages({
            "any.required": res.__('status is required'),
            "any.only": res.__("status should be ['available', 'not available']"),
            "string.empty": res.__('status not empty')
        }),
    });
    const result = houseValidation.validate(req.body);
    if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    next();
}

