import { StyleSheet } from "react-native";
import { APP_COLOR } from "@/utils/constant";

export const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        gap: 10,
        paddingVertical: 20,
    },
    heading: {
        fontSize: 25,
        fontWeight: "600",
        marginVertical: 30,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    linkText: {
        color: APP_COLOR.ORANGE,
        textDecorationLine: "underline",
    },
    centerRow: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        marginVertical: 15,
    }
});