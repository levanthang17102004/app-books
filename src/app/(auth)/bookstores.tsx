import React from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import { APP_COLOR } from "@/utils/constant";
import { bookstoreStyles } from "@/styles/bookstore.styles";
import BookstoreHeader from "@/components/bookstore/BookstoreHeader";
import BookstoreItem from "@/components/bookstore/BookstoreItem";
import { useBookstore } from "@/hooks/useBookstore";

const BookstoresPage = () => {
    // Gọi Hook để lấy logic
    const { bookstores, loading, handleSearch, handleLoadMore } = useBookstore();

    return (
        <SafeAreaView style={bookstoreStyles.safeArea}>
            {/* Header Component */}
            <BookstoreHeader onSearch={handleSearch} />

            <View style={bookstoreStyles.listContainer}>
                <FlatList
                    data={bookstores}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <BookstoreItem item={item} />}

                    // Logic load more
                    onEndReachedThreshold={0.5}
                    onEndReached={handleLoadMore}

                    // Hiển thị loading ở cuối danh sách khi cuộn
                    ListFooterComponent={
                        loading && bookstores.length > 0 ? (
                            <ActivityIndicator
                                size="small"
                                color={APP_COLOR.ORANGE}
                                style={bookstoreStyles.loadingContainer}
                            />
                        ) : null
                    }

                    // Hiển thị loading giữa màn hình khi mới vào chưa có dữ liệu
                    ListEmptyComponent={
                        loading ? (
                            <ActivityIndicator
                                size="large"
                                color={APP_COLOR.ORANGE}
                                style={{ marginTop: 50 }}
                            />
                        ) : null
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default BookstoresPage;