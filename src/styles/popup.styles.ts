import { StyleSheet } from "react-native";

export const popupStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
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
    ctaButton: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 15,
        marginTop: 15,
    },
    ctaText: {
        color: "white",
        fontWeight: "600",
        fontSize: 16
    }
});