
import { Link, Redirect, router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import React from "react";
import { getAccountAPI, printAsyncStorage } from "@/utils/api";
import { useCurrentApp } from "@/context/app.context";

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const RootPage = () => {
  const { setAppState } = useCurrentApp()
  const [state, setState] = useState<any>();

  useEffect(() => {
    async function prepare() {
      try {
        const res = await getAccountAPI();
        if (res.data) {
          setAppState({
            user: res.data,
            accesstoken: await AsyncStorage.getItem("accesstoken")
          })
          router.replace("/(tabs)")
        } else {
          router.replace("/(auth)/welcome")
        }
      } catch (e) {
        // Không throw error, chỉ redirect về welcome
        // Nếu API fail (network error, etc), đưa user về login
        console.warn("Error loading account:", e);
        router.replace("/(auth)/welcome")
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  // if (true) {
  //   return <Redirect href={"/(tabs)"} />;
  // }

  return (
    <>

    </>
  );
};

export default RootPage;
