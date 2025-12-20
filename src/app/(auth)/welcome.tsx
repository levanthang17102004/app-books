import React from "react";
import { ImageBackground, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import bg from "@/assets/auth/welcome-background.png";
import { welcomeStyles } from "@/styles/welcome.styles";

import WelcomeIntro from "@/components/welcome/WelcomeIntro";
import WelcomeActions from "@/components/welcome/WelcomeActions";

const WelcomePage = () => {
    return (
        <ImageBackground style={{ flex: 1 }} source={bg}>
            <LinearGradient
                style={{ flex: 1 }}
                colors={["transparent", "#191B2F"]}
                locations={[0.2, 0.8]}
            >
                <View style={welcomeStyles.container}>
                    <WelcomeIntro />
                    <WelcomeActions />
                </View>
            </LinearGradient>
        </ImageBackground>
    );
};

export default WelcomePage;