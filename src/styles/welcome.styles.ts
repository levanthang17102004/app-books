import { StyleSheet } from "react-native";
import { APP_COLOR } from "@/utils/constant";

export const welcomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    welcomeTextContainer: {
        flex: 0.6,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: 20,
    },
    welcomeBtnContainer: {
        flex: 0.4,
        gap: 30,
    },
    heading: {
        fontSize: 40,
        fontWeight: "600",
    },
    body: {
        fontSize: 30,
        color: APP_COLOR.ORANGE,
        marginVertical: 10,
    },
    footer: {
        // thêm style nếu cần
    },
    socialGroup: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 30,
    },
    linkGroup: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
    },
    linkText: {
        color: APP_COLOR.ORANGE,
        textDecorationLine: "underline",
    }
});