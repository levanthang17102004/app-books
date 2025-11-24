import { useCurrentApp } from "@/context/app.context";
import { getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { Alert, Image, Pressable, Text, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountPage = () => {
    const { appState } = useCurrentApp();
    const baseImage = `${getURLBaseBackend()}/images/avatar`;
    const insets = useSafeAreaInsets();

    const handleLogOut = async () => {
        Alert.alert(
            'Đăng xuất',
            'Bạn chắc chắn đăng xuất người dùng?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Xác nhận',
                    onPress: async () => {
                        await AsyncStorage.removeItem('accesstoken');
                        router.replace('/(auth)/welcome');
                    },
                },
            ]
        );
    }

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <Image
                    style={styles.avatar}
                    source={{ uri: `${baseImage}/${appState?.user.photo}` }}
                />
                <Text style={styles.username}>{appState?.user.name}</Text>
            </View>

            <Pressable
                onPress={() => { router.navigate("/(user)/account/info") }}
                style={styles.menuItem}
            >
                <View style={styles.menuItemContent}>
                    <Feather name="user-check" size={28} color="green" />
                    <Text style={styles.menuItemText}>Cập nhật thông tin</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <Pressable
                onPress={() => { router.navigate("/(user)/account/change.password") }}
                style={styles.menuItem}
            >
                <View style={styles.menuItemContent}>
                    <MaterialIcons name="password" size={28} color="green" />
                    <Text style={styles.menuItemText}>Thay đổi mật khẩu</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <Pressable
                onPress={() => { router.navigate("/(user)/account/change.language") }}
                style={styles.menuItem}
            >
                <View style={styles.menuItemContent}>
                    <Feather name="globe" size={28} color="green" />
                    <Text style={styles.menuItemText}>Ngôn ngữ</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <Pressable
                onPress={() => { router.navigate("/(user)/account/app.message") }}
                style={styles.menuItem}
            >
                <View style={styles.menuItemContent}>
                    <AntDesign name="exclamationcircleo" size={28} color="green" />
                    <Text style={styles.menuItemText}>Về ứng dụng</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <View style={styles.footer}>
                <Pressable
                    onPress={handleLogOut}
                    style={({ pressed }) => [
                        styles.logoutButton,
                        { opacity: pressed ? 0.5 : 1 }
                    ]}
                >
                    <Text style={styles.logoutText}>Đăng Xuất</Text>
                </Pressable>
                <Text style={styles.versionText}>@lethang</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: APP_COLOR.ORANGE,
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginRight: 20,
    },
    username: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    menuItem: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    menuItemText: {
        fontSize: 18, // Tăng kích thước chữ  
        fontWeight: "600", // Đậm hơn cho chữ  
    },
    footer: {
        flex: 1,
        justifyContent: "flex-end",
        paddingBottom: 15,
        alignItems: 'center',
    },
    logoutButton: {
        padding: 12, // Tăng padding cho nút  
        marginHorizontal: 10,
        backgroundColor: APP_COLOR.ORANGE,
        borderRadius: 5,
        width: '80%', // Giữ nguyên chiều rộng  
    },

    logoutText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 14, // Tăng kích thước chữ cho nút  
    },

    versionText: {
        textAlign: "center",
        color: APP_COLOR.GREY,
        marginTop: 10,
        fontSize: 16, // Tăng kích thước chữ cho thông tin phiên bản  
    },
});

export default AccountPage;