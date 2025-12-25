// Import instance axios đã được customize (baseURL, interceptor, token, ...)
import axios from "@/utils/axios.customize"

/**
 * ======================================================
 * AUTH API - ĐĂNG KÝ TÀI KHOẢN
 * ======================================================
 * Gửi thông tin đăng ký lên backend
 *
 * @param email - Email người dùng
 * @param password - Mật khẩu
 * @param name - Tên người dùng
 *
 * Endpoint: POST /auth/register
 * Response: IBackendRes<IRegister>
 */
export const registerAPI = (email: string, password: string, name: string) => {
    return axios.post<IBackendRes<IRegister>>(
        `/auth/register`,
        { email, password, name }
    )
}

/**
 * ======================================================
 * AUTH API - XÁC THỰC EMAIL (VERIFY CODE)
 * ======================================================
 * Gửi mã OTP để xác thực tài khoản sau khi đăng ký
 *
 * @param email - Email đã đăng ký
 * @param code - Mã xác thực (OTP)
 *
 * Endpoint: POST /auth/verification
 */
export const verifyCodeAPI = (email: string, code: string) => {
    return axios.post<IBackendRes<IRegister>>(
        `/auth/verification`,
        { email, code }
    )
}

/**
 * ======================================================
 * AUTH API - GỬI LẠI MÃ XÁC THỰC
 * ======================================================
 * Gửi lại mã OTP cho email người dùng
 *
 * ⚠️ Lưu ý:
 * - Hiện tại đang dùng lại endpoint /auth/register
 * - Cần đảm bảo backend có xử lý logic resend OTP
 * - Thông thường nên có endpoint riêng: /auth/resend-code
 *
 * @param email - Email cần gửi lại mã
 * @param code - (Có thể không cần, tuỳ backend)
 */
export const resendCodeAPI = (email: string, code: string) => {
    return axios.post<IBackendRes<IRegister>>(
        `/auth/register`,
        { email, code }
    )
}

/**
 * ======================================================
 * AUTH API - ĐĂNG NHẬP
 * ======================================================
 * Đăng nhập hệ thống bằng email và mật khẩu
 *
 * @param email - Email người dùng
 * @param password - Mật khẩu
 *
 * Endpoint: POST /auth/login
 * Response: IBackendRes<IUserLogin> (chứa accessToken + user info)
 */
export const loginAPI = (email: string, password: string) => {
    return axios.post<IBackendRes<IUserLogin>>(
        `/auth/login`,
        { email, password }
    )
}

/**
 * ======================================================
 * AUTH API - QUÊN MẬT KHẨU
 * ======================================================
 * Gửi yêu cầu reset mật khẩu (backend sẽ gửi mật khẩu mới / link reset)
 *
 * @param email - Email người dùng
 *
 * Endpoint: POST /auth/forgotPassword
 */
export const resetPasswordAPI = (email: string) => {
    return axios.post<IBackendRes<IRegister>>(
        `/auth/forgotPassword`,
        { email }
    )
}

/**
 * ======================================================
 * AUTH API - LẤY THÔNG TIN TÀI KHOẢN
 * ======================================================
 * Lấy thông tin user đang đăng nhập
 *
 * ⚠️ Yêu cầu:
 * - Phải có accessToken
 * - Token thường được gắn tự động trong axios interceptor
 *
 * Endpoint: GET /auth/get-account
 */
export const getAccountAPI = () => {
    return axios.get<IBackendRes<IRegister>>(
        `/auth/get-account`
    )
}
