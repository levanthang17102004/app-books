import { currencyFormatter, getFavoriteBookstoreAPI, getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Image, RefreshControl, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const FavoritePage = () => {
    const [favoriteBookstores, setFavoriteBookstores] = useState<ILikeBookstore[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => {
        const fetchFavoriteBookstores = async () => {
            const res = await getFavoriteBookstoreAPI();
            if (res.data) {
                const filteredBookstores = res.data.filter(item => item.quantity % 2 !== 0);

                setFavoriteBookstores(filteredBookstores);
            }
        };
        fetchFavoriteBookstores();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        const res = await getFavoriteBookstoreAPI();
        if (res.data) {
            const filteredBookstores = res.data.filter(item => item.quantity % 2 !== 0);
            setFavoriteBookstores(filteredBookstores);
        }
        setRefreshing(false);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>

                <View style={styles.header}>
                    <MaterialIcons name="favorite" size={24} color={APP_COLOR.ORANGE} />
                    <Text style={styles.headerText}>Danh sách nhà sách yêu thích</Text>
                </View>


                <ScrollView
                    style={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    contentContainerStyle={styles.bookstoreList}
                >
                    {favoriteBookstores.length > 0 ? (
                        favoriteBookstores.map((item, index) => (
                            <Pressable
                                key={index}
                                onPress={() => router.push({
                                    pathname: "/product/[id]",
                                    params: { id: item.bookstore._id }
                                })}
                                style={styles.bookstoreItem}
                            >

                                <Image
                                    source={{ uri: `${getURLBaseBackend()}/images/restaurant/${item.bookstore.image}` }}
                                    style={styles.bookstoreImage}
                                />
                                <View style={styles.bookstoreDetails}>
                                    <Text style={styles.bookstoreName}>{item.bookstore.name}</Text>
                                    <Text style={styles.bookstoreAddress}>{item.bookstore.address}</Text>
                                </View>
                            </Pressable>
                        ))
                    ) : (
                        <Text style={styles.noFavoriteText}>Không có nhà sách yêu thích nào.</Text>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        padding: 10,
        backgroundColor: "white",
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: APP_COLOR.ORANGE,
        marginLeft: 10,
    },
    bookstoreList: {
        paddingBottom: 20,
    },
    bookstoreItem: {
        backgroundColor: "white",
        borderRadius: 10,
        margin: 10,
        padding: 15,
        flexDirection: 'row',
        gap: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    bookstoreImage: {
        height: 100,
        width: 100,
        borderRadius: 10,
    },
    bookstoreDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    bookstoreName: {
        fontSize: 16,
        color: "black",
        fontWeight: 'bold',
    },
    bookstoreAddress: {
        fontSize: 14,
        color: '#666',
    },
    bookstoreQuantity: {
        fontSize: 14,
        color: '#666',
    },
    noFavoriteText: {
        textAlign: 'center',
        margin: 20,
        fontSize: 16,
        color: '#666',
    },
});

export default FavoritePage;