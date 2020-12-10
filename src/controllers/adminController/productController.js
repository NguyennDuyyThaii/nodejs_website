const ProductModel = require("./../../models/productModels")
const CategoryModel = require("./../../models/categoryModel")
const { transUploadImage, transProduct } = require("./../../../lang/vi")
const { productService } = require("./../../services/index")
const { validationResult } = require("express-validator/check")
const fs = require("fs-extra")
let getProduct = async (req, res) => {
    let page = parseInt(req.query.page) || 1
    let perpage = 10
    let perRow = page * perpage - perpage

    let productAll = await ProductModel.find()
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
    const listProduct = await ProductModel.find().skip(perRow).limit(perpage).populate("categories")
    product = JSON.parse(JSON.stringify(listProduct))

    return res.render("admin/product/product", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        title: "Quản lý sản phẩm",
        product: product,
        totalPage: totalPage,
        pageNext: pageNext,
        pagePrev: pagePrev
    })
}
let getRemoveProduct = async (req, res) => {
    let id = req.params.id
    let product = await ProductModel.findProductById({ _id: id })
    item = JSON.parse(JSON.stringify(product))
    await ProductModel.removeById({ _id: id })
    fs.remove(`./src/public/${item.avatar}`)
    req.flash("success", transProduct.deleteSuccess)
    return res.redirect("/product")
}
let getAddProduct = async (req, res) => {
    let cate = await CategoryModel.listAll()
    cate = JSON.parse(JSON.stringify(cate))
    return res.render("admin/product/add_product", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        title: "Thêm sản phẩm bán hàng",
        cate: cate
    })
}

let postAddProduct = async (req, res) => {
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
        return res.redirect("/product/add")
    }
    try {
        let path = "images/product/avatar/" + req.file.filename
        await productService.addProduct(req.body.name, req.body.price, path, req.body.sale_price, (req.body.cate_id).match(/^[0-9a-fA-F]{24}$/), req.body.detail)
        req.flash("success", transProduct.createSuccess)
        return res.redirect("/product")
    } catch (error) {
        req.flash("errors", "Ảnh không được để trống hoặc chứa các file khác định dạng!")
        return res.redirect("/product/add")
    }
}
let getEditProduct = async (req, res) => {
    let id = req.params.id
    let cate = await CategoryModel.listAll()
    cate = JSON.parse(JSON.stringify(cate))
    let product = await ProductModel.findProductById({ _id: id })
    item = JSON.parse(JSON.stringify(product))
    return res.render("admin/product/edit_product", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        title: "Sửa sản phẩm",
        item: item,
        cate: cate
    })
}
let postEditProduct = async (req, res) => {
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
        return res.redirect(`/product/edit/${id}`)
    }
    try {
      
        let product = await ProductModel.findProductById({ _id: id })
        item = JSON.parse(JSON.stringify(product)) 
        let path = "images/product/avatar/" + req.file.filename
        fs.remove(`./src/public/${item.avatar}`)
        await productService.editProduct(id, req.body.name, req.body.price, path, req.body.sale_price, (req.body.cate_id).match(/^[0-9a-fA-F]{24}$/), req.body.detail)
        req.flash("success", transProduct.editSuccess)
        return res.redirect("/product")
    } catch (error) {
        req.flash("errors", "Ảnh không được để trống hoặc chứa các file khác định dạng!")
        return res.redirect(`/product/edit/${id}`)
    }

}

let getGalleryProduct = async (req, res) => {
    let id = req.params.id
    let product = await ProductModel.findProductById({ _id: id })
    product = JSON.parse(JSON.stringify(product))
    return res.render('admin/product/gallery', {
        title: "Upload Gallery ảnh sản phẩm",
        success: req.flash("success"),
        errors: req.flash("errors"),
        product: product
    })
}
let postGalleryProduct = async (req, res) => {
    if (req.uploadErrors) {
        console.log(req.uploadErrors)
    }
    let id = req.params.id
   
    let path = req.files.map(item => {
        return 'images/product/imagess/' + item.filename
    })
    let item = {
        images: path
    }
    await ProductModel.updateProduct(id, item)
    req.flash("success", "Thêm ảnh thành công")
    return res.redirect('/product')
}
module.exports = {
    getProduct: getProduct,
    getRemoveProduct: getRemoveProduct,
    getAddProduct: getAddProduct,
    postAddProduct: postAddProduct,
    getEditProduct: getEditProduct,
    postEditProduct: postEditProduct,
    getGalleryProduct: getGalleryProduct,
    postGalleryProduct: postGalleryProduct
}