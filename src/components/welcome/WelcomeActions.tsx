import { View, Image, Text } from "react-native";
import { Link, router } from "expo-router";
import ShareButton from "@/components/button/share.button";
import TextBetWeenLine from "@/components/button/text.between.line";
import fbLogo from "@/assets/auth/facebook.png";
import ggLogo from "@/assets/auth/google.png";
import { welcomeStyles } from "@/styles/welcome.styles";

const WelcomeActions = () => {
    return (
        <View style={welcomeStyles.welcomeBtnContainer}>
            <TextBetWeenLine title="Đăng nhập với" />

            {/* Social Buttons */}
            <View style={welcomeStyles.socialGroup}>
                <ShareButton
                    title="faceBook"
                    onPress={() => router.push("https://www.facebook.com/login")}
                    textStyle={{ textTransform: "uppercase" }}
                    pressStyle={{ alignSelf: "stretch" }}
                    buttonStyle={{
                        justifyContent: "center",
                        borderRadius: 30,
                        backgroundColor: "#fff",
                    }}
                    icons={<Image source={fbLogo} />}
                />
                <ShareButton
                    title="google"
                    onPress={() => router.push("https://accounts.google.com/signin")}
                    textStyle={{ textTransform: "uppercase" }}
                    pressStyle={{ alignSelf: "stretch" }}
                    buttonStyle={{
                        justifyContent: "center",
                        borderRadius: 30,
                        paddingHorizontal: 20,
                        backgroundColor: "#fff",
                    }}
                    icons={<Image source={ggLogo} />}
                />
            </View>

            {/* Email Login Button */}
            <View>
                <ShareButton
                    title="Đăng nhập với email"
                    onPress={() => router.navigate("/(auth)/login")}
                    textStyle={{ color: "#fff", paddingVertical: 5 }}
                    buttonStyle={{
                        justifyContent: "center",
                        borderRadius: 30,
                        marginHorizontal: 50,
                        paddingVertical: 10,
                        backgroundColor: "#2c2c2c",
                        borderColor: "#505050",
                        borderWidth: 1,
                    }}
                    pressStyle={{ alignSelf: "stretch" }}
                />
            </View>

            {/* Sign Up Link */}
            <View style={welcomeStyles.linkGroup}>
                <Text style={{ color: "white" }}>Chưa có tài khoản?</Text>
                <Link href={"/(auth)/signup"}>
                    <Text style={welcomeStyles.linkText}>
                        Đăng ký.
                    </Text>
                </Link>
            </View>
        </View>
    );
};

export default WelcomeActions;