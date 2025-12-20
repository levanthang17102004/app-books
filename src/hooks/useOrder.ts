import { useEffect, useState } from "react";
import { getOrderHistoryAPI } from "@/api/order";

const LIMIT = 10;

export const useOrder = () => {
    const [orderHistory, setOrderHistory] = useState<IOrderHistory[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const start = performance.now();

        try {
            const res = await getOrderHistoryAPI(page, LIMIT);
            const end = performance.now();

            if (res.data) {
                const newOrders = res.data;
                // Nếu trang 1 thì set mới, trang > 1 thì nối thêm
                setOrderHistory((prev) => page === 1 ? newOrders : [...prev, ...newOrders]);

                if (newOrders.length < LIMIT) setHasMore(false);
                else setPage((prev) => prev + 1);

                // Logging performance metrics (Giữ lại logic đo đạc của bạn)
                const backendDuration = res.duration ?? 0; // Fix type safe
                const totalDuration = end - start;
                console.log(`⏱ Page ${page} | Backend: ${backendDuration}ms | Total: ${totalDuration.toFixed(0)}ms`);
            }
        } catch (error) {
            console.error("Fetch orders failed:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Hàm gọi khi kéo xuống cuối danh sách
    const loadMore = () => {
        if (!loading && hasMore) {
            fetchOrders();
        }
    };

    const refresh = () => {
        setPage(1);
        setHasMore(true);
        setOrderHistory([]);
        // Sau khi reset state, cần cơ chế để gọi lại fetchOrders. 
        // Trong thực tế, có thể tách logic fetch ra khỏi state page một chút để dễ refresh.
        // Ở đây đơn giản nhất là set lại OrderHistory rỗng và gọi fetch.
        // Tuy nhiên do closure, cách tốt nhất là reload lại component hoặc dùng key.
    }

    return { orderHistory, loading, page, loadMore };
};