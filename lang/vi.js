const Registererrors = {
    email_incorect: "Email phải có định dạng example@gmail.com",
    password_incorect: "Mật khẩu phải có ít nhất 8 kí tự, bao gồm chữ hoa, chữ thường",
    re_password_incorect: "Nhập lại mật khẩu chưa chính xác, bạn hãy nhập lại",
    gender_incorect: "Tại sao giới tính lại không nhập được? Trình duyệt bạn có vấn đề?",
    email_in_use: "Email này đã tồn tại trong một tài khoản khác !",
    account_removed: "Tài khoản này đã bị gỡ khỏi hệ thống của chúng tôi",
    account_not_active: "Tài khoản này đã được đăng kí nhưng chưa được ACTIVE, kiểm tra email của bạn"
}
const Registersuccess = {
    userCreated: (useremail) => {
        return `Tài khoản <strong>${useremail}</strong> đã đăng kí nhưng chưa kích hoạt, vui lòng kiểm tra email mà bạn đã đăng kí!`
    },
    account_actived: "Kích hoạt tài khoản thành công, Bạn có thể đăng nhập",
    logout_success: "Đăng xuất tài khoản thành công!" 
}
const Registermailer = {
    subject: "NguyenDuyThai: Xác nhận thông tin tài khoản của bạn !",
    template: (linkVerify) => {
        return`
            <h2>Bạn nhận được Email này vì muốn đăng kí tài khoản quản trị.</h2>
            <h3>Vui lòng Click vào liên kết bên dưới để kích hoạt tài khoản:</h3>
            <h3><a href="${linkVerify}" target="blank" >${linkVerify}</a></h3>
            <h1>Xin chân thành cảm ơn!</h1>
        `
    },
    send_faild: "Có lối trong quá trình gửi email, vui lòng xem lại tất cả các thông tin!"

}

const transPassport = {
    server_error: "Có lỗi ở phía Server, Vui lòng đăng nhập hoặc trở lại sau, cảm ơn.",
    login_failed: "Tài khoản hoặc mật khẩu không chính xác, hãy kiểm tra lại!",
    account_not_active: "Tài khoản này đã được đăng kí nhưng chưa được ACTIVE, kiểm tra email của bạn",
    login_success: (username) => {
        return `Xin chào ${username}, Chúc bạn một ngày tốt lành!`
    }
}
const transUploadImage = {
    createSuccess: "Tạo ảnh thành công",
    editSuccess: "Sửa ảnh thành công",
    deleteSuccess : "Xóa ảnh thành công!",
    type_of_image: "Ảnh upload phải nằm trong các định dạng sau đây: JPEG-PNG-JPG",
    error: "Có lỗi gì đó, bạn cần kiểm tra lại"
}
///////////
const transUser = {
    deleteSuccess : "Xóa tài khoản thành công!",
    email_in_use: "Email này đã tồn tại trong một tài khoản khác !",
    current_password_incoreact: "Mật khẩu hiện tại của bạn nhập không đúng",
    password_incorect: "Mật khẩu phải có ít nhất 8 kí tự, bao gồm chữ hoa, chữ thường",
    re_password_incorect: "Nhập lại mật khẩu chưa chính xác, bạn hãy nhập lại",
    current_password_not_empty: "Mật khẩu không được để trống",
    password_not_empty: "Mật khẩu mới không được để trống",
    sucess: "Cập nhập tài khoản thành công"
}
const transCategory = {
    deleteSuccess : "Xóa danh mục thành công!",
    cate_not_empty: "Không được thêm danh mục trống!",
    createSuccess: "Tạo danh mục thành công",
    editSuccess: "Sửa danh mục thành công"
}
const transContact = {
    deleteSuccess : "Xóa liên hệ thành công!",
    name_not_empty: "Tên người liên hệ không được để trống!",
    email_not_empty: "Email người liên hệ không được để trống!",
    phone_not_empty: "Điện thoại người liên hệ không được để trống!",
    address_not_empty: "Địa chỉ người liên hệ không được để trống!",
    createSuccess: "Tạo liên hệ thành công",
    editSuccess: "Sửa liên hệ thành công",
    email_incorect: "Email phải có định dạng example@gmail.com",
    phone_incorect: "Số điện thoại phải là số hợp lệ của Việt Nam",
}
const transPost = {
    deleteSuccess : "Xóa bài viết thành công!",
    createSuccess: "Tạo bài viết thành công",
    editSuccess: "Sửa bài viết thành công",
    title_not_empty: "Tiêu đề bài viết không được để trống",
    detail_not_empty: "Nội dung bài viết không được để trống",
    short_detail_not_empty: "Mô tả ngắn bài viết không được để trống",
    detail_length: "Độ dài nội dung bài viết phải ít nhất chứa 100 kí tự",
    short_detail_length: "Độ dài mô tả ngắn phải ít nhất chứa 20 kí tự"
}
const transProduct = {
    deleteSuccess : "Xóa sản phẩm thành công!",
    createSuccess: "Tạo sản phẩm thành công",
    editSuccess: "Sửa sản phẩm thành công",
    name_not_empty: "Tên sản phẩm không được để trống",
    price_not_empty: "Giá sản phẩm không được để trống",
    sale_price_not_empty: "Giá mới sản phẩm không được để trống",
    detail_not_empty: "Nội dung miêu tả sản phẩm không được để trống",
}
const transComment = {
    createSuccess: "Tạo bình luận thành công, cảm ơn đã phản hổi ý kiến của bạn",
    name_not_empty: "Không được để trống tên",
    email_not_empty: "Không được để trống email",
    content_not_empty: "Không được để trống nội dung",
    email: "Email phải đúng định dạng"
} 
module.exports = {
    Registererrors: Registererrors,
    Registersuccess: Registersuccess,
    Registermailer: Registermailer,
    transPassport:transPassport,
    transUser:transUser,
    transCategory: transCategory,
    transContact: transContact,
    transUploadImage:transUploadImage,
    transPost: transPost,
    transProduct: transProduct,
    transComment: transComment
}