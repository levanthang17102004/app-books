import { View, TextInput } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";
import { APP_COLOR } from "@/utils/constant";
import { bookstoreStyles } from "@/styles/bookstore.styles";

interface IProps {
    onSearch: (text: string) => void;
}

const BookstoreHeader = ({ onSearch }: IProps) => {
    return (
        <View style={bookstoreStyles.headerContainer}>
            <MaterialIcons
                onPress={() => router.back()}
                name="arrow-back"
                size={24}
                color={APP_COLOR.ORANGE}
            />
            <TextInput
                placeholder="Tìm kiếm nhà sách..."
                onChangeText={onSearch}
                style={bookstoreStyles.searchInput}
                placeholderTextColor="#999"
                clearButtonMode="while-editing" // Hiển thị nút X trên iOS
            />
        </View>
    );
};

export default BookstoreHeader;