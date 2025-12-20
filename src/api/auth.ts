import axios from "@/utils/axios.customize"

export const registerAPI = (email: string, password: string, name: string) => {
    return axios.post<IBackendRes<IRegister>>(`/auth/register`, { email, password, name })
}

export const verifyCodeAPI = (email: string, code: string) => {
    return axios.post<IBackendRes<IRegister>>(`/auth/verification`, { email, code })
}

export const resendCodeAPI = (email: string, code: string) => {
    // Lưu ý: Bạn đang dùng endpoint giống register, hãy chắc chắn backend xử lý đúng
    return axios.post<IBackendRes<IRegister>>(`/auth/register`, { email, code })
}

export const loginAPI = (email: string, password: string) => {
    return axios.post<IBackendRes<IUserLogin>>(`/auth/login`, { email, password })
}

export const resetPasswordAPI = (email: string) => {
    return axios.post<IBackendRes<IRegister>>(`/auth/forgotPassword`, { email })
}

export const getAccountAPI = () => {
    return axios.get<IBackendRes<IRegister>>(`/auth/get-account`)
}