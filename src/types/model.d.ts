
export { };

declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: string | string[];
        statusCode: number | string;
        data?: T;
        duration?: string;
    }
    interface IRegister {
        id: string
    }

    interface IUserLogin {
        user: {
            id: string,
            email: string,
            fcmTokens: [],
            photo: string,
            phone: string,
            name: string,
            address: string
        };
        accesstoken: string
    }

    interface ITopBookstore {
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
    }

    interface IBookstore {
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

    interface ICategory {
        _id: string;
        bookstore: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        book: IBook[]
    }
    interface IBook {
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

    interface ICart {
        [key: string]: {
            sum: number;
            quantity: number;
            items: {
                [key: string]: {
                    quantity: number;
                    data: IBook;
                    extra?: {
                        [key: string]: number;
                    }
                }
            }
        }
    }

    interface IOrderHistory {
        _id: string;
        bookstore: IBookstore;
        user: string;
        status: string;
        totalPrice: number;
        totalQuantity: number;
        orderTime: Date;
        detail: {
            image: string;
            title: string;
            option: string;
            price: number;
            quantity: number;
        }[]
        createdAt: Date;
        updatedAt: Date;
    }

    interface INotification {
        _id: string;
        bookstore: IBookstore;
        message: string;
        user: string;
        status: string;
        detail: {
            image: string;
            title: string;
        }[]
        createdAt: Date;
        updatedAt: Date;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        results: T[];
    }


    interface ILikeBookstore {
        _id: string;
        bookstore: IBookstore;
        user: string;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
    }

    interface IRegister {
        id: string
    }
}