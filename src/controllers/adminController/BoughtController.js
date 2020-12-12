const invoiceModel = require("./../../models/invoiceModel")
const productModel = require("./../../models/productModels")
let getBought = async (req, res) => {
    let page = parseInt(req.query.page) || 1
    let perpage = 10
    let perRow = page * perpage - perpage

    let productAll = await invoiceModel.find()
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
    let transSuccess, transErrors, trans
    transSuccess = await invoiceModel.countDocuments().where({ status: "Đã hoàn thành" })
    transErrors = await invoiceModel.countDocuments().where({ status: "Hủy đơn" })
    trans = await invoiceModel.countDocuments().where({ status: "Đang chuyển hàng" })
    let invoices = await invoiceModel.find().skip(perRow).limit(perpage)
    invoices = JSON.parse(JSON.stringify(invoices))
    return res.render("admin/bought/bought", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        title: "Quản lý hóa đơn",
        invoices: invoices,
        totalPage: totalPage,
        pageNext: pageNext,
        pagePrev: pagePrev,
        transSuccess: transSuccess,
        transErrors: transErrors,
        trans: trans
    })
}
let getDetailBought = async (req, res) => {
    let id = req.params.id
    let invoices = await invoiceModel.findById({ _id: id })
    invoices = JSON.parse(JSON.stringify(invoices))
    return res.render("admin/bought/bought_detail", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        title: "Quản lý hóa đơn",
        invoices: invoices
    })
}
let getRemoveCart = async (req, res) => {
    let id = req.params.id
    await invoiceModel.findByIdAndRemove({ _id: id })
    req.flash("success", "Xóa hóa đơn thành công")
    return res.redirect('/bought')

}

let getEditInvoices = async (req, res) => {
    let id = req.params.id
    let invoice = await invoiceModel.findById({ _id: id })
    invoice = JSON.parse(JSON.stringify(invoice))
    return res.render('admin/bought/edit_bought', {
        title: "Sửa hóa đơn",
        success: req.flash("success"),
        errors: req.flash("errors"),
        invoice: invoice
    })
}
let postEditInvoices = async (req, res) => {
    let id = req.params.id
    let item = {
        status: req.body.status
    }
    req.flash("success", "Cập nhập thành công!")
    await invoiceModel.updateInvoices(id, item)
    return res.redirect('/bought')

}

let boughtCheck = (req, res) => {
    return new Promise(async (resolve, reject) => {
        let id = req.params.id
        let product = await productModel.listAll()
        product = JSON.parse(JSON.stringify(product))
        let invoiceProduct = await invoiceModel.findById(id)
        invoiceProduct = JSON.parse(JSON.stringify(invoiceProduct))
        invoiceProduct.product_detail.forEach(item2 => {
            product.forEach(async (p) => {
                let qtySeller = p.qtySeller
                if (p._id === item2._id) {
                    let item = {
                        qtySeller: qtySeller + item2.qty
                    }
                    let x = {
                        status: "Nên xóa"
                    }
                    await productModel.updateProduct(p._id, item)
                    await invoiceModel.updateInvoices(id, x)
                }
            })
            
        })
        req.flash("success", "Cập nhập trạng thái sản phẩm thành công!")
        res.redirect('/bought')
    })

}
module.exports = {
    getBought: getBought,
    getDetailBought: getDetailBought,
    getRemoveCart: getRemoveCart,
    getEditInvoices: getEditInvoices,
    postEditInvoices: postEditInvoices,
    boughtCheck: boughtCheck
}