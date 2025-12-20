import AsyncStorage from "@react-native-async-storage/async-storage"
import { Platform } from "react-native"

// Xử lý dữ liệu hiển thị (Transformer)
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

// Check URL Base (Tách ra để tái sử dụng nếu cần)
export const getURLBaseBackend = () => {
    return Platform.OS === "android"
        ? process.env.EXPO_PUBLIC_ANDROID_API_URL
        : process.env.EXPO_PUBLIC_API_URL;
};

// Debug Async Storage
export const printAsyncStorage = () => {
    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys!, (error, stores) => {
            let asyncStorage: any = {}
            stores?.map((result, i, store) => {
                asyncStorage[store[i][0]] = store[i][1]
            });
            console.log("LOG ASYNC STORAGE:", JSON.stringify(asyncStorage, null, 2));
        });
    });
};