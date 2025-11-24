import { useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    StyleSheet,
    Pressable,
    ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
    currencyFormatter,
    getOrderHistoryAPI,
    getURLBaseBackend,
} from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";


const LIMIT = 10;


const OrderPage = () => {
    const [orderHistory, setOrderHistory] = useState<IOrderHistory[]>([]);

    //Trước cải tiến
    // useEffect(() => {
    //     const fetchOrderHistory = async () => {
    //         const start = Date.now(); // bắt đầu đo thời gian


    //         const res = await getOrderHistoryAPI();


    //         const end = Date.now(); // kết thúc đo thời gian


    //         console.log("⏱ Thời gian tải dữ liệu đơn hàng (frontend):", end - start, "ms");


    //         if (res.data) {
    //             setOrderHistory(res.data);
    //         }


    //         // Optional: nếu bạn có backend trả về `duration`, log cả 2 để so sánh
    //         if (res.duration) {
    //             console.log("⏱ Thời gian xử lý ở backend:", res.duration);
    //         }
    //     };


    //     fetchOrderHistory();
    // }, []);

    //Sau cải tiến
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    //Sau cải tiến
    const fetchOrders = async () => {
        if (loading || !hasMore) return;


        const frontendStart = performance.now();
        setLoading(true);


        try {
            const res = await getOrderHistoryAPI(page, LIMIT);
            const frontendEnd = performance.now();


            if (res.data) {
                const newOrders = res.data;
                setOrderHistory((prev) => [...prev, ...newOrders]);


                if (newOrders.length < LIMIT) setHasMore(false);
                else setPage((prev) => prev + 1);


                const backendDuration = parseInt(res.duration || "0");
                const frontendDuration = frontendEnd - frontendStart;
                const networkAndRender = frontendDuration - backendDuration;


                console.log(`⏱ Backend xử lý: ${backendDuration}ms`);
                console.log(`📡 Network + Render: ${networkAndRender.toFixed(0)}ms`);
                console.log(`🧩 Tổng thời gian: ${frontendDuration.toFixed(0)}ms`);
            }
        } catch (error) {
            console.error("❌ Fetch order history failed:", error);
        }


        setLoading(false);
    };


    useEffect(() => {
        fetchOrders();
    }, []);


    const handleScroll = ({ nativeEvent }: any) => {
        const isBottom =
            nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
            nativeEvent.contentSize.height - 20;
        if (isBottom) fetchOrders();
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <MaterialIcons name="history" size={24} color={APP_COLOR.ORANGE} />
                    <Text style={styles.headerText}>Lịch sử đơn hàng</Text>
                </View>


                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.orderList}
                    onScroll={handleScroll}
                    scrollEventThrottle={400}
                >
                    {orderHistory.map((item, index) => (
                        <Pressable key={index} style={styles.orderItem}>
                            <Image
                                source={{
                                    uri: `${getURLBaseBackend()}/images/restaurant/${item.bookstore.image}`,
                                }}
                                style={styles.bookstoreImage}
                            />
                            <View style={styles.orderDetails}>
                                <Text style={styles.bookstoreName}>{item.bookstore.name}</Text>
                                <Text style={styles.bookstoreAddress}>{item.bookstore.address}</Text>
                                <Text style={styles.orderPrice}>
                                    Tổng tiền: {currencyFormatter(item.totalPrice)}
                                </Text>
                                <Text style={styles.orderPrice}>
                                    Số lượng: {item.totalQuantity}
                                </Text>
                                <Text style={styles.orderStatus}>Trạng thái: ORDERED</Text>
                            </View>
                        </Pressable>
                    ))}


                    {loading && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color={APP_COLOR.ORANGE} />
                        </View>
                    )}


                    {/* ✅ Hiển thị số trang */}
                    {!loading && (
                        <View style={styles.pageIndicator}>
                            <Text style={{ color: APP_COLOR.ORANGE }}>Trang hiện tại: {page - 1}</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        padding: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: APP_COLOR.ORANGE,
        marginLeft: 10,
    },
    orderList: {
        paddingBottom: 20,
    },
    orderItem: {
        backgroundColor: "#fff",
        borderRadius: 10,
        margin: 10,
        padding: 15,
        flexDirection: "row",
        gap: 10,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    bookstoreImage: {
        height: 100,
        width: 100,
        borderRadius: 10,
    },
    orderDetails: {
        flex: 1,
        justifyContent: "center",
    },
    bookstoreName: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold",
    },
    bookstoreAddress: {
        fontSize: 14,
        color: "#666",
    },
    orderPrice: {
        fontSize: 16,
        color: APP_COLOR.ORANGE,
    },
    orderStatus: {
        fontSize: 14,
        color: "#666",
    },
    loadingContainer: {
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    pageIndicator: {
        padding: 10,
        alignItems: "center",
    },
});


export default OrderPage;


