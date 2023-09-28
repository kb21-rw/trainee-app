import * as yup from "yup"

export const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
})
export const updateProfileSchema = yup.object().shape({
    name: yup.string().min(3),
    email: yup.string().email(),
    password: yup.string().min(3)
})