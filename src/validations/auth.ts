import joi from 'joi'
import { LoginType, RegisterType } from '../types/auth'
import response from '../utils/response'

function register(data: RegisterType) {
    const schema = joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        confirmPassword: joi.string().valid(joi.ref('password')).required(),
        roleRequest: joi.string().required()
    })

    const { error } = schema.validate(data)
    if (error) return response.error(error.details[0].message, null, 400)
    else return null
}

function login(data: LoginType) {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        remember: joi.boolean()
    })

    const { error } = schema.validate(data)
    if (error) return response.error(error.details[0].message, null, 400)
    else return null
}

const authValidation = { register, login }

export default authValidation