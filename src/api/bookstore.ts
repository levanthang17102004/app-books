import axios from "@/utils/axios.customize"

export const getTopBookstoreAPI = (ref: string) => {
    return axios.post<IBackendRes<ITopBookstore[]>>(`/bookstore/${ref}`, {}, {
        headers: { delay: 3000 }
    })
}

export const getBookstoreByIdAPI = (id: string) => {
    return axios.get<IBackendRes<IBookstore>>(`/bookstore/${id}`, {
        headers: { delay: 3000 }
    })
}

export const getBookstoreByNameAPI = (name: string) => {
    return axios.get<IBackendRes<IModelPaginate<IBookstore>>>(
        `/bookstore?current=1&pageSize=10&name=${name}`
    );
};

export const filterBookstoreAPI = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IBookstore>>>(`/bookstore?${query}`);
};