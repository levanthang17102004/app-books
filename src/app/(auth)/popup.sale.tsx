import { SafeAreaView } from "react-native";
import { router } from "expo-router";
import saleoffImg from '../../assets/saleoff/saleoff_transparent-3.png';
import SalePopup from "@/components/popup/SalePopup";

const PopupSalePage = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SalePopup
                imageSource={saleoffImg}
                onClose={() => router.back()}
                onPressAction={() => router.back()} // Hoặc navigate đến trang detail
            />
        </SafeAreaView>
    );
};

export default PopupSalePage;