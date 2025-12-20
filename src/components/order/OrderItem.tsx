import { Image, Pressable, Text, View } from "react-native";
import { getURLBaseBackend } from "@/utils/helper";
import { currencyFormatter } from "@/utils/format";
import { orderStyles } from "@/styles/order.styles";

const OrderItem = ({ item }: { item: IOrderHistory }) => {
    return (
        <Pressable style={orderStyles.itemContainer}>
            <Image
                source={{ uri: `${getURLBaseBackend()}/images/${item.bookstore.image}` }}
                style={orderStyles.image}
            />
            <View style={orderStyles.details}>
                <View>
                    <Text style={orderStyles.name} numberOfLines={1}>{item.bookstore.name}</Text>
                    <Text style={orderStyles.address} numberOfLines={1}>{item.bookstore.address}</Text>
                </View>
                <View>
                    <Text style={orderStyles.price}>Tổng: {currencyFormatter(item.totalPrice)}</Text>
                    <Text style={orderStyles.quantity}>SL: {item.totalQuantity}</Text>
                </View>
                <Text style={orderStyles.status}>ORDERED</Text>
            </View>
        </Pressable>
    );
};
export default OrderItem;