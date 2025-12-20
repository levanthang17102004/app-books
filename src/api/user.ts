import axios from "@/utils/axios.customize"

// --- User Info ---
export const updateUserAPI = (_id: string, name: string, phone: string) => {
    return axios.patch<IBackendRes<IUserLogin>>('/user', { _id, name, phone });
};

export const changePasswordAPI = (currentPassword: string, newPassword: string) => {
    return axios.post('/user/change-password', { currentPassword, newPassword });
};

// --- Likes / Favorites ---
export const likeBookstoreAPI = (bookstore: string, quantity: number) => {
    return axios.post<IBackendRes<IUserLogin>>('/like', { bookstore, quantity });
};

export const getFavoriteBookstoreAPI = () => {
    return axios.get<IBackendRes<ILikeBookstore[]>>('/like');
};

export const deleteLikeBookstoreAPI = () => {
    return axios.post<IBackendRes<ILikeBookstore>>('/like/delete');
};

// --- Notifications ---
export const getNotificationsAPI = () => {
    return axios.get<IBackendRes<INotification[]>>('/notification');
};