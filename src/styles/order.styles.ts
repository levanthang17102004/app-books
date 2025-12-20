import { StyleSheet } from "react-native";
import { APP_COLOR } from "@/utils/constant";

export const orderStyles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#fff" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
    },
    headerText: { fontSize: 20, fontWeight: "bold", color: APP_COLOR.ORANGE, marginLeft: 10 },
    listContent: { paddingBottom: 20 },
    itemContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        marginHorizontal: 15,
        marginTop: 15,
        padding: 15,
        flexDirection: "row",
        gap: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        borderWidth: 1,
        borderColor: "#f5f5f5"
    },
    image: { height: 90, width: 90, borderRadius: 8, backgroundColor: "#eee" },
    details: { flex: 1, justifyContent: "space-between" },
    name: { fontSize: 16, color: "#333", fontWeight: "bold" },
    address: { fontSize: 13, color: "#777" },
    price: { fontSize: 15, color: APP_COLOR.ORANGE, fontWeight: "600" },
    quantity: { fontSize: 13, color: "#555" },
    status: { fontSize: 12, color: "#999", fontStyle: "italic", alignSelf: 'flex-end' },
    loadingFooter: { padding: 20, alignItems: "center" },
    pageInfo: { padding: 5, alignItems: "center", backgroundColor: "#f9f9f9" },
    pageText: { color: APP_COLOR.ORANGE, fontSize: 12 }
});