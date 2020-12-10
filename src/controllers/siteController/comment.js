const { validationResult } = require("express-validator/check")
const { transComment } = require("./../../../lang/vi")
const CommentModel = require("./../../models/commentModels")
let postComment = async (req, res) => {
    let id = req.params.id
    let errorArr = []
    let validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped())
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        req.flash("errors", errorArr)
        return res.redirect(`/productDetail/${id}`)
    }
    try {
        let item = {
            name: req.body.name,
            email: req.body.email,
            content: req.body.content,
            product_id: id.match(/^[0-9a-fA-F]{24}$/)
        }
        await CommentModel.createNew(item)
        req.flash("success", transComment.createSuccess)
        return res.redirect(`/productDetail/${id}`)
    } catch (error) {
        errorArr.push(error)
        req.flash("errors", errorArr)
        return res.redirect(`/productDetail/${id}`)
    }
}

module.exports = {
    postComment: postComment
}