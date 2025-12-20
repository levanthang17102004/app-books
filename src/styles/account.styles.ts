import { StyleSheet } from "react-native";
import { APP_COLOR } from "@/utils/constant";

export const accountStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: APP_COLOR.ORANGE,
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: { height: 60, width: 60, borderRadius: 30, marginRight: 20 },
    username: { color: "white", fontSize: 20, fontWeight: "bold" },
    menuContainer: { marginTop: 10 },
    menuItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menuItemContent: { flexDirection: 'row', alignItems: 'center', gap: 15 },
    menuItemText: { fontSize: 16, fontWeight: "500", color: "#333" },
    footer: { flex: 1, justifyContent: "flex-end", paddingBottom: 20, alignItems: 'center' },
    logoutButton: {
        paddingVertical: 12,
        backgroundColor: APP_COLOR.ORANGE,
        borderRadius: 30, // Bo tròn nhiều hơn cho đẹp
        width: '80%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    logoutText: { color: "white", fontWeight: "bold", fontSize: 16, textTransform: "uppercase" },
    versionText: { color: APP_COLOR.GREY, marginTop: 15, fontSize: 14 },
});