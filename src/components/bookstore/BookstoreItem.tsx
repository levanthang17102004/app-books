import { Image, Pressable, Text } from "react-native";
import { router } from "expo-router";
import { getURLBaseBackend } from "@/utils/helper";
import { bookstoreStyles } from "@/styles/bookstore.styles";

interface IProps {
    item: IBookstore;
}

const BookstoreItem = ({ item }: IProps) => {
    // Tách logic xử lý URL ảnh ra cho gọn
    const imageUrl = item.image
        ? `${getURLBaseBackend()}/images/${item.image}`
        : "https://via.placeholder.com/100"; // Ảnh mặc định nếu lỗi

    const handlePress = () => {
        router.push({
            pathname: "/product/[id]",
            params: { id: item._id }
        });
    };

    return (
        <Pressable onPress={handlePress} style={bookstoreStyles.itemContainer}>
            <Image
                source={{ uri: imageUrl }}
                style={bookstoreStyles.itemImage}
                resizeMode="cover"
            />
            <Text style={bookstoreStyles.itemText} numberOfLines={2}>
                {item.name}
            </Text>
        </Pressable>
    );
};

export default BookstoreItem;