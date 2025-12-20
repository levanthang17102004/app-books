import { APP_COLOR } from "@/utils/constant";
import { Pressable, Text, View, StyleSheet } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { currencyFormatter } from "@/utils/format";
import { useCurrentApp } from "@/context/app.context";
import React from "react";
import { router } from "expo-router";

interface IProps {
    bookstore: IBookstore | null;
}

const StickyFooter = (props: IProps) => {

    const { cart, setCart } = useCurrentApp()
    const { bookstore } = props;

    const getSum = () => {
        if (bookstore && cart[bookstore._id]) {
            return cart[bookstore._id].sum;
        }
        return 0;
    };



    return (
        <>
            {getSum() === 0 ? <></> :

                <View style={styles.container}>

                    <View style={styles.cartSection}>
                        <Pressable style={styles.cartIconContainer} onPress={() => alert("cart")}>
                            <FontAwesome5 name="shopping-basket" size={26} color={APP_COLOR.ORANGE} />
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>
                                    {bookstore && cart && cart[bookstore?._id] && cart[bookstore?._id]["quantity"] &&
                                        <Text>
                                            {cart[bookstore?._id]["quantity"]}
                                        </Text>
                                    }
                                </Text>
                            </View>
                        </Pressable>
                        <View style={styles.totalPriceContainer}>
                            <Text style={styles.totalPriceText}>{currencyFormatter(getSum())}</Text>
                        </View>
                    </View>


                    <Pressable style={styles.deliveryButton} onPress={() => router.navigate("/product/place.order")}>
                        <Text style={styles.deliveryButtonText}>Giao hàng</Text>
                    </Pressable>
                </View>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: APP_COLOR.GREY,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 10,
        height: 70,
    },
    cartSection: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
    },
    cartIconContainer: {
        position: "relative",
        marginRight: 20,
    },
    badge: {
        position: "absolute",
        right: -6,
        top: -4,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: APP_COLOR.ORANGE,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "white",
        fontSize: 11,
        fontWeight: "bold",
    },
    totalPriceContainer: {
        flex: 1,
        justifyContent: "flex-end",
    },
    totalPriceText: {
        color: APP_COLOR.ORANGE,
        fontSize: 19,
        fontWeight: "bold",
    },
    deliveryButton: {
        backgroundColor: APP_COLOR.ORANGE,
        paddingVertical: 12,
        paddingHorizontal: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    deliveryButtonText: {
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
    },
});

export default StickyFooter;

