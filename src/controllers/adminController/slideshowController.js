const SlideshowModel = require("../../models/slideshow")
const { transUploadImage } = require("./../../../lang/vi")
const { slideService } = require("./../../services/index")
const uploadFileMiddleware = require("./../../middleware/UploadImage")
const fs = require("fs-extra")
let getSlideshow = async (req, res) => {
    const Slideshow = await SlideshowModel.listAll()
    slide = JSON.parse(JSON.stringify(Slideshow))

    return res.render("admin/slideshow/slideshow", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        title: "Quản lý Slideshwow",
        slide: slide
    })
}
let getRemoveSlideshow = async (req, res) => {
    let id = req.params.id
    let slide = await SlideshowModel.findSlideshowById({ _id: id })
    slide = JSON.parse(JSON.stringify(slide))
    await SlideshowModel.removeById({ _id: id })
    fs.remove(`./src/public/${slide.avatar}`)
    req.flash("success", transUploadImage.deleteSuccess)
    return res.redirect("/slideshow")

}
let getAddSlideshow = (req, res) => {
    return res.render("admin/slideshow/add_slideshow", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        title: "Thêm ảnh Slideshwow",
    })
}

let postAddSlideshow = (req, res) => {
    return new Promise(async (resolve, reject) => {
        await uploadFileMiddleware(req, res, async (error) => {
            if (error) {
                req.flash("errors", transUploadImage.error)
                res.redirect("/slideshow/add")
            } 
            // lấy đường dẫn chính luôn
            let path = 'images/slideshow/' + req.file.filename
            try {
                let addItem = {
                    avatar: path
                }
                await slideService.addSlideshow(addItem)
                req.flash("success", transUploadImage.createSuccess)
                res.redirect("/slideshow")
            } catch (error) {
                req.flash("errors", transUploadImage.error)
                res.redirect("/slideshow/add")
            }
        })
    })

}
let getEditSlideshow = async (req, res) => {
    let id = req.params.id
    let slideList = await SlideshowModel.findSlideshowById({ _id: id })
    slide = JSON.parse(JSON.stringify(slideList))
    return res.render("admin/slideshow/edit_slideshow", {
        slide: slide,
        title: "Sửa hình ảnh slideshow",
        success: req.flash("success"),
        errors: req.flash("errors")
    })
}
let postEditSlideshow = (req, res) => {
    return new Promise(async (resolve, reject) => {
        await uploadFileMiddleware(req, res, async (error) => {
            if (error) {
                req.flash("errors", transUploadImage.error)
                res.redirect(`/slideshow/edit/${id}`)
            }
            // lấy đường dẫn chính luôn
            let path = 'images/slideshow/' + req.file.filename
            let id = req.params.id
            let slide = await SlideshowModel.findSlideshowById({ _id: id })
            slide = JSON.parse(JSON.stringify(slide))
            fs.remove(`./src/public/${slide.avatar}`)
            try {
                let addItem = {
                    avatar: path
                }
                await slideService.editSlideshow(id,addItem)
                req.flash("success", transUploadImage.editSuccess)
                res.redirect("/slideshow")
            } catch (error) {
                req.flash("errors", transUploadImage.error)
                res.redirect(`/slideshow/edit/${id}`)
            }
        })
    })
}
module.exports = {
    getSlideshow: getSlideshow,
    getRemoveSlideshow: getRemoveSlideshow,
    getAddSlideshow: getAddSlideshow,
    postAddSlideshow: postAddSlideshow,
    getEditSlideshow: getEditSlideshow,
    postEditSlideshow: postEditSlideshow
}