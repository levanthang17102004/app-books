import { View, Text, Image, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

import { accountStyles } from "@/styles/account.styles";
import { useAccount } from "@/hooks/useAccount";
import AccountMenuItem from "@/components/account/AccountMenuItem";

const AccountPage = () => {
    const { appState, baseImage, handleLogOut } = useAccount();
    const insets = useSafeAreaInsets();

    return (
        <View style={accountStyles.container}>
            <View style={[accountStyles.header, { paddingTop: insets.top + 10 }]}>
                <Image
                    style={accountStyles.avatar}
                    source={{ uri: `${baseImage}/${appState?.user.photo}` }}
                />
                <Text style={accountStyles.username}>{appState?.user.name}</Text>
            </View>

            <View style={accountStyles.menuContainer}>
                <AccountMenuItem
                    title="Cập nhật thông tin"
                    icon={<Feather name="user-check" size={24} color="green" />}
                    onPress={() => router.push("/(user)/account/info")}
                />
                <AccountMenuItem
                    title="Thay đổi mật khẩu"
                    icon={<MaterialIcons name="password" size={24} color="green" />}
                    onPress={() => router.push("/(user)/account/change.password")}
                />
                <AccountMenuItem
                    title="Ngôn ngữ"
                    icon={<Feather name="globe" size={24} color="green" />}
                    onPress={() => router.push("/(user)/account/change.language")}
                />
                <AccountMenuItem
                    title="Về ứng dụng"
                    icon={<AntDesign name="exclamationcircleo" size={24} color="green" />}
                    onPress={() => router.push("/(user)/account/app.message")}
                />
            </View>

            <View style={accountStyles.footer}>
                <Pressable onPress={handleLogOut} style={({ pressed }) => [accountStyles.logoutButton, { opacity: pressed ? 0.8 : 1 }]}>
                    <Text style={accountStyles.logoutText}>Đăng Xuất</Text>
                </Pressable>
                <Text style={accountStyles.versionText}>Version 1.0.0 - @lethang</Text>
            </View>
        </View>
    );
};
export default AccountPage;