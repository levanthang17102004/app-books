// Import instance axios đã được customize (baseURL, interceptor, token, ...)
import axios from "@/utils/axios.customize"

/**
 * ======================================================
 * ORDER API - ĐẶT HÀNG (PLACE ORDER)
 * ======================================================
 * Mục đích:
 * - Gửi yêu cầu tạo đơn hàng mới lên backend
 *
 * @param data - dữ liệu đơn hàng (bookstore, totalPrice, totalQuantity, detail, ...)
 *              Hiện đang để type `any`, nên có thể thay bằng interface riêng (IPlaceOrderPayload) cho chuẩn hơn.
 *
 * Endpoint: POST /order
 * Body: { ...data } (spread toàn bộ dữ liệu vào body)
 *
 * Lưu ý:
 * - API này thường yêu cầu accessToken (user đã đăng nhập), token được gắn qua axios interceptor
 * - Generic response đang dùng IBackendRes<IUserLogin> có thể không đúng.
 *   Backend thường trả về _id đơn hàng hoặc order object, ví dụ: IBackendRes<{ _id: string }>
 */
export const placeOrderAPI = (data: any) => {
  return axios.post<IBackendRes<IUserLogin>>(
    '/order',
    { ...data } // đưa toàn bộ data vào body request
  )
}

/**
 * ======================================================
 * ORDER API - LỊCH SỬ ĐƠN HÀNG (ORDER HISTORY)
 * ======================================================
 * Mục đích:
 * - Lấy danh sách đơn hàng của user theo phân trang
 *
 * @param page - trang hiện tại (mặc định 1)
 * @param limit - số đơn hàng mỗi trang (mặc định 10)
 *
 * Endpoint: GET /order?page={page}&limit={limit}
 *
 * Response:
 * - IBackendRes<IOrderHistory[]> (danh sách order)
 */
export const getOrderHistoryAPI = (page: number = 1, limit: number = 10) => {
  return axios.get<IBackendRes<IOrderHistory[]>>(
    `/order?page=${page}&limit=${limit}`
  )
}
