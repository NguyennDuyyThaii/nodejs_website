const registerValidation = require("./registerValidation")
const userValidation = require("./userValadation")
const categoryValidation = require("./cateValidation")
const contactValidation = require("./contactValidation")
const postValidation = require("./postValidation")
const productValidation = require("./productValidation")
const commentValidation = require("./commentValidation")
const boughtValidation = require("./boughtValidation")
module.exports = {
    registerValidation: registerValidation,
    userValadation: userValidation,
    categoryValidation: categoryValidation,
    contactValidation: contactValidation,
    postValidation: postValidation,
    productValidation: productValidation,
    commentValidation: commentValidation,
    boughtValidation: boughtValidation
}