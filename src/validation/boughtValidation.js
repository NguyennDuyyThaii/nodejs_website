const { check } = require("express-validator/check")
const { transContact } = require("./../../lang/vi")

let boughtValidation = [
    check("name", transContact.name_not_empty).not().isEmpty(),
    check("name", transContact.name_not_empty).matches(/\S/),
    check("email", transContact.email_not_empty).not().isEmpty(),
    check("email", transContact.email_incorect).isEmail().trim(),
    check("email", transContact.email_not_empty).matches(/\S/),
    check("phone", transContact.phone_not_empty).not().isEmpty(),
    check("phone", transContact.phone_not_empty).matches(/\S/),
    check("phone", transContact.phone_incorect)
        .isLength({ min: 10 })
        .matches(/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/),
    check("address", transContact.address_not_empty).not().isEmpty(),
    check("address", transContact.address_not_empty).matches(/\S/),
]
module.exports = {
    boughtValidation: boughtValidation
} 