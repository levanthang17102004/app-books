import { Pressable, Text, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { accountStyles } from "@/styles/account.styles";

interface IProps {
    title: string;
    icon: React.ReactNode;
    onPress: () => void;
}

const AccountMenuItem = ({ title, icon, onPress }: IProps) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [accountStyles.menuItem, { backgroundColor: pressed ? "#fafafa" : "white" }]}>
            <View style={accountStyles.menuItemContent}>
                {icon}
                <Text style={accountStyles.menuItemText}>{title}</Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="grey" />
        </Pressable>
    );
};
export default AccountMenuItem;