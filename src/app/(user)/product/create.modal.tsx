import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { APP_COLOR } from "@/utils/constant";
import { useCurrentApp } from "@/context/app.context";
import { useMemo, useState } from "react";
import { currencyFormatter } from "@/utils/format";
import ItemSingle from "@/components/example/bookstore/order/item.single";
import { useCartAction } from "@/hooks/useCartAction"; // Hook mới

const CreateModalPage = () => {
    const { bookstore } = useCurrentApp();
    const { menuItemId } = useLocalSearchParams();
    const { addToCart } = useCartAction(); // Sử dụng logic tách biệt

    const [quantity, setQuantity] = useState(1);
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Tìm món ăn tối ưu hơn
    const menuItem = useMemo(() => {
        if (!bookstore || !menuItemId) return null;
        for (const cat of bookstore.category) {
            const found = cat.book.find(b => b._id === menuItemId);
            if (found) return found;
        }
        return null;
    }, [bookstore, menuItemId]);

    const handlePressItem = (item: IBook, action: "MINUS" | "PLUS") => {
        if (action === "MINUS" && quantity === 1) return;
        setQuantity(prev => action === "MINUS" ? prev - 1 : prev + 1);
    };

    const handleAddCart = () => {
        if (bookstore?._id && menuItem) {
            addToCart(bookstore._id, menuItem, quantity, selectedIndex);
            router.back();
        }
    };

    if (!menuItem) return null;

    return (
        <Animated.View entering={FadeIn} style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "#00000040" }}>
            <Pressable onPress={() => router.back()} style={StyleSheet.absoluteFill} />
            <Animated.View entering={SlideInDown} style={{ height: "80%", width: "100%", backgroundColor: "white" }}>

                {/* Header */}
                <View style={{ borderBottomColor: "#eee", borderBottomWidth: 1, flexDirection: "row", padding: 10, alignItems: "center" }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: "center", fontWeight: "600", fontSize: 16 }}>Thêm sách mới</Text>
                    </View>
                    <AntDesign onPress={() => router.back()} name="close" size={24} color="grey" />
                </View>

                {/* Body */}
                <View style={{ borderBottomColor: "#eee", borderBottomWidth: 1 }}>
                    <ItemSingle menuItem={menuItem} showMinus={true} quantity={quantity} handlePressItem={handlePressItem} />
                </View>

                <View style={{ backgroundColor: "#eee", padding: 10 }}><Text>Lựa chọn (chọn 1)</Text></View>

                <ScrollView style={{ flex: 1 }}>
                    {menuItem.options?.map((item, index) => (
                        <Pressable key={index} onPress={() => setSelectedIndex(index)}
                            style={{ padding: 15, borderBottomWidth: 1, borderColor: "#eee", flexDirection: "row", alignItems: 'center' }}>
                            <View style={{ flex: 1, gap: 5 }}>
                                <Text>{item.title} - {item.description}</Text>
                                <Text style={{ color: APP_COLOR.ORANGE }}>{currencyFormatter(item.additionalPrice)}</Text>
                            </View>
                            {index === selectedIndex && <Feather name="check" size={20} color={APP_COLOR.ORANGE} />}
                        </Pressable>
                    ))}
                </ScrollView>

                {/* Footer */}
                <View style={{ padding: 10, marginBottom: 20 }}>
                    <Pressable onPress={handleAddCart} style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1, padding: 12, backgroundColor: APP_COLOR.ORANGE, borderRadius: 3
                    })}>
                        <Text style={{ textAlign: "center", color: "white", fontWeight: 'bold' }}>
                            Thêm vào giỏ - {currencyFormatter(quantity * (menuItem.basePrice + menuItem.options[selectedIndex].additionalPrice))}
                        </Text>
                    </Pressable>
                </View>
            </Animated.View>
        </Animated.View>
    );
};

export default CreateModalPage;