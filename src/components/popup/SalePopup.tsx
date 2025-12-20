import { View, Image, Pressable, Text, Dimensions } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import AntDesign from '@expo/vector-icons/AntDesign';
import { popupStyles } from "@/styles/popup.styles";

// Props để tái sử dụng popup cho các chiến dịch khác nhau
interface IProps {
    imageSource: any;
    onClose: () => void;
    onPressAction: () => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SalePopup = ({ imageSource, onClose, onPressAction }: IProps) => {
    const imageWidth = SCREEN_WIDTH * 0.9;
    const imageHeight = SCREEN_HEIGHT * 0.6;

    return (
        <Animated.View entering={FadeIn} style={popupStyles.overlay}>
            <Animated.View entering={SlideInDown} style={popupStyles.container}>

                {/* Close Button */}
                <View style={popupStyles.closeButtonContainer}>
                    <Pressable onPress={onClose} style={popupStyles.closeButton}>
                        <AntDesign name="close" size={22} color="grey" />
                    </Pressable>
                </View>

                {/* Main Image */}
                <View style={popupStyles.imageContainer}>
                    <Image
                        source={imageSource}
                        style={{ width: imageWidth, height: imageHeight }}
                        resizeMode="contain"
                    />
                </View>

                {/* Call To Action Button */}
                <Pressable
                    style={({ pressed }) => [
                        popupStyles.ctaButton,
                        { backgroundColor: pressed ? "#d85b" : "#f04054" }
                    ]}
                    onPress={onPressAction}
                >
                    <Text style={popupStyles.ctaText}>ĐẶT NGAY</Text>
                </Pressable>

            </Animated.View>
        </Animated.View>
    );
};

export default SalePopup;