import { View, Text, SafeAreaView, FlatList, RefreshControl } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { APP_COLOR } from "@/utils/constant";
import { favoriteStyles } from "@/styles/favorite.styles";
import { useFavorite } from "@/hooks/useFavorite";
import FavoriteItem from "@/components/favorite/FavoriteItem";

const FavoritePage = () => {
    const { favoriteBookstores, refreshing, onRefresh } = useFavorite();

    return (
        <SafeAreaView style={favoriteStyles.safeArea}>
            <View style={favoriteStyles.header}>
                <MaterialIcons name="favorite" size={24} color={APP_COLOR.ORANGE} />
                <Text style={favoriteStyles.headerText}>Nhà sách yêu thích</Text>
            </View>

            <FlatList
                data={favoriteBookstores}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <FavoriteItem item={item} />}
                contentContainerStyle={favoriteStyles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[APP_COLOR.ORANGE]} />
                }
                ListEmptyComponent={
                    <Text style={favoriteStyles.emptyText}>Chưa có nhà sách yêu thích nào.</Text>
                }
            />
        </SafeAreaView>
    );
};
export default FavoritePage;