const {
    SignIn, SignUp, dashboard, logout, User, Bought,
    Cate, Contact, Slideshow, Post, Product, Comment } = require("./../controllers/adminController/index")
const { Site, checkContact, checkComment } = require("../controllers/siteController/index")
const {
    registerValidation,
    categoryValidation,
    contactValidation,
    postValidation,
    commentValidation,
    productValidation,
    boughtValidation } = require("./../validation/index")
const initPassportLocal = require("./../controllers/passportController/local")
const uploadFileMiddleware = require("./../middleware/post/upload")
const uploadFileProductMiddleware = require("./../middleware/product/product")
const uploadMultipleFileMiddlewareProduct = require("./../middleware/product/gallery")
const passport = require("passport")
const express = require("express")
const router = express.Router()

initPassportLocal()
let initRouter = (app) => {
    // DASHBOARD
    router.get('/admin', logout.checkLoggedIn, dashboard.getDashboard)
    // LOGOUT
    router.get('/logout', logout.checkLoggedIn, logout.getLogout)
    // SignIN-SingUP
    // SignIN
    router.get('/signin', logout.checkLoggedOut, SignIn.getSignIn)
    router.post('/signin', logout.checkLoggedOut, passport.authenticate("local", {
        successRedirect: "/admin",
        failureRedirect: "/signin",
        successFlash: true,
        failureFlash: true
    }))
    // SignUp-Register
    router.get('/signup', logout.checkLoggedOut, SignUp.getSignUp)
    router.post('/register', logout.checkLoggedOut, registerValidation.register, SignUp.postRegister)
    router.get('/verify/:token', logout.checkLoggedOut, SignUp.verifyAccount)
    // -------------------User-------------------
    router.get('/user', logout.checkLoggedIn, User.getUser)
    router.get('/user/remove/:id', logout.checkLoggedIn, User.removeUser)
    router.get('/user/edit/:id', logout.checkLoggedIn, User.getEdit)
    // ------------------Category----------------
    router.get('/category', logout.checkLoggedIn, Cate.getCategory)
    router.get('/category/remove/:id', logout.checkLoggedIn, Cate.getRemoveCategory)
    router.get('/category/add', logout.checkLoggedIn, Cate.getAddCategory)
    router.post('/category/add/post', logout.checkLoggedIn, categoryValidation.cateValidation, Cate.postAddCategory)
    router.get('/category/edit/:id', logout.checkLoggedIn, Cate.getEditCategory)
    router.post('/category/edit/:id', logout.checkLoggedIn, categoryValidation.cateValidation, Cate.postEditCategory)
    // -----------------Product----------------
    router.get('/product', logout.checkLoggedIn, Product.getProduct)
    router.get('/product/remove/:id', logout.checkLoggedIn, Product.getRemoveProduct)
    router.get('/product/add', logout.checkLoggedIn, Product.getAddProduct)
    router.post('/product/add/post', logout.checkLoggedIn, uploadFileProductMiddleware, productValidation.productValidation, Product.postAddProduct)
    router.get('/product/edit/:id', logout.checkLoggedIn, Product.getEditProduct)
    router.post('/product/edit/:id', logout.checkLoggedIn, uploadFileProductMiddleware, productValidation.productValidation, Product.postEditProduct)

    router.get('/product/gallery/:id', logout.checkLoggedIn, Product.getGalleryProduct)
    router.post('/product/gallery/:id', logout.checkLoggedIn, uploadMultipleFileMiddlewareProduct, Product.postGalleryProduct)
    // ------------------Gallery----------------
    router.get('/gallery', logout.checkLoggedIn)
    // ------------------UserContact------------
    router.get('/contact', logout.checkLoggedIn, Contact.getContact)
    router.get('/contact/remove/:id', logout.checkLoggedIn, Contact.getRemoveContact)
    router.get('/contact/add', logout.checkLoggedIn, Contact.getAddContact)
    router.post('/contact/add/post', logout.checkLoggedIn, contactValidation.contactValidation, Contact.postAddContact)
    router.get('/contact/edit/:id', logout.checkLoggedIn, Contact.getEditCategory)
    router.post('/contact/edit/:id', logout.checkLoggedIn, contactValidation.contactValidation, Contact.postEditContact)
    // ------------------Slideshow----------------
    router.get('/slideshow', logout.checkLoggedIn, Slideshow.getSlideshow)
    router.get('/slideshow/remove/:id', logout.checkLoggedIn, Slideshow.getRemoveSlideshow)
    router.get('/slideshow/add', logout.checkLoggedIn, Slideshow.getAddSlideshow)
    router.post('/slideshow/add/post', logout.checkLoggedIn, Slideshow.postAddSlideshow)
    router.get('/slideshow/edit/:id', logout.checkLoggedIn, Slideshow.getEditSlideshow)
    router.post('/slideshow/edit/:id', logout.checkLoggedIn, Slideshow.postEditSlideshow)
    // -----------------Posts----------------
    router.get('/post', logout.checkLoggedIn, Post.getPost)
    router.get('/post/remove/:id', logout.checkLoggedIn, Post.getRemovePost)
    router.get('/post/add', logout.checkLoggedIn, Post.getAddPost)
    router.post('/post/add/post', logout.checkLoggedIn, uploadFileMiddleware, postValidation.postsValidation, Post.postAddPost)
    router.get('/post/edit/:id', logout.checkLoggedIn, Post.getEditPost)
    router.post('/post/edit/:id', logout.checkLoggedIn, uploadFileMiddleware, postValidation.postsValidation, Post.postEditPost)
    //
    //----------------Comment-------------
    router.get('/comment', logout.checkLoggedIn, Comment.getComment)
    router.get('/comment/remove/:id', logout.checkLoggedIn, Comment.getRemoveCommnet)
    //
    //----------------- Cart Bought -----------
    router.get('/bought',logout.checkLoggedIn, Bought.getBought )
    router.get('/bought/bought_detail/:id',logout.checkLoggedIn, Bought.getDetailBought )
    router.get('/bought/remove/:id',logout.checkLoggedIn, Bought.getRemoveCart )
    router.get('/bought/edit/:id',logout.checkLoggedIn, Bought.getEditInvoices )
    router.post('/bought/edit/:id',logout.checkLoggedIn, Bought.postEditInvoices )
    router.get('/boughtCheck/:id',logout.checkLoggedIn, Bought.boughtCheck )
    //
    //--------------------Site-------------------
    router.get('/', Site.getSite)
    router.get('/increase', Site.getIncrease)
    router.get('/deincrease', Site.getDeincrease)
    router.get('/alphabet', Site.getAlphabet)
    router.get('/search', Site.getSearch)
    // ------- productdetail-comment
    router.get('/productDetail/:id', Site.getProductDetail)
    router.post('/productDetail/:id', commentValidation.commentValidation, checkComment.postComment)
    //
    router.get('/categories', Site.getProductCategory)
    router.get('/posts', Site.getPost)
    router.get('/post/detail/:id', Site.getPostDetail)
    // contact-form
    router.get('/getContact', Site.getContact)
    router.post('/getContact/post', contactValidation.contactValidation, checkContact.postContact)

    //---- Cart----
    router.get('/addToCart/:id', Site.getToCart)
    router.get('/cart', Site.getCart)
    router.post('/cart', boughtValidation.boughtValidation ,Site.postCart)
    router.get('/cart/update/:id', Site.updateCart)
    router.get('/clearCart', Site.getClearCart)
    // login
    return app.use('/', router)
}

module.exports = initRouter