import { View, SafeAreaView } from "react-native";
import CustomFlatList from "@/components/CustomFlatList/CustomFlatList";
import HeaderHome from "@/components/home/header.home";
import SearchHome from "@/components/home/search.home";
import TopListHome from "@/components/home/top.list.home";
import CollectionHome from "@/components/home/collection.home";
import { homeStyles } from "@/styles/home.styles";
import { useHome } from "@/hooks/useHome";

const HomeTab = () => {
    const { collections } = useHome();

    return (
        <SafeAreaView style={homeStyles.container}>
            <CustomFlatList
                data={collections}
                style={homeStyles.list}
                renderItem={({ item }) => (
                    <View style={homeStyles.collectionContainer}>
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