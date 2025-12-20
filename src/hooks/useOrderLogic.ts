import { useMemo } from "react";
import { useCurrentApp } from "@/context/app.context";

export const useOrderLogic = () => {
    const { cart, bookstore } = useCurrentApp();

    // Chuyển đổi dữ liệu từ Object nested sang Array phẳng để hiển thị và gửi API
    const orderItems = useMemo(() => {
        if (!cart || !bookstore?._id || !cart[bookstore._id]?.items) return [];

        const result: any[] = [];
        const storeItems = cart[bookstore._id].items;

        Object.values(storeItems).forEach((item: any) => {
            if (item.extra) {
                Object.entries(item.extra).forEach(([key, qty]: [string, any]) => {
                    // Tìm lại option để lấy giá chính xác
                    const option = item.data.options?.find((o: any) => `${o.title}-${o.description}` === key);
                    const addPrice = option?.additionalPrice ?? 0;

                    result.push({
                        image: item.data.image,
                        title: item.data.title,
                        option: key,
                        price: item.data.basePrice + addPrice,
                        quantity: qty
                    });
                });
            }
        });
        return result;
    }, [cart, bookstore]);

    const cartInfo = bookstore?._id ? cart?.[bookstore._id] : null;

    return { orderItems, cartInfo, bookstore };
};