import { router } from "expo-router";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View, Dimensions } from "react-native";
import saleoffImg from '../../assets/saleoff/saleoff_transparent-3.png';
import AntDesign from '@expo/vector-icons/AntDesign';
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const PopupSalePage = () => {
    // Tính toán kích thước ảnh để hiển thị đầy đủ
    const imageWidth = SCREEN_WIDTH * 0.9; // 90% chiều rộng màn hình
    const imageHeight = SCREEN_HEIGHT * 0.6; // 60% chiều cao màn hình
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Animated.View
                entering={FadeIn}
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.5)"
                }}>
                <Animated.View
                    entering={SlideInDown}
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 20,
                    }}
                >
                    <View style={styles.closeButtonContainer}>
                        <Pressable
                            onPress={() => router.back()}
                            style={styles.closeButton}
                        >
                            <AntDesign
                                name="close"
                                size={22}
                                color="grey"
                            />
                        </Pressable>
                    </View>
                    
                    <View style={styles.imageContainer}>
                        <Image
                            source={saleoffImg}
                            style={{
                                width: imageWidth,
                                height: imageHeight,
                            }}
                            resizeMode="contain"
                        />
                    </View>

                    <Pressable
                        style={({ pressed }) => ({
                            backgroundColor: pressed ? "#d85b" : "#f04054",
                            paddingVertical: 12,
                            paddingHorizontal: 40,
                            borderRadius: 15,
                            marginTop: 15,
                        })}
                        onPress={() => router.back()}
                    >
                        <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>ĐẶT NGAY</Text>
                    </Pressable>
                </Animated.View>
            </Animated.View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    closeButtonContainer: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10,
    },
    closeButton: {
        backgroundColor: "white",
        height: 32,
        width: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default PopupSalePage