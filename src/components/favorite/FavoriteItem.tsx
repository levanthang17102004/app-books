import { Image, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { getURLBaseBackend } from "@/utils/helper";
import { favoriteStyles } from "@/styles/favorite.styles";

const FavoriteItem = ({ item }: { item: ILikeBookstore }) => {
    return (
        <Pressable
            onPress={() => router.push({ pathname: "/product/[id]", params: { id: item.bookstore._id } })}
            style={favoriteStyles.itemContainer}
        >
            <Image
                source={{ uri: `${getURLBaseBackend()}/images/${item.bookstore.image}` }}
                style={favoriteStyles.image}
            />
            <View style={favoriteStyles.infoContainer}>
                <Text style={favoriteStyles.name} numberOfLines={2}>{item.bookstore.name}</Text>
                <Text style={favoriteStyles.address} numberOfLines={1}>{item.bookstore.address}</Text>
            </View>
        </Pressable>
    );
};
export default FavoriteItem;