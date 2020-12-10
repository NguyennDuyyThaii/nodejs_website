const ProductModel = require("./../models/productModels")

let addProduct = async (name, price, avatar, sale_price, cate_id, detail ) => {
    let item = {
        name: name,
        price: price,
        avatar: avatar,
        sale_price: sale_price,
        cate_id: cate_id,
        detail: detail, 
        qtySeller: 0
    }
    await ProductModel.createNew(item)
}
let editProduct = async (id, name, price, avatar, sale_price, cate_id, detail) => {
    let item = {
        name: name,
        price: price,
        avatar: avatar,
        sale_price: sale_price,
        cate_id: cate_id,
        detail: detail,
        qtySeller: 0
    } 
    await ProductModel.updateProduct(id, item)
}

module.exports = {
    addProduct: addProduct,
    editProduct: editProduct
}