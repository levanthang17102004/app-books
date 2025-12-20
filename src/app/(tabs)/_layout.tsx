import React from "react";
import { Tabs } from "expo-router";
import { APP_COLOR, TAB_ROUTES } from "@/utils/constant";

// Import Icons
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';

// Hàm render icon tách biệt, sử dụng switch-case với Constant
const renderTabIcon = (routeName: string, focused: boolean, size: number, color: string) => {
  switch (routeName) {
    case TAB_ROUTES.HOME:
      return (
        <MaterialCommunityIcons
          name="book-open-page-variant"
          size={size}
          color={color}
        />
      );
    case TAB_ROUTES.ORDER:
      return (
        <MaterialIcons
          name="list-alt"
          size={size}
          color={color}
        />
      );
    case TAB_ROUTES.FAVORITE:
      return (
        <AntDesign
          name={focused ? "heart" : "hearto"}
          size={size}
          color={color}
        />
      );
    case TAB_ROUTES.NOTIFICATION:
      return (
        <Octicons
          name={focused ? "bell-fill" : "bell"}
          size={size}
          color={color}
        />
      );
    case TAB_ROUTES.ACCOUNT:
      return (
        <MaterialCommunityIcons
          name={focused ? "account" : "account-outline"}
          size={size}
          color={color}
        />
      );
    default:
      return null;
  }
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: { paddingBottom: 3 },
        tabBarActiveTintColor: APP_COLOR.ORANGE,
        tabBarInactiveTintColor: APP_COLOR.GREY,

        // Gọi hàm render icon, truyền color tự động từ Expo Router
        tabBarIcon: ({ focused, color, size }) => {
          return renderTabIcon(route.name, focused, size, color);
        },
      })}
    >
      {/* Sử dụng Constant cho prop 'name' */}
      <Tabs.Screen
        name={TAB_ROUTES.HOME}
        options={{ title: 'Home' }}
      />
      <Tabs.Screen
        name={TAB_ROUTES.ORDER}
        options={{ title: 'Đơn hàng' }}
      />
      <Tabs.Screen
        name={TAB_ROUTES.FAVORITE}
        options={{ title: 'Đã thích' }}
      />
      <Tabs.Screen
        name={TAB_ROUTES.NOTIFICATION}
        options={{ title: 'Thông báo' }}
      />
      <Tabs.Screen
        name={TAB_ROUTES.ACCOUNT}
        options={{ title: 'Tôi' }}
      />
    </Tabs>
  );
};

export default TabLayout;