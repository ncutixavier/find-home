import Joi from 'joi';

exports.signInValidate = (req, res, next) => {
    const userValidation = Joi.object({
        email: Joi.string()
            .required()
            .email()
            .error(errors => {
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
        password: Joi.string()
            .required()
            .error(errors => {
                errors.forEach(err => {
                    switch (err.code) {
                        case "any.required":
                            err.message = res.__('password is required')
                            break
                    }
                })
                return errors
            }),
    });
    const result = userValidation.validate(req.body);
    if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    next();
}