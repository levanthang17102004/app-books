import { Text, View, FlatList, StyleSheet, Image } from "react-native";
import BannerHome from "./banner.home";
import AntDesign from '@expo/vector-icons/AntDesign';
import { APP_COLOR } from "@/utils/constant";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topList: {
        borderWidth: 5,
        minHeight: 100,
        marginBottom: 10,
        width: "100%",
        paddingTop: 10,
    },
    item: {
        padding: 10,
        margin: 5,
        backgroundColor: '#f0f8ff', // Màu nền nhẹ hơn 
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3, // Bóng đổ nhẹ 
    },
    itemContainer: {
        padding: 6,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff', // Màu nền sáng  
        borderRadius: 10, // Bo góc  
        marginHorizontal: 5, // Khoảng cách giữa các mục  
        shadowColor: '#000', // Màu bóng  
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3, // Độ mờ bóng  
        shadowRadius: 4, // Đường kính bóng  
        elevation: 5, // Đối với Android  
    },
    itemImage: {
        height: 40,
        width: 40,
        marginBottom: 5,
        borderRadius: 10, // Bo góc cho hình ảnh  
    },
    itemName: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 2, // Khoảng cách giữa tên và biểu tượng  
    },
});

const data1 = [
    { key: 1, name: "Sách Hot", source: require("@/assets/icons/flash-deals.png") },
    { key: 2, name: "Nhà Sách Nổi Bật", source: require("@/assets/icons/nice-shop.png") },
    { key: 3, name: "Tích Điểm", source: require("@/assets/icons/points.png") },
    { key: 4, name: "Sách Văn Học", source: require("@/assets/icons/sach van hoc.jpg") },
    { key: 5, name: "Sách Kinh Điển", source: require("@/assets/icons/Sach kinh dien.jpg") },
    { key: 6, name: "Sách Giáo Khoa", source: require("@/assets/icons/sach giao khoa.png") },
    { key: 7, name: "Sách Nấu Ăn", source: require("@/assets/icons/sach nau an.jpg") },
    { key: 8, name: "Sách Bỏ Túi", source: require("@/assets/icons/sach_bo_tui.png") },
    { key: 9, name: "Sách Thiếu Nhi", source: require("@/assets/icons/sach thieu nhe.jpg") },
    { key: 10, name: "Sách Kinh Doanh", source: require("@/assets/icons/sach kinh soanh.jpg") },
    { key: 11, name: "Sách Sức Khỏe", source: require("@/assets/icons/sach-suc-khoe.jpg") },
    { key: 12, name: "Giảm 50k", source: require("@/assets/icons/moi-moi.png") },
    { key: 13, name: "99k Off", source: require("@/assets/icons/fried-chicken.png") },
    { key: 14, name: "Sách Tâm Lý", source: require("@/assets/icons/sach-tam-ly.jpg") },
    { key: 15, name: "Freeship", source: require("@/assets/icons/Steak.png") },
    { key: 16, name: "Ebook Miễn Phí", source: require("@/assets/icons/tomato.png") },
    { key: 17, name: "Sách Giá Rẻ", source: require("@/assets/icons/elipse.png") },
    { key: 18, name: "Sách Giải Trí", source: require("@/assets/icons/sach giai tri.jpg") },
    { key: 19, name: "Combo Sách", source: require("@/assets/icons/Notif.png") },
    { key: 20, name: "Sách Thơ", source: require("@/assets/icons/salad.png") },
]


const TopListHome = () => {
    return (
        <View style={styles.container}>
            <BannerHome />
            <View>
                <FlatList
                    style={{ marginVertical: 15 }}
                    data={data1}
                    horizontal
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={true}
                    scrollEnabled={true}
                    renderItem={({ item, index }) => (
                        <View style={styles.itemContainer}>
                            <Image
                                source={item.source}
                                style={styles.itemImage}
                            />
                            <Text style={styles.itemName}>
                                {item.name}
                            </Text>
                            <AntDesign name="checkcircle" size={14} color={APP_COLOR.ORANGE} />
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                />
            </View>
        </View>
    );
}

export default TopListHome;