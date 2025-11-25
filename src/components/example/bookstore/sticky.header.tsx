import { APP_COLOR } from "@/utils/constant";
import { router } from "expo-router";
import { Dimensions, Pressable, StyleSheet, TextInput, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useCurrentApp } from "@/context/app.context";
import { likeBookstoreAPI } from "@/utils/api";
import Toast from "react-native-root-toast";
const { height: sHeight, width: sWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    // Thêm các style nếu cần  
});

interface IProps {
    headerHeight: number;
    imageHeight: number;
    animatedBackgroundStyle: any;
    animatedArrowColorStyle: any;
    animatedStickyHeaderStyle: any;
    animatedHeartIconStyle: any;
}

const StickyHeader = (props: IProps) => {
    const insets = useSafeAreaInsets();
    const {
        headerHeight, imageHeight,
        animatedBackgroundStyle,
        animatedArrowColorStyle, animatedStickyHeaderStyle,
        animatedHeartIconStyle
    } = props;

    const [like, setLike] = useState<boolean>(false); // Khởi tạo trạng thái like là false  
    const { bookstore, appState } = useCurrentApp();

    useEffect(() => {
        if (bookstore) {
            setLike(bookstore.isLike); // Thiết lập lại trạng thái like khi bookstore thay đổi  
        }
    }, [bookstore]);

    const handleLikeBookstore = async () => {
        // Chỉ thực hiện khi user đã đăng nhập  
        if (appState?.user.id && bookstore) {
            const quantity = like === true ? -1 : 1; // Lấy phủ định  
            const res = await likeBookstoreAPI(bookstore?._id, quantity);

            if (res.data) {
                // Success  
                setLike(!like); // Đảo ngược trạng thái like  
            } else {
                Toast.show("Update like success !", {
                    duration: Toast.durations.LONG,
                    textColor: 'white',
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1
                });
            }
        }
    };

    return (
        <>
            <View style={{
                zIndex: 11,
                paddingTop: insets.top + 10,
                paddingHorizontal: 10,
                flexDirection: "row",
                gap: 5,
                height: headerHeight,
                position: "absolute",
                width: sWidth,
            }}>
                <Pressable
                    style={({ pressed }) => ([{ opacity: pressed === true ? 0.5 : 1 }, { alignSelf: "flex-start" }])}
                    onPress={() => router.back()}>
                    <Animated.View
                        style={[animatedBackgroundStyle, {
                            height: 30,
                            width: 30,
                            borderRadius: 30 / 2,
                            justifyContent: "center",
                            alignItems: "center",
                        }]}
                    >
                        <MaterialIcons
                            name="arrow-back" 
                            size={24}
                            color="white"
                        />
                    </Animated.View>
                </Pressable>
                <Animated.View style={[{ flex: 1 }, animatedStickyHeaderStyle]}>
                    <TextInput
                        placeholder={"Tìm sách tại cửa hàng..."}
                        style={{
                            borderWidth: 1, borderColor: APP_COLOR.GREY, width: "100%",
                            borderRadius: 3,
                            paddingHorizontal: 10
                        }}
                    />
                </Animated.View>
            </View>


            <Animated.View style={[{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                height: headerHeight,
                backgroundColor: 'white',
            }, animatedStickyHeaderStyle]} />


            <Animated.View style={[{
                position: 'absolute',
                top: imageHeight + 80,
                right: 10,
                zIndex: 9,
            }, animatedHeartIconStyle]}>
                <MaterialIcons
                    onPress={handleLikeBookstore}
                    name={like === true ? "favorite" : "favorite"}
                    size={20}
                    color={like === true ? APP_COLOR.ORANGE : APP_COLOR.ORANGE}
                />
            </Animated.View>
        </>
    );
}

export default StickyHeader;

