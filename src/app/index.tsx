
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
        // Pre-load fonts, make any API calls you need to do here
        const res = await getAccountAPI();
        console.log(">>check res", res)
        if (res.data) {
          //success
          setAppState({
            user: res.data,
            accesstoken: await AsyncStorage.getItem("accesstoken")

          })
          router.replace("/(tabs)")
          // await AsyncStorage.removeItem("accesstoken")
        } else {
          //error
          router.replace("/(auth)/welcome")
        }
      } catch (e) {
        setState(() => {
          throw new Error("Không thể kết nối với API backend...")

        })
        // console.log("Không thể kết nối với API backend...")
        // console.warn(e);
      } finally {
        // Tell the application to render
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
