import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import { APP_COLOR } from "@/utils/constant";
import { useCurrentApp } from "@/context/app.context";
import ItemQuantity from "@/components/example/bookstore/order/item.quantity";
import { useEffect, useState } from "react";
import { currencyFormatter } from "@/utils/api";
import Feather from "@expo/vector-icons/Feather";
import ItemSingle from "@/components/example/bookstore/order/item.single";

const CreateModalPage = () => {
    const { bookstore, cart, setCart } = useCurrentApp();
    const { menuItemId } = useLocalSearchParams();

    const [menuItem, setMenuItem] = useState<IBook | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (bookstore && menuItemId) {
            for (let i = 0; i < bookstore.category.length; i++) {
                const category = bookstore.category[i];
                let check = false;
                for (let j = 0; j < category.book.length; j++) {
                    if (category.book[j]._id === menuItemId) {
                        check = true;
                        setMenuItem(category.book[j]);
                        break;
                    }
                }
                if (check) break;
            }
        }
    }, [bookstore, menuItemId]);

    const handlePressItem = (item: IBook, action: "MINUS" | "PLUS") => {
        if (action === "MINUS" && quantity === 1) return;
        const total = action === "MINUS" ? -1 : 1;
        setQuantity((prevQuantity: number) => prevQuantity + total);
    };

    const handleAddCart = () => {
        if (bookstore?._id && menuItem) {
            const total = quantity;
            const item = menuItem;
            const option = menuItem.options[selectedIndex];
            const keyOption = `${option.title}-${option.description}`;

            // Khởi tạo cửa hàng nếu chưa tồn tại
            if (!cart[bookstore._id]) {
                cart[bookstore._id] = {
                    sum: 0,
                    quantity: 0,
                    items: {},
                };
            }

            // Lấy sản phẩm hiện tại hoặc khởi tạo
            const currentItem = cart[bookstore._id].items[item._id] || {
                data: menuItem,
                quantity: 0,
                extra: {},
            };

            // Cập nhật số lượng sản phẩm và lựa chọn
            const currentQuantity = (currentItem.quantity || 0) + total;
            const currentExtraQuantity = ((currentItem.extra?.[keyOption] || 0) + total);

            // Cập nhật hoặc xóa sản phẩm
            if (currentQuantity > 0) {
                cart[bookstore._id].items[item._id] = {
                    ...currentItem,
                    quantity: currentQuantity,
                    extra: {
                        ...currentItem.extra, // Dùng spread operator để sao chép các giá trị hiện tại
                        [keyOption]: currentExtraQuantity > 0 ? currentExtraQuantity : 0, // Nếu nhỏ hơn 0, gán thành 0
                    },
                };

                // Loại bỏ các key có giá trị là 0 để giữ dữ liệu gọn gàng
                cart[bookstore._id].items[item._id].extra = Object.fromEntries(
                    Object.entries(cart[bookstore._id].items[item._id].extra!).filter(
                        ([, value]) => value > 0
                    )
                );
            } else {
                delete cart[bookstore._id].items[item._id];
            }


            // Cập nhật tổng giá trị và số lượng
            cart[bookstore._id].sum += total * (item.basePrice + option.additionalPrice);
            cart[bookstore._id].quantity += total;

            // Cập nhật giỏ hàng
            setCart((prevState: any) => ({
                ...prevState,
                [bookstore._id]: {
                    ...prevState[bookstore._id],
                    ...cart[bookstore._id],
                },
            }));

            router.back();
        }
    };

    return (
        <Animated.View
            entering={FadeIn}
            style={{
                flex: 1,
                justifyContent: "flex-end",
                backgroundColor: "#00000040",
            }}
        >
            <Pressable onPress={() => router.back()} style={StyleSheet.absoluteFill} />

            <Animated.View
                entering={SlideInDown}
                style={{
                    height: "80%",
                    width: "100%",
                    backgroundColor: "white",
                }}
            >
                <View
                    style={{
                        borderBottomColor: "#eee",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        gap: 10,
                        padding: 10,
                        alignItems: "center",
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontWeight: "600",
                                fontSize: 16,
                            }}
                        >
                            Thêm món mới
                        </Text>
                    </View>
                    <AntDesign onPress={() => router.back()} name="close" size={24} color="grey" />
                </View>

                <View
                    style={{
                        borderBottomColor: "#eee",
                        borderBottomWidth: 1,
                    }}
                >
                    {menuItem && (
                        <ItemSingle
                            menuItem={menuItem}
                            showMinus={true}
                            quantity={quantity}
                            handlePressItem={handlePressItem}
                        />
                    )}
                </View>

                <View
                    style={{
                        backgroundColor: "#eee",
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                    }}
                >
                    <Text>Lựa chọn (chọn 1)</Text>
                </View>

                <ScrollView
                    style={{
                        flex: 1,
                        borderBottomColor: "#eee",
                        borderBottomWidth: 1,
                    }}
                >
                    {menuItem?.options?.map((item, index) => (
                        <View
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 15,
                                borderBottomWidth: 1,
                                borderBottomColor: "#eee",
                                flexDirection: "row",
                            }}
                            key={index}
                        >
                            <View style={{ gap: 5, flex: 1 }}>
                                <Text>
                                    {item.title} - {item.description}
                                </Text>
                                <Text style={{ color: APP_COLOR.ORANGE }}>
                                    {currencyFormatter(item.additionalPrice)}
                                </Text>
                            </View>
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Pressable
                                    onPress={() => setSelectedIndex(index)}
                                    style={({ pressed }) => ({
                                        opacity: pressed === true ? 0.5 : 1,
                                        alignSelf: "flex-start",
                                        padding: 2,
                                        borderRadius: 2,
                                        backgroundColor: index === selectedIndex ? APP_COLOR.ORANGE : "white",
                                        borderColor: index === selectedIndex ? APP_COLOR.ORANGE : "grey",
                                        borderWidth: 1,
                                    })}
                                >
                                    <Feather name="check" size={15} color="white" />
                                </Pressable>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <View
                    style={{
                        marginBottom: 20,
                        marginTop: 10,
                        marginHorizontal: 10,
                        justifyContent: "flex-end",
                    }}
                >
                    <Pressable
                        onPress={handleAddCart}
                        style={({ pressed }) => ({
                            opacity: pressed === true ? 0.5 : 1,
                            padding: 10,
                            backgroundColor: APP_COLOR.ORANGE,
                            borderRadius: 3,
                        })}
                    >
                        <Text style={{ textAlign: "center", color: "white" }}>Thêm vào giỏ hàng</Text>
                    </Pressable>
                </View>
            </Animated.View>
        </Animated.View>
    );
};

export default CreateModalPage;
