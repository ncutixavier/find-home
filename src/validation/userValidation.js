import Joi from 'joi';

exports.userValidate = (req, res, next) => {
    const userValiation = Joi.object({
        name: Joi.string()
            .required()
            .error(errors => {
                errors.forEach(err => {
                    switch (err.code) {
                        case "any.required":
                            err.message = res.__('name is required')
                            break
                    }
                })
                return errors
            }),
        phone: Joi.string().min(10).required().error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "string.min":
                        err.message = res.__("Phone should be at least 10 digits")
                        break

                    case "any.required":
                        err.message = res.__('Phone should be required')
                        break
                }
            })
            return errors
        }),
        email: Joi.string().required().email().error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "string.email":
                        err.message = res.__("provide valid email")
                        break

                    case "any.required":
                        err.message = res.__('email is required')
                        break
                }
            })
            return errors
        }),
        gender: Joi.string().max(8).required().error(errors => {
            errors.forEach(err => {
                switch (err.code) {

                    case "string.max":
                        err.message = res.__("gender should be not more 8 characters")
                        break

                    case "any.required":
                        err.message = res.__('gender is required')
                        break
                }
            })
            return errors
        }),
        birthdate: Joi.date().required().error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "any.required":
                        err.message = res.__('birthdate is required')
                        break
                }
            })
            return errors
        }),
        role: Joi.string().valid('admin', 'landlord', 'client').required().error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "any.required":
                        err.message = res.__('role is required')
                        break
                    default:
                        err.message = res.__("role should be [landlord, client]")
                }
            })
            return errors
        }),
        profileimage: Joi.string().uri().trim()
    });
    const result = userValiation.validate(req.body);
    if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    next();
}