
import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";
import React from "react";
import ItemSingle from "./item.single";

interface IProps {
    menuItem: IBook;
    bookstore: IBookstore | null;
    isModal: boolean;
}

const ItemQuantity = (props: IProps) => {
    const { menuItem, bookstore, isModal } = props;
    const { cart, setCart } = useCurrentApp();

    const handlePressItem = (item: IBook, action: "MINUS" | "PLUS") => {

        if (item.options.length && isModal === false) {
            router.navigate({
                pathname: action === "PLUS" ? "/product/create.modal" : "/product/update.modal",
                params: { menuItemId: menuItem._id }
            })
        } else {

            if (bookstore?._id) {
                const total = action === "MINUS" ? -1 : 1;
                if (!cart[bookstore?._id]) {
                    //chưa tồn tại cửa hàng => khởi tạo cửa hàng
                    cart[bookstore._id] = {
                        sum: 0,
                        quantity: 0,
                        items: {}
                    }
                }

                //xử lý sản phẩm
                cart[bookstore._id].sum = cart[bookstore._id].sum + total * item.basePrice;
                cart[bookstore._id].quantity = cart[bookstore._id].quantity + total;

                //check sản phẩm đã từng thêm vào chưa
                if (!cart[bookstore._id].items[item._id]) {
                    cart[bookstore._id].items[item._id] = {
                        data: menuItem,
                        quantity: 0
                    };
                }

                const currentQuantity = cart[bookstore._id].items[item._id].quantity + total;
                cart[bookstore._id].items[item._id] = {
                    data: menuItem,
                    quantity: currentQuantity
                };

                if (currentQuantity <= 0) {
                    delete cart[bookstore._id].items[item._id];
                }
                setCart((prevState: any) => ({ ...prevState, ...cart }))

            }

        }
    }

    let showMinus = false;
    let quantity = 0;
    if (bookstore?._id) {
        const store = cart[bookstore?._id!];
        if (store?.items && store?.items[menuItem?._id]) {
            showMinus = true;
            quantity = store?.items[menuItem?._id].quantity;
        }
    }

    return (
        <ItemSingle
            menuItem={menuItem}
            handlePressItem={handlePressItem}
            showMinus={showMinus}
            quantity={quantity}
        />
    )
}

export default ItemQuantity;

