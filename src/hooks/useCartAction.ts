import { useCurrentApp } from "@/context/app.context";

export const useCartAction = () => {
    const { setCart } = useCurrentApp();

    // 1. Logic Thêm vào giỏ
    const addToCart = (bookstoreId: string, item: IBook, quantity: number, optionIndex: number) => {
        const option = item.options[optionIndex];
        const keyOption = `${option.title}-${option.description}`;
        const finalPrice = item.basePrice + option.additionalPrice;

        setCart((prevCart: any) => {
            const newCart = { ...prevCart };

            // Khởi tạo store và item nếu chưa có
            if (!newCart[bookstoreId]) newCart[bookstoreId] = { sum: 0, quantity: 0, items: {} };
            if (!newCart[bookstoreId].items[item._id]) {
                newCart[bookstoreId].items[item._id] = { data: item, quantity: 0, extra: {} };
            }

            const currentStore = newCart[bookstoreId];
            const currentItem = currentStore.items[item._id];

            // Cập nhật số lượng
            currentItem.quantity += quantity;
            currentItem.extra[keyOption] = (currentItem.extra[keyOption] || 0) + quantity;

            // Cập nhật tổng tiền store
            currentStore.sum += quantity * finalPrice;
            currentStore.quantity += quantity;

            return newCart;
        });
    };

    // 2. Logic Cập nhật số lượng (Tăng/Giảm)
    const updateCartQuantity = (bookstoreId: string, itemId: string, optionKey: string, price: number, change: number) => {
        setCart((prevCart: any) => {
            const newCart = { ...prevCart };
            const store = newCart[bookstoreId];
            if (!store || !store.items[itemId]) return prevCart;

            const item = store.items[itemId];

            // Cập nhật số lượng option cụ thể
            const newQty = (item.extra[optionKey] || 0) + change;
            if (newQty <= 0) delete item.extra[optionKey];
            else item.extra[optionKey] = newQty;

            // Cập nhật tổng
            item.quantity += change;
            store.quantity += change;
            store.sum += (change * price);

            // Dọn dẹp rác (item rỗng, store rỗng)
            if (item.quantity <= 0 || Object.keys(item.extra).length === 0) {
                delete store.items[itemId];
            }
            if (store.quantity <= 0) {
                delete newCart[bookstoreId];
            }

            return newCart;
        });
    };

    // 3. Logic Xóa giỏ hàng của 1 cửa hàng (khi đặt đơn xong)
    const clearCartStore = (bookstoreId: string) => {
        setCart((prev: any) => {
            const next = { ...prev };
            delete next[bookstoreId];
            return next;
        });
    };

    return { addToCart, updateCartQuantity, clearCartStore };
};