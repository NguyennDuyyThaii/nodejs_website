const CategoryModel = require("./../../models/categoryModel")
const { validationResult } = require("express-validator/check")
const { categoryService } = require("./../../services/index")
const { transCategory } = require("./../../../lang/vi")
let getCategory = async (req, res) => {
    let category = await CategoryModel.listAll()
    cate = JSON.parse(JSON.stringify(category))
    return res.render("admin/category/category", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        cate: cate,
        title: "Quản lý danh mục"
    })
}

let getAddCategory = (req, res) => {
    return res.render("admin/category/add_category", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        title: "Thêm danh mục"
    })
}

let postAddCategory = async (req, res) => {
    let errorArr = []
    let validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped())
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        req.flash("errors", errorArr)
        return res.redirect("/category/add")
    }

    try {
        await categoryService.addCategory(req.body.cate_name)
        req.flash("success", transCategory.createSuccess)
        return res.redirect("/category")
    } catch (error) {
        errorArr.push(error)
        req.flash("errors", errorArr)
        return res.redirect("/category/add")
    }

}

let getRemoveCategory = async (req, res) => {
    let id = req.params.id
    await CategoryModel.removeById({ _id: id })
    req.flash("success", transCategory.deleteSuccess)
    return res.redirect("/category")
}

let getEditCategory = async (req, res) => {
    let id = req.params.id
    let cate = await CategoryModel.findItemById({ _id: id })
    cate = JSON.parse(JSON.stringify(cate))
    return res.render("admin/category/edit_category", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        title: "Sửa danh mục",
        cate: cate
    })
}
let postEditCategory = async (req,res) => {
    let id = req.params.id
    let errorArr = []
    let validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped())
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        req.flash("errors", errorArr)
        return res.redirect(`/category/edit/${id}`)
    }

    try {
        await categoryService.editCategory(id,req.body.cate_name)
        req.flash("success", transCategory.editSuccess)
        return res.redirect("/category")
    } catch (error) {
        errorArr.push(error)
        req.flash("errors", errorArr)
        return res.redirect(`/category/edit/${id}`)
    }
}

module.exports = {
    getCategory: getCategory,
    getAddCategory: getAddCategory,
    postAddCategory: postAddCategory,
    getRemoveCategory: getRemoveCategory,
    getEditCategory: getEditCategory,
    postEditCategory: postEditCategory
}