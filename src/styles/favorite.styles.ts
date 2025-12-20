import { StyleSheet } from "react-native";
import { APP_COLOR } from "@/utils/constant";

export const favoriteStyles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#fff" },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
    },
    headerText: { fontSize: 20, fontWeight: 'bold', color: APP_COLOR.ORANGE, marginLeft: 10 },
    listContent: { paddingBottom: 20 },
    itemContainer: {
        backgroundColor: "white",
        borderRadius: 12,
        marginHorizontal: 15,
        marginTop: 15,
        padding: 10,
        flexDirection: 'row',
        gap: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: { height: 80, width: 80, borderRadius: 8 },
    infoContainer: { flex: 1, justifyContent: 'center' },
    name: { fontSize: 16, color: "#333", fontWeight: 'bold', marginBottom: 4 },
    address: { fontSize: 13, color: '#666' },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999' },
});