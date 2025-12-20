import { useState, useEffect, useCallback } from "react";
import debounce from "debounce";
import { filterBookstoreAPI, getBookstoreByNameAPI } from "@/api/bookstore";

export const useBookstore = () => {
    const [bookstores, setBookstores] = useState<IBookstore[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize] = useState<number>(5);
    const [isSearching, setIsSearching] = useState<boolean>(false); // Để biết đang ở chế độ search hay list thường

    // 1. Hàm load dữ liệu phân trang (Mặc định)
    const fetchBookstores = async (page: number) => {
        setLoading(true);
        try {
            const res = await filterBookstoreAPI(`current=${page}&pageSize=${pageSize}`);

            // --- FIX LỖI UNDEFINED Ở ĐÂY ---
            // Nếu res.data null -> trả về undefined -> lấy vế phải là mảng rỗng []
            const results = res.data?.results ?? [];

            if (page === 1) {
                setBookstores(results);
            } else {
                setBookstores((prev) => [...prev, ...results]);
            }
        } catch (error) {
            console.log("Error fetching bookstores:", error);
        } finally {
            setLoading(false);
        }
    };

    // 2. Hàm load dữ liệu tìm kiếm
    const fetchSearchBookstores = async (query: string) => {
        setLoading(true);
        try {
            const res = await getBookstoreByNameAPI(query);

            // --- FIX LỖI UNDEFINED Ở ĐÂY ---
            const results = res.data?.results ?? [];

            // Khi search, ta replace toàn bộ list, không nối thêm
            setBookstores(results);
        } catch (error) {
            console.log("Error searching:", error);
        } finally {
            setLoading(false);
        }
    };

    // 3. Effect khởi tạo (Chạy 1 lần khi vào trang)
    useEffect(() => {
        fetchBookstores(1);
    }, []);

    // 4. Effect khi load more (Chỉ chạy khi page thay đổi và không phải đang search)
    useEffect(() => {
        if (currentPage > 1 && !isSearching) {
            fetchBookstores(currentPage);
        }
    }, [currentPage, isSearching]);

    // 5. Xử lý Search (Debounce)
    const handleSearch = useCallback(
        debounce((text: string) => {
            if (text.trim()) {
                setIsSearching(true);
                fetchSearchBookstores(text);
            } else {
                // Nếu xóa hết text, quay về chế độ list thường
                setIsSearching(false);
                setCurrentPage(1); // Reset page về 1
                fetchBookstores(1); // Load lại trang 1
            }
        }, 500), // Delay 500ms
        []
    );

    // 6. Xử lý Load More (Cuộn xuống dưới cùng)
    const handleLoadMore = () => {
        // Chỉ load more khi không search và không đang loading
        if (!isSearching && !loading) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    // 7. Xử lý Pull to Refresh (Kéo để làm mới)
    const refreshData = () => {
        setIsSearching(false); // Tắt chế độ tìm kiếm
        setCurrentPage(1);     // Reset về trang 1
        fetchBookstores(1);    // Gọi API lại ngay lập tức
    };

    return {
        bookstores,
        loading,
        handleSearch,
        handleLoadMore,
        refreshData
    };
};