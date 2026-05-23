const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false, // Devuelve todos los errores y no solo el primero
            stripUnknown: true // Elimina un atributo que le es desconocido por no coincidir con el schema
        });

        if (error) {
            return res.status(400).json({
                message: 'Validation error',
                errors: error.details.map(detail => ({
                    field: detail.path[0],
                    message: detail.message
                }))
            });
        }
        req.body = value;
        next();
    };
};

export default validateRequest;