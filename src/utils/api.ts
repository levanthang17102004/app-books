import axios from "@/utils/axios.customize"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Platform } from "react-native"

export const registerAPI = (email: string, password: string, name: string) => {
    const url = `/auth/register`
    return axios.post<IBackendRes<IRegister>>(url, { email, password, name })
}

export const verifyCodeAPI = (email: string, code: string) => {
    const url = `/auth/verification`
    return axios.post<IBackendRes<IRegister>>(url, { email, code })
}

export const resendCodeAPI = (email: string, code: string) => {
    const url = `/auth/register`
    return axios.post<IBackendRes<IRegister>>(url, { email, code })
}

export const loginAPI = (email: string, password: string) => {
    const url = `/auth/login`
    return axios.post<IBackendRes<IUserLogin>>(url, { email, password })
}

export const resetPasswordAPI = (email: string) => {
    const url = `/auth/forgotPassword`
    return axios.post<IBackendRes<IRegister>>(url, { email })
}

export const getAccountAPI = () => {
    const url = `/auth/get-account`
    return axios.get<IBackendRes<IRegister>>(url)
}

export const getTopBookstoreAPI = (ref: string) => {
    const url = `/bookstore/${ref}`
    return axios.post<IBackendRes<ITopBookstore[]>>(url, {}, {
        headers: {delay: 3000}
    })
}

export const getBookstoreByIdAPI = (id: string) => {
    const url = `/bookstore/${id}`    
    return axios.get<IBackendRes<IBookstore>>(url, {
        headers: {delay: 3000}
    })
}

export const getURLBaseBackend = () => {
    const backend = Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ANDROID_API_URL
      : process.env.EXPO_PUBLIC_IOS_API_URL;
  
    return backend;
  };

//check async storage
export const printAsyncStorage = () => {
    AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys!, (error, stores) => {
    let asyncStorage: any = {}
    stores?.map((result, i, store) => {
    asyncStorage[store[i][0]] = store[i][1]
});
    console.log(JSON.stringify(asyncStorage, null, 2));
});
 });
};
    

export const processDataBookstoreMenu = (bookstore: IBookstore | null) => {
    if (!bookstore) return [];
    return bookstore?.category?.map((category, index) => {
        return {
            index,
            key: category._id,
            title: category.title,
            data: category.book
    }
})
}

export const currencyFormatter = (value: any) => {
    const options = {
        signicantDigits: 2,
        thousandsSeparator: '.',
        decimalSeparator: ',',
        symbol: 'đ'
    }
    if (typeof value !== 'number') value = 0.0
        value = value.toFixed(options.signicantDigits)
    const [currency, decimal] = value.split('.')
        return `${currency.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            options.thousandsSeparator
        )} ${options.symbol}`
}
    

export const placeOrderAPI = (data: any) => {
    const url = '/order';
    return axios.post<IBackendRes<IUserLogin>>(url, { ...data });
  };


//Trước cải tiến
// export const getOrderHistoryAPI = () => {
//     const url = '/order';
//     return axios.get<IBackendRes<IOrderHistory[]>>(url);
// };

//Sau cải tiến
export const getOrderHistoryAPI = (page: number = 1, limit: number = 10) => {
    const url = `/order?page=${page}&limit=${limit}`;
    return axios.get<IBackendRes<IOrderHistory[]>>(url);
  };


  export const updateUserAPI = (_id: string, name: string, phone: string) => {
    const url = '/user';
    return axios.patch<IBackendRes<IUserLogin>>(url, { _id, name, phone });
};

export const likeBookstoreAPI = (bookstore: string, quantity: number) => {
    const url = '/like';
    return axios.post<IBackendRes<IUserLogin>>(url, { bookstore, quantity });
};

export const getFavoriteBookstoreAPI = () => {
    const url = '/like';
    return axios.get<IBackendRes<ILikeBookstore[]>>(url);
};

export const deleteLikeBookstoreAPI = () => {
    const url = '/like/delete';
    return axios.post<IBackendRes<ILikeBookstore>>(url);
};

export const getNotificationsAPI = () => {
    const url = '/notification';
    return axios.get<IBackendRes<INotification[]>>(url);
};

export const changePasswordAPI = (currentPassword: string, newPassword: string) => {
    const url = '/user/change-password';
    return axios.post(url, { currentPassword, newPassword });
};

export const getBookstoreByNameAPI = (name: string) => {
    const url = `/bookstore?current=1&pageSize=10&name=${name}`;
    return axios.get<IBackendRes<IModelPaginate<IBookstore>>>(url);
  };


  export const filterBookstoreAPI = (query: string) => {
    const url = `/bookstore?${query}`;
    return axios.get<IBackendRes<IModelPaginate<IBookstore>>>(url);
  };
