const {check} = require("express-validator/check")
const {transComment} = require("./../../lang/vi")

let commentValidation = [
    check("name", transComment.name_not_empty).not().isEmpty(),
    check("name", transComment.name_not_empty).matches(/\S/),
    check("email", transComment.email_not_empty).not().isEmpty(),
    check("email", transComment.email_not_empty).matches(/\S/),
    check("email", transComment.email).isEmail().trim(),
    check("content", transComment.content_not_empty).not().isEmpty(),
    check("content", transComment.content_not_empty).matches(/\S/),
]

module.exports = {
    commentValidation: commentValidation
} 