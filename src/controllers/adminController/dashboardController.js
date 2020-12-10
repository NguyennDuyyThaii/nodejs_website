const UserModel = require("./../../models/userModels")
const CategoryModel = require("./../../models/categoryModel")
const ProductModel = require("./../../models/productModels")
const PostModel = require("./../../models/postModels")
const contactModel = require("./../../models/userContactModels")
const SlideModel = require("./../../models/slideshow")
const CommentModel = require("./../../models/commentModels")
const invoiceModel = require("./../../models/invoiceModel")
let getDashboard = async (req,res) => {
    let user = await UserModel.countItem()
    let category = await CategoryModel.countItem()
    let product = await ProductModel.countItem()
    let post = await PostModel.countItem()
    let contact = await contactModel.countItem()
    let slide = await SlideModel.countItem()
    let comment = await CommentModel.countItem()
    let invoices = await invoiceModel.countItem()
    return res.render('admin/dashboard/dashboard', {
        success: req.flash("success"),
        user: user,
        category: category,
        title: "Quản lý thống kê",
        product: product,
        post: post,
        contact: contact,
        slide: slide,
        comment: comment,
        invoices: invoices
    })
}
module.exports = {
    getDashboard: getDashboard
}