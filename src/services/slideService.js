const SlideModel = require("./../models/slideshow")
let addSlideshow = (filename) => {
    return SlideModel.createNew(filename)
}
let editSlideshow =  (id, filename) => {
    return SlideModel.updateSlideshow(id, filename)
}
module.exports = {
    addSlideshow: addSlideshow,
    editSlideshow: editSlideshow
}