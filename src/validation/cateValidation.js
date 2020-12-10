const { check } = require("express-validator/check")
const { transCategory } = require("./../../lang/vi")

let cateValidation = [
    check("cate_name", transCategory.cate_not_empty).not().isEmpty()
]
module.exports = {
    cateValidation: cateValidation
}