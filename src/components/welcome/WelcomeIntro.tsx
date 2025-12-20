import { View, Text } from "react-native";
import { welcomeStyles } from "@/styles/welcome.styles";

const WelcomeIntro = () => {
    return (
        <View style={welcomeStyles.welcomeTextContainer}>
            <Text style={welcomeStyles.heading}>Welcome To</Text>
            <Text style={welcomeStyles.body}>app-books</Text>
            <Text style={welcomeStyles.footer}>
                Nền tảng đặt sách nhanh và tiện lợi
            </Text>
        </View>
    );
};

export default WelcomeIntro;