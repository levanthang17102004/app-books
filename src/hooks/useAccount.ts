import { Alert } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCurrentApp } from "@/context/app.context";
import { getURLBaseBackend } from "@/utils/helper";

export const useAccount = () => {
    const { appState } = useCurrentApp();
    const baseImage = `${getURLBaseBackend()}/images/avatar`;

    const handleLogOut = () => {
        Alert.alert('Đăng xuất', 'Bạn chắc chắn đăng xuất người dùng?', [
            { text: 'Hủy', style: 'cancel' },
            {
                text: 'Xác nhận',
                onPress: async () => {
                    await AsyncStorage.removeItem('accesstoken');
                    router.replace('/(auth)/welcome');
                },
            },
        ]);
    };

    return { appState, baseImage, handleLogOut };
};