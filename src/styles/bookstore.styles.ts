import { StyleSheet } from "react-native";
import { APP_COLOR } from "@/utils/constant";

export const bookstoreStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    searchInput: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    listContainer: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        gap: 12,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
    },
    itemImage: {
        height: 80,
        width: 80,
        borderRadius: 8,
        backgroundColor: "#eee", // Placeholder color
    },
    itemText: {
        fontSize: 16,
        fontWeight: "600",
        flex: 1,
        color: "#333",
    },
    loadingContainer: {
        paddingVertical: 20,
    }
});