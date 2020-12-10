const {check} = require("express-validator/check")
const {transProduct} = require("./../../lang/vi")

let productValidation = [
    check("name", transProduct.name_not_empty).not().isEmpty(),
    check("name", transProduct.name_not_empty).matches(/\S/),
    check("price", transProduct.price_not_empty).not().isEmpty(),
    //check("short_detail", transPost.short_detail_length).isLength({min:20}),
    check("price", transProduct.price_not_empty).matches(/\S/),
    check("detail", transProduct.detail_not_empty).not().isEmpty(),
    //check("detail", transPost.detail_length).isLength({min:100}),
    check("detail", transProduct.detail_not_empty).matches(/\S/),
    check("sale_price", transProduct.sale_price_not_empty).not().isEmpty(),
    //check("short_detail", transPost.short_detail_length).isLength({min:20}),
    check("sale_price", transProduct.sale_price_not_empty).matches(/\S/),
]
module.exports = {
    productValidation: productValidation
}