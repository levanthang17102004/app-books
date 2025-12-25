import axios from "@/utils/axios.customize"

/**
 * ======================================================
 * USER API - CẬP NHẬT THÔNG TIN NGƯỜI DÙNG
 * ======================================================
 * Mục đích:
 * - Cập nhật thông tin cơ bản của user (name, phone)
 *
 * @param _id  - id của user cần cập nhật
 * @param name - tên mới
 * @param phone - số điện thoại mới
 *
 * Endpoint: PATCH /user
 * Body: { _id, name, phone }
 */
export const updateUserAPI = (_id: string, name: string, phone: string) => {
  return axios.patch<IBackendRes<IUserLogin>>(
    '/user',
    { _id, name, phone }
  )
}

/**
 * ======================================================
 * USER API - ĐỔI MẬT KHẨU
 * ======================================================
 * Mục đích:
 * - Đổi mật khẩu cho user đang đăng nhập
 *
 * @param currentPassword - mật khẩu hiện tại
 * @param newPassword - mật khẩu mới
 *
 * Endpoint: POST /user/change-password
 * Body: { currentPassword, newPassword }
 */
export const changePasswordAPI = (currentPassword: string, newPassword: string) => {
  return axios.post(
    '/user/change-password',
    { currentPassword, newPassword }
  )
}

/**
 * ======================================================
 * LIKE / FAVORITES API - LIKE / DISLIKE BOOKSTORE
 * ======================================================
 * Mục đích:
 * - Like hoặc Dislike một nhà sách
 *
 * @param bookstore - id nhà sách
 * @param quantity  - số thay đổi (thường +1 để like, -1 để dislike/hoặc bỏ like tuỳ logic backend)
 *
 * Endpoint: POST /like
 * Body: { bookstore, quantity }
 */
export const likeBookstoreAPI = (bookstore: string, quantity: number) => {
  return axios.post<IBackendRes<IUserLogin>>(
    '/like',
    { bookstore, quantity }
  )
}

/**
 * ======================================================
 * LIKE / FAVORITES API - LẤY DANH SÁCH BOOKSTORE YÊU THÍCH
 * ======================================================
 * Mục đích:
 * - Lấy danh sách các nhà sách user đã like (favorite)
 *
 * Endpoint: GET /like
 * Response: IBackendRes<ILikeBookstore[]>

 */
export const getFavoriteBookstoreAPI = () => {
  return axios.get<IBackendRes<ILikeBookstore[]>>('/like')
}

/**
 * ======================================================
 * LIKE / FAVORITES API - XÓA LIKE BOOKSTORE
 * ======================================================
 * Mục đích:
 * - Xóa (remove) like/dislike của user với một bookstore
 *
export const deleteLikeBookstoreAPI = () => {
  return axios.post<IBackendRes<ILikeBookstore>>('/like/delete')
}

/**
 * ======================================================
 * NOTIFICATION API - LẤY DANH SÁCH THÔNG BÁO
 * ======================================================
 * Mục đích:
 * - Lấy danh sách thông báo của user đang đăng nhập
 *
 * Endpoint: GET /notification
 * Response: IBackendRes<INotification[]>

 */
export const getNotificationsAPI = () => {
  return axios.get<IBackendRes<INotification[]>>('/notification')
}
