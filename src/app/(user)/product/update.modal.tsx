import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import AntDesign from '@expo/vector-icons/AntDesign';
import { APP_COLOR } from "@/utils/constant";
import { useCurrentApp } from "@/context/app.context";
import { useMemo } from "react";
import { getURLBaseBackend } from "@/utils/helper";
import { currencyFormatter } from "@/utils/format";
import { useCartAction } from "@/hooks/useCartAction"; // Hook mới

const UpdateModalPage = () => {
    const { bookstore, cart } = useCurrentApp();
    const { menuItemId } = useLocalSearchParams();
    const { updateCartQuantity } = useCartAction();

    const menuItem = useMemo(() => {
        if (!bookstore || !menuItemId) return null;
        for (const cat of bookstore.category) {
            const found = cat.book.find(b => b._id === menuItemId);
            if (found) return found;
        }
        return null;
    }, [bookstore, menuItemId]);

    // Lấy danh sách item đang có trong giỏ để hiển thị
    const updatedItems = useMemo(() => {
        if (!menuItem || !bookstore || !cart[bookstore._id]?.items[menuItem._id]) return [];
        const itemInCart = cart[bookstore._id].items[menuItem._id];
        const result = [];

        if (itemInCart.extra) {
            for (const [key, qty] of Object.entries(itemInCart.extra)) {
                if ((qty as number) > 0) {
                    const option = menuItem.options?.find(o => `${o.title}-${o.description}` === key);
                    result.push({
                        image: menuItem.image, title: menuItem.title, option: key,
                        price: menuItem.basePrice + (option?.additionalPrice ?? 0),
                        quantity: qty as number
                    });
                }
            }
        }
        return result;
    }, [cart, bookstore, menuItem]);

    const handleUpdate = (item: any, change: number) => {
        if (bookstore && menuItem) {
            updateCartQuantity(bookstore._id, menuItem._id, item.option, item.price, change);

            // Logic tự động đóng modal nếu hết sách (có thể tùy chỉnh)
            if (updatedItems.length === 1 && item.quantity + change <= 0) {
                setTimeout(() => router.back(), 50);
            }
        }
    };

    if (!menuItem) return null;

    return (
        <Animated.View entering={FadeIn} style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#00000040' }}>
            <Pressable onPress={() => router.back()} style={StyleSheet.absoluteFill} />
            <Animated.View entering={SlideInDown} style={{ height: '60%', backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <View style={{ padding: 15, borderBottomWidth: 1, borderColor: '#eee', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}><Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Chỉnh sửa số lượng</Text></View>
                    <AntDesign onPress={() => router.back()} name="close" size={24} color="grey" />
                </View>

                <ScrollView style={{ flex: 1 }}>
                    {updatedItems.length > 0 ? updatedItems.map((item, index) => (
                        <View key={index} style={{ flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' }}>
                            <Image source={{ uri: `${getURLBaseBackend()}/images/${item.image}` }} style={{ width: 60, height: 60, borderRadius: 8, marginRight: 15 }} />
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                                <Text style={{ color: 'gray', fontSize: 12 }}>{item.option}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, alignItems: 'center' }}>
                                    <Text style={{ color: APP_COLOR.ORANGE, fontWeight: 'bold' }}>{currencyFormatter(item.price)}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                        <AntDesign onPress={() => handleUpdate(item, -1)} name="minussquareo" size={26} color={APP_COLOR.ORANGE} />
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', minWidth: 20, textAlign: 'center' }}>{item.quantity}</Text>
                                        <AntDesign onPress={() => handleUpdate(item, 1)} name="plussquareo" size={26} color={APP_COLOR.ORANGE} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    )) : (
                        <View style={{ padding: 40, alignItems: 'center' }}><Text style={{ color: 'gray' }}>Đã xóa hết sản phẩm</Text></View>
                    )}
                </ScrollView>
            </Animated.View>
        </Animated.View>
    );
};

export default UpdateModalPage;