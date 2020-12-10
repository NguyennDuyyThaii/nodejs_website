const { check } = require("express-validator/check")
const { transPost } = require("./../../lang/vi")

let postsValidation = [
    check("title", transPost.title_not_empty).not().isEmpty(),
    check("title", transPost.title_not_empty).matches(/\S/),
    check("short_detail", transPost.short_detail_not_empty).not().isEmpty(),
    //check("short_detail", transPost.short_detail_length).isLength({min:20}),
    check("short_detail", transPost.short_detail_not_empty).matches(/\S/),
    check("detail", transPost.detail_not_empty).not().isEmpty(),
    //check("detail", transPost.detail_length).isLength({min:100}),
    check("detail", transPost.detail_not_empty).matches(/\S/),
]
module.exports = {
    postsValidation: postsValidation
} 