import { View, Text, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { APP_COLOR } from "@/utils/constant";
import { orderStyles } from "@/styles/order.styles";
import { useOrder } from "@/hooks/useOrder";
import OrderItem from "@/components/order/OrderItem";

const OrderPage = () => {
    const { orderHistory, loading, page, loadMore } = useOrder();

    return (
        <SafeAreaView style={orderStyles.safeArea}>
            <View style={orderStyles.header}>
                <MaterialIcons name="history" size={24} color={APP_COLOR.ORANGE} />
                <Text style={orderStyles.headerText}>Lịch sử đơn hàng</Text>
            </View>

            {/* Thông tin trang hiện tại (Debug info) */}
            <View style={orderStyles.pageInfo}>
                <Text style={orderStyles.pageText}>Đang hiển thị đến trang: {page - 1}</Text>
            </View>

            <FlatList
                data={orderHistory}
                keyExtractor={(item, index) => `${item._id}-${index}`} // Đảm bảo key unique
                renderItem={({ item }) => <OrderItem item={item} />}
                contentContainerStyle={orderStyles.listContent}

                // Logic Load More chuẩn của FlatList
                onEndReached={loadMore}
                onEndReachedThreshold={0.5} // Load khi còn cách đáy 50% chiều cao màn hình

                ListFooterComponent={
                    loading ? (
                        <View style={orderStyles.loadingFooter}>
                            <ActivityIndicator size="small" color={APP_COLOR.ORANGE} />
                        </View>
                    ) : null
                }
                ListEmptyComponent={
                    !loading ? <Text style={{ textAlign: 'center', marginTop: 50 }}>Chưa có đơn hàng nào</Text> : null
                }
            />
        </SafeAreaView>
    );
};

export default OrderPage;