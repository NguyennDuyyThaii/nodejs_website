const SignInController = require("./signInController")
const signUpController = require("./signUpController")
const dashboardController = require("./dashboardController")
const logoutController = require("./logoutController")
const UserController = require("./userController")
const CategoryController  = require('./CategoryController')
const ContactController = require("./userContactController")
const SlideshowController = require("./slideshowController")
const PostController = require("./postController")
const ProductController = require("./productController")
const CommentController = require("./commentController")
const BoughtController = require("./BoughtController")


const SignIn = SignInController
const SignUp = signUpController
const dashboard = dashboardController
const logout = logoutController
const User = UserController
const Cate = CategoryController
const Contact = ContactController
const Slideshow = SlideshowController
const Post = PostController
const Product = ProductController
const Comment = CommentController
const Bought = BoughtController


module.exports = {
    SignIn: SignIn,
    SignUp: SignUp,
    dashboard: dashboard,
    logout: logout,
    User: User,
    Cate: Cate,
    Contact:Contact,
    Slideshow:Slideshow,
    Post: Post,
    Product: Product,
    Comment: Comment,
    Bought: Bought
}