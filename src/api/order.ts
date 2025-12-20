import axios from "@/utils/axios.customize"

export const placeOrderAPI = (data: any) => {
    return axios.post<IBackendRes<IUserLogin>>('/order', { ...data });
};

export const getOrderHistoryAPI = (page: number = 1, limit: number = 10) => {
    return axios.get<IBackendRes<IOrderHistory[]>>(`/order?page=${page}&limit=${limit}`);
};