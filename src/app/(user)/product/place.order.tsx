import HeaderHome from "@/components/home/header.home";
import { currencyFormatter } from "@/utils/format";
import { getURLBaseBackend } from "@/utils/helper";
import { placeOrderAPI } from "@/api/order";
import { APP_COLOR } from "@/utils/constant";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Toast from "react-native-root-toast";
import { useOrderLogic } from "@/hooks/useOrderLogic"; // Hook logic
import { useCartAction } from "@/hooks/useCartAction"; // Hook logic

const PlaceOrderPage = () => {
    const { orderItems, cartInfo, bookstore } = useOrderLogic();
    const { clearCartStore } = useCartAction();

    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'paypal'>('cash');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePlaceOrder = async () => {
        if (!bookstore || !cartInfo) return;
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const data = {
                bookstore: bookstore._id,
                totalPrice: cartInfo.sum,
                totalQuantity: cartInfo.quantity,
                detail: orderItems,
                type: paymentMethod.toUpperCase() // Đã thêm type
            };

            const res = await placeOrderAPI(data);
            if (res.data) {
                Toast.show("Đặt hàng thành công!", { backgroundColor: APP_COLOR.ORANGE, textColor: 'white' });
                clearCartStore(bookstore._id);
                router.navigate("/");
            } else {
                const m = Array.isArray(res.message) ? res.message[0] : res.message;
                Toast.show(m, { backgroundColor: APP_COLOR.ORANGE, textColor: 'white' });
            }
        } catch (error) {
            console.error(error);
            Toast.show("Lỗi hệ thống!", { backgroundColor: "red", textColor: 'white' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!cartInfo) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Giỏ hàng trống</Text></View>;

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#eee' }}><HeaderHome /></View>
            <View style={{ padding: 10, backgroundColor: '#f9f9f9' }}><Text style={{ fontWeight: "600" }}>{bookstore?.name}</Text></View>

            <ScrollView style={{ flex: 1, padding: 10 }}>
                {orderItems.map((item, index) => (
                    <View key={index} style={{ flexDirection: "row", gap: 10, paddingVertical: 10, borderBottomWidth: 1, borderColor: "#eee" }}>
                        <Image source={{ uri: `${getURLBaseBackend()}/images/menu-item/${item.image}` }} style={{ width: 50, height: 50, borderRadius: 5 }} />
                        <Text style={{ fontWeight: "bold", color: APP_COLOR.ORANGE, alignSelf: 'center' }}>{item.quantity}x</Text>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500' }}>{item.title}</Text>
                            <Text style={{ fontSize: 12, color: 'gray' }}>{item.option}</Text>
                        </View>
                        <Text style={{ alignSelf: 'center' }}>{currencyFormatter(item.price * item.quantity)}</Text>
                    </View>
                ))}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={{ color: 'gray' }}>Tổng cộng ({cartInfo.quantity} món)</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: APP_COLOR.ORANGE }}>{currencyFormatter(cartInfo.sum)}</Text>
                </View>
            </ScrollView>

            <View style={{ padding: 10, borderTopWidth: 10, borderColor: '#f5f5f5' }}>
                <Text style={{ marginBottom: 10, fontWeight: '600' }}>Thanh toán:</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    {['cash', 'paypal'].map((m) => (
                        <Pressable key={m} onPress={() => setPaymentMethod(m as any)}
                            style={{
                                flex: 1, padding: 10, borderWidth: 1, borderRadius: 5,
                                borderColor: APP_COLOR.ORANGE, backgroundColor: paymentMethod === m ? APP_COLOR.ORANGE : 'white'
                            }}>
                            <Text style={{ textAlign: 'center', color: paymentMethod === m ? 'white' : APP_COLOR.ORANGE, fontWeight: 'bold' }}>
                                {m === 'cash' ? 'Tiền mặt' : 'PayPal'}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>

            <View style={{ padding: 10 }}>
                <Pressable onPress={handlePlaceOrder} disabled={isSubmitting}
                    style={{ padding: 15, backgroundColor: isSubmitting ? 'gray' : APP_COLOR.ORANGE, borderRadius: 5 }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                        {isSubmitting ? 'Đang xử lý...' : `Đặt đơn - ${currencyFormatter(cartInfo.sum)}`}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};
export default PlaceOrderPage;