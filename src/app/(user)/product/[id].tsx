import RMain from "@/components/example/bookstore/main";
import { getBookstoreByIdAPI } from "@/api/bookstore";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useCurrentApp } from "@/context/app.context";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton";

const ProductPage = () => {
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const { setBookstore } = useCurrentApp();

    useEffect(() => {
        if (!id) return;
        const fetchBookstore = async () => {
            setLoading(true);
            try {
                const res = await getBookstoreByIdAPI(id as string);
                if (res.data) setBookstore(res.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchBookstore();
    }, [id]);

    if (loading) return <ProductSkeleton />;

    return (
        <View style={{ flex: 1 }}>
            <RMain />
        </View>
    );
};

export default ProductPage;