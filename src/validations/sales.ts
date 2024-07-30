import joi from 'joi'
import { AddSaleType } from '../types/sales'
import response from '../utils/response'

function addSale(data: AddSaleType) {
    const schema = joi.object({
        quantity: joi.number().min(1).required(),
        date: joi.date().required(),
        user: joi.object()
    })

    const { error } = schema.validate(data)
    if (error) return response.error(error.details[0].message, null, 400)
    else return null
}

const salesValidation = { addSale }

export default salesValidation