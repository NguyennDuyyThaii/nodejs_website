const postModel = require("./../../models/postModels")
const { postService } = require("./../../services/index")
const { transPost, transUploadImage } = require("./../../../lang/vi")
const multer = require("multer")
const uuid = require("uuid/v4")
const fs = require("fs-extra")
const { validationResult } = require("express-validator/check")
let getPost = async (req, res) => {
    let page = parseInt(req.query.page) || 1
    let perpage = 4
    let perRow = page * perpage - perpage

    let productAll = await postModel.find()
    let totalPage = Math.ceil(productAll.length / perpage)

    let pagePrev, pageNext
    // pagePrev
    if (page - 1 <= 0) {
        pagePrev = 1
    } else {
        pageNext = page - 1
    }
    // pageNext
    if (page + 1 >= totalPage) {
        pageNext = totalPage
    } else {
        pageNext = page + 1
    }
    let postList = await postModel.find().skip(perRow).limit(perpage)
    post = JSON.parse(JSON.stringify(postList))
    return res.render("admin/post/post", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        title: "Quản lý bài viết",
        post: post,
        totalPage: totalPage,
        pageNext: pageNext,
        pagePrev: pagePrev
    })
}
let getRemovePost = async (req, res) => {
    let id = req.params.id
    let post = await postModel.findPostById({ _id: id })
    item = JSON.parse(JSON.stringify(post))
    await postModel.removeById({ _id: id })
    fs.remove(`./src/public/${item.avatar}`)
    req.flash("success", transPost.deleteSuccess)
    return res.redirect("/post")
}
let getAddPost = (req, res) => {
    return res.render("admin/post/add_post", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        title: "Thêm bài viết",
    })

}

let postAddPost = async (req, res) => {
    if (req.uploadError) {
        console.log(req.uploadError)
    }
    let errorArr = []
    let validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped())
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        req.flash("errors", errorArr)
        return res.redirect("/post/add")
    }
    try {
        let path = "images/post/" + req.file.filename
        await postService.addPost(req.body.title, path, req.body.short_detail, req.body.detail)
        req.flash("success", transPost.createSuccess)
        return res.redirect("/post")
    } catch (error) {
        req.flash("errors", "Ảnh không được để trống hoặc chứa các file khác định dạng!")
        return res.redirect("/post/add")
    }
}
let getEditPost = async (req, res) => {
    let id = req.params.id
    let post = await postModel.findPostById({ _id: id })
    item = JSON.parse(JSON.stringify(post))
    return res.render("admin/post/edit_post", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        title: "Sửa bài viết",
        item: item
    })
}
let postEditPost = async (req, res) => {
    if (req.uploadError) {
        console.log(req.uploadError)
    }
    let id = req.params.id
    let errorArr = []
    let validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped())
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        req.flash("errors", errorArr)
        return res.redirect(`/post/edit/${id}`)
    }

    try {

        let post = await postModel.findPostById({ _id: id })
        item = JSON.parse(JSON.stringify(post))
        let path = "images/post/" + req.file.filename
        fs.remove(`./src/public/${item.avatar}`)
        await postService.editPost(id, req.body.title, path, req.body.short_detail, req.body.detail)
        req.flash("success", transPost.editSuccess)
        return res.redirect("/post")
    } catch (error) {
        req.flash("errors", "Ảnh không được để trống hoặc chứa các file khác định dạng!")
        return res.redirect(`/post/edit/${id}`)
    }
}

module.exports = {
    getPost: getPost,
    getAddPost: getAddPost,
    getRemovePost: getRemovePost,
    postAddPost: postAddPost,
    getEditPost: getEditPost,
    postEditPost: postEditPost
}