import { useEffect, useState } from "react";
import { getFavoriteBookstoreAPI } from "../api/user";

// 1. KHAI BÁO INTERFACE
// Định nghĩa cấu trúc của đối tượng sách. 
// Bắt buộc phải có 'quantity' vì bạn dùng nó trong logic filter.
export interface IBook {
    _id: string;
    category: string;
    title: string;
    description: string;
    basePrice: number,
    image: string;
    options: {
        title: string;
        description: string;
        additionalPrice: number;
    }[],
    createdAt: Date;
    updatedAt: Date;
}
export interface ICategory {
    _id: string;
    bookstore: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    book: IBook[]
}
export interface IBookstore {
    _id: string,
    name: string,
    phone: string,
    address: string,
    email: string,
    rating: number,
    image: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,

    category: ICategory[];
    isLike: boolean;
}
export interface ILikeBookstore {
    _id: string;
    bookstore: IBookstore;
    user: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

export const useFavorite = () => {
    // 2. Sử dụng interface đã khai báo cho State
    const [favoriteBookstores, setFavoriteBookstores] = useState<ILikeBookstore[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const fetchFavoriteBookstores = async () => {
        const res = await getFavoriteBookstoreAPI();

        if (res.data) {
            // 3. Ép kiểu dữ liệu (Type Assertion)
            // Báo cho TS biết: "Dữ liệu này chắc chắn là mảng các ILikeBookstore"
            const data = res.data as ILikeBookstore[];

            // Lúc này TS đã hiểu 'item' là ILikeBookstore, nên nó biết 'quantity' là số
            const filteredBookstores = data.filter(item => item.quantity % 2 !== 0);
            setFavoriteBookstores(filteredBookstores);
        }
    };

    useEffect(() => {
        fetchFavoriteBookstores();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchFavoriteBookstores();
        setRefreshing(false);
    };

    return { favoriteBookstores, refreshing, onRefresh };
};