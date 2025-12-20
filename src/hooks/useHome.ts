import { useEffect } from "react";
import { router } from "expo-router";

export const useHome = () => {
    const collections = [
        { key: 1, name: "Top Nhà Sách Rating 5* tuần này", description: "Gợi ý nhà sách được độc giả đánh giá 5*", refAPI: "top-rating" },
        { key: 2, name: "Nhà Sách Mới", description: "Khám phá ngay hàng loạt nhà sách mới", refAPI: "newcommer" },
        { key: 3, name: "Mua Sách Thỏa Thích, Freeship 0Đ", description: "Sách văn học, sách kinh doanh, sách kỹ năng...", refAPI: "top-freeship" },
    ];

    useEffect(() => {
        // Có thể thêm điều kiện check nếu cần hiển thị 1 lần duy nhất
        router.push("/(auth)/popup.sale");
    }, []);

    return { collections };
};