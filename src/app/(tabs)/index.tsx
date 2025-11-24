import React, { useEffect } from "react";
import HeaderHome from "@/components/home/header.home";
import SearchHome from "@/components/home/search.home";
import TopListHome from "@/components/home/top.list.home";
import { StyleSheet, View, Text, Pressable } from "react-native";
import CustomFlatList from "@/components/CustomFlatList/CustomFlatList";
import CollectionHome from "@/components/home/collection.home";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign'; // Đảm bảo import AntDesign cho biểu tượng  

const data = [
    {
        key: 1,
        name: "Top Quán Rating 5* tuần này",
        description: "Gợi ý quán được tín đồ thực ẩm đánh giá 5*",
        refAPI: "top-rating"
    },
    {
        key: 2,
        name: "Quán Mới Lên Sàn",
        description: "Khám phá ngay hàng loạt quán mới",
        refAPI: "newcommer"
    },
    {
        key: 3,
        name: "Ăn Thỏa Thích, Freeship 0Đ",
        description: "Bánh ngọt, chân gà, bánh tráng, ...",
        refAPI: "top-freeship"
    },
];

const HomeTab = () => {
    useEffect(() => {
        router.navigate("/(auth)/popup.sale");
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomFlatList
                data={data}
                style={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.collectionContainer}>
                        <CollectionHome
                            name={item.name}
                            description={item.description}
                            refAPI={item.refAPI}
                        />
                    </View>
                )}
                HeaderComponent={<HeaderHome />}
                StickyElementComponent={<SearchHome />}
                TopListElementComponent={<TopListHome />}
            />
        </SafeAreaView>
    );
};

export default HomeTab;

const styles = StyleSheet.create({
    list: {
        overflow: "hidden"
    },
    collectionContainer: {
        marginVertical: 5,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Giữa tiêu đề và nút "Xem tất cả"  
    },
    icon: {
        marginRight: 10, // Khoảng cách giữa biểu tượng và tên  
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1, // Để tên có thể chiếm không gian còn lại  
    },
    seeAllContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        color: "#5a5a5a",
        paddingRight: 5,
    },
});