
import Joi from 'joi'

const schemaAddProducto = Joi.object(
    {
        id: Joi.string()
            .required(),
        cantidad: Joi.number()
            .integer()
            .positive()
            .required()
    }
)

const schemaDelProducto = Joi.object(
    {
        id: Joi.string()
            .required()
    }
)

export {schemaAddProducto, schemaDelProducto };