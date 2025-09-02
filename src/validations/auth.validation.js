const {name, email, password, phone} = require("./shared.validation");
const {JOI} = require("../package");

const registerSchema = JOI.object({
    name: name,
    email: email,
    password:password,
    phone: phone
})

const loginSchema = JOI.object({
    email: email,
    password: password
})

module.exports = {
    registerSchema,
    loginSchema
}