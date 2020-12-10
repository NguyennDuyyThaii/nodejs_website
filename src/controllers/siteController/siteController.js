const CategoryModel = require("./../../models/categoryModel")
const SlideShowModel = require("./../../models/slideshow")
const ProductModel = require("./../../models/productModels")
const PostModel = require("./../../models/postModels")
const CommentModel = require("./../../models/commentModels")
const { validationResult } = require("express-validator/check")
const invoiceModel = require("./../../models/invoiceModel")
const _ = require("lodash")


// Giao dien
let getSite = (req, res) => {
  // paginatio
  return new Promise(async (resolve, reject) => {
    let page = parseInt(req.query.page) || 1
    let perpage = 8
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
    // category
    let cate = await CategoryModel.listAll()
    cate = JSON.parse(JSON.stringify(cate))
    // product
    let product = await ProductModel.find().sort({ _id: -1 }).skip(perRow).limit(perpage).populate("categories")
    product = JSON.parse(JSON.stringify(product))
    // saleer
    let productSuccess = await ProductModel.find({
      $where: function () {
        return this.qtySeller > 1
      }
    }).skip(perRow).limit(perpage).populate("categories");
    productSuccess = JSON.parse(JSON.stringify(productSuccess))
    //let totalSeller = Math.ceil(productSuccess.length / perpage)

    let invoiceProduct = await invoiceModel.listAll()
    invoiceProduct = JSON.parse(JSON.stringify(invoiceProduct))

    // invoiceProduct.forEach(item => {
    //   item.product_detail.forEach(item2 => {
    //     product.forEach(async (p) => {
    //       let qtySeller = p.qtySeller
    //       if (p._id === item2._id) {
    //         let item = {
    //           qtySeller: qtySeller + item2.qty
    //         }
    //         await ProductModel.updateProduct(p._id, item)
    //       }
    //     })
    //   })
    // })
    // slideshow
    let slide = await SlideShowModel.listAll()
    slide = JSON.parse(JSON.stringify(slide))
    // render

    return res.render("site/index", {
      cate: cate,
      product: product,
      slide: slide,
      title: "Trang chủ",
      cart: req.session.cart,
      totalPage: totalPage,
      pageNext: pageNext,
      pagePrev: pagePrev,
      productSuccess: productSuccess,

    })
  })

}
// Sản phẩm theo danh mục
let getProductCategory = async (req, res) => {
  // category
  let cate = await CategoryModel.listAll()
  cate = JSON.parse(JSON.stringify(cate))
  // product
  let category = req.query.category
  let product = await ProductModel.find().populate("categories").where({ cate_id: category }).exec()
  product = JSON.parse(JSON.stringify(product))
  // slideshow
  let slide = await SlideShowModel.listAll()
  slide = JSON.parse(JSON.stringify(slide))
  // render
  return res.render("site/proCate", {
    cate: cate,
    product: product,
    slide: slide,
    title: "Sản phẩm theo danh mục",
    cart: req.session.cart
  })
}
// HIển thị bài viết
let getPost = async (req, res) => {
  // category
  let cate = await CategoryModel.listAll()
  cate = JSON.parse(JSON.stringify(cate))
  // product
  let product = await ProductModel.listAll()
  product = JSON.parse(JSON.stringify(product))
  // slideshow
  let slide = await SlideShowModel.listAll()
  slide = JSON.parse(JSON.stringify(slide))
  // post
  let page = parseInt(req.query.page) || 1
  let perpage = 4
  let perRow = page * perpage - perpage

  let productAll = await PostModel.find()
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
  let postList = await PostModel.find().skip(perRow).limit(perpage)
  post = JSON.parse(JSON.stringify(postList))

  return res.render("site/post", {
    cate: cate,
    product: product,
    slide: slide,
    post: post,
    title: "Bài viết",
    cart: req.session.cart,
    totalPage: totalPage,
    pagePrev: pagePrev,
    pageNext: pageNext
  })
}
// Bài viết chi tiết
let getPostDetail = async (req, res) => {
  // category
  let cate = await CategoryModel.listAll()
  cate = JSON.parse(JSON.stringify(cate))
  // product
  let product = await ProductModel.listAll()
  product = JSON.parse(JSON.stringify(product))
  // slideshow
  let slide = await SlideShowModel.listAll()
  slide = JSON.parse(JSON.stringify(slide))
  // post
  let id = req.params.id
  let postItem = await PostModel.findPostById({ _id: id })
  postItem = JSON.parse(JSON.stringify(postItem))

  let page = parseInt(req.query.page) || 1
  let perpage = 4
  let perRow = page * perpage - perpage

  let productAll = await PostModel.find()
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
  let postList = await PostModel.find().skip(perRow).limit(perpage)
  post = JSON.parse(JSON.stringify(postList))
  return res.render("site/post_detail", {
    cate: cate,
    product: product,
    slide: slide,
    post: post,
    postItem: postItem,
    title: "Chi tiết bài viết",
    cart: req.session.cart,
    totalPage: totalPage,
    pageNext: pageNext,
    pagePrev: pagePrev
  })
}
// Hiên thị liên hệ
let getContact = async (req, res) => {
  // category
  let cate = await CategoryModel.listAll()
  cate = JSON.parse(JSON.stringify(cate))
  // product
  let product = await ProductModel.listAll()
  product = JSON.parse(JSON.stringify(product))
  // slideshow
  let slide = await SlideShowModel.listAll()
  slide = JSON.parse(JSON.stringify(slide))
  return res.render("site/contact", {
    cate: cate,
    product: product,
    slide: slide,
    title: "Liên hệ",
    cart: req.session.cart,
    success: req.flash("success"),
    errors: req.flash("errors")
  })
}
// Sản phẩm chi tiết
let getProductDetail = async (req, res) => {
  let id = req.params.id
  let slide = await SlideShowModel.listAll()
  slide = JSON.parse(JSON.stringify(slide))
  let cate = await CategoryModel.listAll()
  cate = JSON.parse(JSON.stringify(cate))
  let product = await ProductModel.findProductById({ _id: id })
  item = JSON.parse(JSON.stringify(product))
  let comment = await CommentModel.find({ product_id: id }).populate("products")
  comment = JSON.parse(JSON.stringify(comment))
  return res.render("site/product", {
    cate: cate,
    item: item,
    slide: slide,
    title: "Chi tiết sản phẩm",
    cart: req.session.cart,
    success: req.flash("success"),
    errors: req.flash("errors"),
    comment: comment
  })
}
// lọc sản phẩm tăng dần
let getIncrease = (req, res) => {
  return new Promise(async (resolve, reject) => {
    let page = parseInt(req.query.page) || 1
    let perpage = 8
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
    // category
    let cate = await CategoryModel.listAll()
    cate = JSON.parse(JSON.stringify(cate))
    // product
    let product = await ProductModel.find().skip(perRow).limit(perpage).populate("categories")
    product = JSON.parse(JSON.stringify(product))
    product.sort((a, b) => {
      return a.price - b.price
    })

    let productSuccess = await ProductModel.find({
      $where: function () {
        return this.qtySeller > 1
      }
    }).skip(perRow).limit(perpage).populate("categories");
    productSuccess = JSON.parse(JSON.stringify(productSuccess))
    productSuccess.sort((a, b) => {
      return a.price - b.price
    })
    //let totalSeller = Math.ceil(productSuccess.length / perpage)

    let invoiceProduct = await invoiceModel.listAll()
    invoiceProduct = JSON.parse(JSON.stringify(invoiceProduct))

    // invoiceProduct.forEach(item => {
    //   item.product_detail.forEach(item2 => {
    //     product.forEach(async (p) => {
    //       let qtySeller = p.qtySeller
    //       if (p._id === item2._id) {
    //         let item = {
    //           qtySeller: qtySeller + item2.qty
    //         }
    //         await ProductModel.updateProduct(p._id, item)
    //       }
    //     })
    //   })
    // })
    // slideshow
    let slide = await SlideShowModel.listAll()
    slide = JSON.parse(JSON.stringify(slide))
    // render
    return res.render("site/index", {
      cate: cate,
      product: product,
      slide: slide,
      title: "Sản phẩm theo thứ tự giá tăng dần",
      cart: req.session.cart,
      totalPage: totalPage,
      pageNext: pageNext,
      pagePrev: pagePrev,
      productSuccess: productSuccess
    })
  })

}
// lọc sản phẩm giảm dần
let getDeincrease = (req, res) => {
  return new Promise(async (resolve, reject) => {
    let page = parseInt(req.query.page) || 1
    let perpage = 8
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
    // category
    let cate = await CategoryModel.listAll()
    cate = JSON.parse(JSON.stringify(cate))
    // product
    let product = await ProductModel.find().skip(perRow).limit(perpage).populate("categories")
    product = JSON.parse(JSON.stringify(product))
    product.sort((a, b) => {
      return b.price - a.price
    })
    let productSuccess = await ProductModel.find({
      $where: function () {
        return this.qtySeller > 1
      }
    }).skip(perRow).limit(perpage).populate("categories");
    productSuccess = JSON.parse(JSON.stringify(productSuccess))
    productSuccess.sort((a, b) => {
      return b.price - a.price
    })
    //let totalSeller = Math.ceil(productSuccess.length / perpage)

    let invoiceProduct = await invoiceModel.listAll()
    invoiceProduct = JSON.parse(JSON.stringify(invoiceProduct))

    // invoiceProduct.forEach(item => {
    //   item.product_detail.forEach(item2 => {
    //     product.forEach(async (p) => {
    //       let qtySeller = p.qtySeller
    //       if (p._id === item2._id) {
    //         let item = {
    //           qtySeller: qtySeller + item2.qty
    //         }
    //         await ProductModel.updateProduct(p._id, item)
    //       }
    //     })
    //   })
    // })
    // slideshow
    let slide = await SlideShowModel.listAll()
    slide = JSON.parse(JSON.stringify(slide))
    // render
    return res.render("site/index", {
      cate: cate,
      product: product,
      slide: slide,
      title: "Sản phẩm theo thứ tự giá giảm dần",
      cart: req.session.cart,
      totalPage: totalPage,
      pageNext: pageNext,
      pagePrev: pagePrev,
      productSuccess: productSuccess
    })
  })
}
// lọc sản phẩm theo chữ cái
let getAlphabet = (req, res) => {
  return new Promise(async (resolve, reject) => {
    let page = parseInt(req.query.page) || 1
    let perpage = 8
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
    // category
    let cate = await CategoryModel.listAll()
    cate = JSON.parse(JSON.stringify(cate))
    // product
    let product = await ProductModel.find().skip(perRow).limit(perpage).populate("categories")
    product = JSON.parse(JSON.stringify(product))
    product.sort((a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    })
    let productSuccess = await ProductModel.find({
      $where: function () {
        return this.qtySeller > 1
      }
    }).skip(perRow).limit(perpage).populate("categories");
    productSuccess = JSON.parse(JSON.stringify(productSuccess))
    productSuccess.sort((a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    })
    //let totalSeller = Math.ceil(productSuccess.length / perpage)

    let invoiceProduct = await invoiceModel.listAll()
    invoiceProduct = JSON.parse(JSON.stringify(invoiceProduct))

    // invoiceProduct.forEach(item => {
    //   item.product_detail.forEach(item2 => {
    //     product.forEach(async (p) => {
    //       let qtySeller = p.qtySeller
    //       if (p._id === item2._id) {
    //         let item = {
    //           qtySeller: qtySeller + item2.qty
    //         }
    //         await ProductModel.updateProduct(p._id, item)
    //       }
    //     })
    //   })
    // })
    // slideshow
    let slide = await SlideShowModel.listAll()
    slide = JSON.parse(JSON.stringify(slide))
    // render
    return res.render("site/index", {
      cate: cate,
      product: product,
      slide: slide,
      title: "Sản phẩm theo thứ tự giá giảm dần",
      cart: req.session.cart,
      totalPage: totalPage,
      pageNext: pageNext,
      pagePrev: pagePrev,
      productSuccess: productSuccess
    })
  })
}
//tìm kiếm sản phẩm
let getSearch = (req, res) => {
  return new Promise(async (resolve, reject) => {
    let keyword = req.query.keyword
    let page = parseInt(req.query.page) || 1
    let perpage = 8
    let perRow = page * perpage - perpage

    let productAll = await ProductModel.find({ name: { $regex: keyword, $options: 'i' } }).populate("categories")
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

    //newKeyword = ".*" + keyword.replace(" ", ".*") + ".*"
    let cate = await CategoryModel.listAll()
    cate = JSON.parse(JSON.stringify(cate))
    // product
    let product = await ProductModel.find({ name: { $regex: keyword, $options: 'i' } }).skip(perRow).limit(perpage).populate("categories").exec()
    product = JSON.parse(JSON.stringify(product))
    let productSuccess = await ProductModel.find({
      $where: function () {
        return this.qtySeller > 1
      }, name: { $regex: keyword, $options: 'i' }
    }).skip(perRow).limit(perpage).populate("categories");
    productSuccess = JSON.parse(JSON.stringify(productSuccess))
    //let totalSeller = Math.ceil(productSuccess.length / perpage)

    let invoiceProduct = await invoiceModel.listAll()
    invoiceProduct = JSON.parse(JSON.stringify(invoiceProduct))

    // invoiceProduct.forEach(item => {
    //   item.product_detail.forEach(item2 => {
    //     product.forEach(async (p) => {
    //       let qtySeller = p.qtySeller
    //       if (p._id === item2._id) {
    //         let item = {
    //           qtySeller: qtySeller + item2.qty
    //         }
    //         await ProductModel.updateProduct(p._id, item)
    //       }
    //     })
    //   })
    // })
    // slideshow
    let slide = await SlideShowModel.listAll()
    slide = JSON.parse(JSON.stringify(slide))
    return res.render("site/search", {
      cate: cate,
      product: product,
      slide: slide,
      title: "Tìm kiếm sản phẩm",
      cart: req.session.cart,
      totalPage: totalPage,
      pageNext: pageNext,
      pagePrev: pagePrev,
      keyword: keyword,
      productSuccess: productSuccess
    })
  })
}
// hien thi gio hang
let getCart = async (req, res) => {
  // category
  let cate = await CategoryModel.listAll()
  cate = JSON.parse(JSON.stringify(cate))
  // slideshow
  let slide = await SlideShowModel.listAll()
  slide = JSON.parse(JSON.stringify(slide))
  // product
  let productList = req.session.cart
  let sum
  if (productList) {
    sum = productList.map(x => x.qty * x.sale_price).reduce((x, y) => x + y, 0)
  } else {
    sum = 0
  }

  return res.render("site/cart", {
    cate: cate,
    slide: slide,
    title: "Giỏ hàng",
    cart: req.session.cart,
    sum: sum,
    success: req.flash("success"),
    errors: req.flash("errors")
  })

}
// Thêm tạm vào giở hàng
let getToCart = async (req, res) => {
  let id = req.params.id
  let product = await ProductModel.findOne({ _id: id })
  product = JSON.parse(JSON.stringify(product))

  if (typeof req.session.cart == "undefined") {
    req.session.cart = []
    req.session.cart.push({
      _id: product._id,
      qty: 1,
      avatar: product.avatar,
      sale_price: product.sale_price,
      name: product.name
    })
  } else {
    let cart = req.session.cart
    let newItem = true
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]._id == product._id) {
        cart[i].qty++
        newItem = false
        break
      }
    }
    if (newItem) {
      cart.push({
        _id: product._id,
        qty: 1,
        avatar: product.avatar,
        sale_price: product.sale_price,
        name: product.name
      })
    }
  }
  res.redirect('/')


}
// update
let updateCart = async (req, res) => {
  let id = req.params.id
  let cart = req.session.cart
  let action = req.query.action
  for (let i = 0; i < cart.length; i++) {
    if (cart[i]._id == id) {
      switch (action) {
        case 'add':
          cart[i].qty++
          break
        case 'remove':
          cart[i].qty--
          if (cart[i].qty <= 0) {
            cart.splice(i, 1)
          }
          break
        case 'clear':
          cart.splice(i, 1)
          if (cart.length == 0) delete req.session.cart
          break
        default:
          console.log("ok")
          break
      }
      break
    }
  }
  req.flash("success", "Cập nhập chức năng thành công!")
  res.redirect('/cart')
}
// clear cart
let getClearCart = (req, res) => {
  delete req.session.cart
  req.flash("success", "Xóa hết sản phẩm thành công!")
  res.redirect('/cart')
}

let postCart = async (req, res) => {
  let errorArr = []
  let validationErrors = validationResult(req)
  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped())
    errors.forEach(item => {
      errorArr.push(item.msg)
    })
    req.flash("errors", errorArr)
    res.redirect('/cart')
  }
  try {
    let productList = req.session.cart
    let sum
    if (productList) {
      sum = productList.map(x => x.qty * x.sale_price).reduce((x, y) => x + y, 0)
    } else {
      sum = 0
    }
    if (productList) {
      let item = {
        name_user: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        total_price: sum.toLocaleString(),
        product_detail: productList,
        status: 'Đang chuyển hàng'
      }
      await invoiceModel.create(item)
      //dua gio hang ve rong
      delete req.session.cart
      req.flash("success","Hóa đơn của bạn đã được xác thực, cảm ơn quý khách")
      res.redirect('/cart')
    }
  }
  catch (error) {
    console.log(error)
  }
}

//
module.exports = {
  getSite: getSite,
  getProductCategory: getProductCategory,
  getPost: getPost,
  getContact: getContact,
  getPostDetail: getPostDetail,
  getProductDetail: getProductDetail,
  getIncrease: getIncrease,
  getDeincrease: getDeincrease,
  getAlphabet: getAlphabet,
  getSearch: getSearch,
  getToCart: getToCart,
  getCart: getCart,
  updateCart: updateCart,
  getClearCart: getClearCart,
  postCart: postCart
}