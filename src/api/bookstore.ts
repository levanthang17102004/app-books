// Import instance axios đã được customize (baseURL, interceptor, token, ...)
import axios from "@/utils/axios.customize"

/**
 * ======================================================
 * BOOKSTORE API - LẤY TOP BOOKSTORE THEO TIÊU CHÍ (ref)
 * ======================================================
 * Mục đích:
 * - Gọi API lấy danh sách top bookstore theo một "ref" (ví dụ: top-rated, top-like, top-order,...)
 *
 * @param ref - chuỗi tham chiếu xác định loại top (do backend định nghĩa)
 *
 * Endpoint: POST /bookstore/:ref
 * Body: {} (đang gửi body rỗng)
 *
 * Lưu ý:
 * - headers: { delay: 3000 } dùng để test giả lập độ trễ 3s từ backend (nếu backend có xử lý header delay)
 * - Response trả về mảng ITopBookstore[]
 */
export const getTopBookstoreAPI = (ref: string) => {
  return axios.post<IBackendRes<ITopBookstore[]>>(
    `/bookstore/${ref}`,
    {}, // body rỗng
    {
      headers: { delay: 3000 }, // giả lập độ trễ (phục vụ test/loading UI)
    }
  )
}

/**
 * ======================================================
 * BOOKSTORE API - LẤY THÔNG TIN BOOKSTORE THEO ID
 * ======================================================
 * Mục đích:
 * - Lấy chi tiết 1 nhà sách theo id
 *
 * @param id - id của bookstore
 *
 * Endpoint: GET /bookstore/:id
 *
 * Lưu ý:
 * - headers delay tương tự để test loading
 * - Response: IBackendRes<IBookstore>
 */
export const getBookstoreByIdAPI = (id: string) => {
  return axios.get<IBackendRes<IBookstore>>(`/bookstore/${id}`, {
    headers: { delay: 3000 }, // giả lập độ trễ 3s
  })
}

/**
 * ======================================================
 * BOOKSTORE API - TÌM BOOKSTORE THEO TÊN
 * ======================================================
 * Mục đích:
 * - Tìm kiếm nhà sách theo tên (search)
 * - Hiện đang cố định phân trang: current=1, pageSize=10
 *
 * @param name - tên nhà sách cần tìm (keyword)
 *
 * Endpoint: GET /bookstore?current=1&pageSize=10&name=...
 *
 * Gợi ý:
 * - Nên encodeURIComponent(name) để tránh lỗi khi name có dấu, khoảng trắng, ký tự đặc biệt
 * - Ví dụ: name="Nhà sách A&B" sẽ dễ lỗi nếu không encode
 */
export const getBookstoreByNameAPI = (name: string) => {
  return axios.get<IBackendRes<IModelPaginate<IBookstore>>>(
    `/bookstore?current=1&pageSize=10&name=${encodeURIComponent(name)}`
  )
}

/**
 * ======================================================
 * BOOKSTORE API - FILTER BOOKSTORE THEO QUERY STRING
 * ======================================================
 * Mục đích:
 * - Lọc danh sách bookstore theo nhiều tiêu chí (query string truyền vào)
 *   Ví dụ query: "current=1&pageSize=10&city=danang&minRating=4"
 *
 * @param query - chuỗi query đã format sẵn (không cần dấu '?' ở đầu, vì đã cộng sẵn)
 *
 * Endpoint: GET /bookstore?{query}
 *
 * Lưu ý:
 * - Đảm bảo query không bắt đầu bằng dấu '?' để tránh thành /bookstore??...
 * - Có thể dùng URLSearchParams để build query an toàn
 */
export const filterBookstoreAPI = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IBookstore>>>(`/bookstore?${query}`)
}
