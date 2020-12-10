const CommentModel = require("./../../models/commentModels")
const ProductModel = require("./../../models/productModels")
let getComment = async (req,res) => {
    let comment = await CommentModel.listAll()
    comment = JSON.parse(JSON.stringify(comment))
    let product = await ProductModel.listAll()
    product = JSON.parse(JSON.stringify(product))
    return res.render('admin/comment/comment', {
        success: req.flash("success"),
        comment: comment,
        title: "Quản lý bình luận người dùng",
        product: product
    })
}
let getRemoveCommnet = async (req,res) => {
    let id = req.params.id
    await CommentModel.removeById({_id: id})
    req.flash("success", "Xóa bình luận thành công!")
    return res.redirect('/comment')
}
module.exports = {
    getComment: getComment,
    getRemoveCommnet: getRemoveCommnet
}
