import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Toast from "react-native-root-toast";
import { registerAPI } from "@/api/auth";
import { APP_COLOR } from "@/utils/constant";
import SignUpForm from "@/components/auth/SignUpForm";

const SignUpPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const res = await registerAPI(email, password, name);
      setLoading(false);
      if (res.data) {
        router.replace({
          pathname: "/(auth)/verify",
          params: { email: email },
        });
      } else {
        const m = Array.isArray(res.message) ? res.message[0] : res.message;
        Toast.show(m, {
          duration: Toast.durations.LONG,
          backgroundColor: APP_COLOR.ORANGE,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(">>check error:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SignUpForm onSubmit={handleSignUp} loading={loading} />
    </SafeAreaView>
  );
};

export default SignUpPage;