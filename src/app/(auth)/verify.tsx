import React, { useEffect, useRef, useState } from "react";
import { Keyboard, View } from "react-native";
import OTPTextView from "react-native-otp-textinput";
import Toast from "react-native-root-toast";
import { router, useLocalSearchParams } from "expo-router";

import LoadingOverlay from "@/components/loading/overlay";
import VerifyContent from "@/components/auth/VerifyContent";
import { resendCodeAPI, verifyCodeAPI } from "@/api/auth";
import { APP_COLOR } from "@/utils/constant";

const VerifyPage = () => {
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [code, setCode] = useState<string>("");

    // Ref vẫn giữ ở page cha để clear input khi cần
    const otpRef = useRef<OTPTextView>(null);
    const { email } = useLocalSearchParams();

    const verifyCode = async () => {
        Keyboard.dismiss();
        setIsSubmit(true);
        const res = await verifyCodeAPI(email as string, code);
        setIsSubmit(false);

        if (res.data) {
            otpRef?.current?.clear();
            Toast.show("Kích hoạt tài khoản thành công !", {
                duration: Toast.durations.LONG,
                backgroundColor: APP_COLOR.ORANGE,
            });
            router.replace("/(auth)/login");
        } else {
            Toast.show(res.message as string, {
                duration: Toast.durations.LONG,
                backgroundColor: APP_COLOR.ORANGE,
            });
        }
    }

    const handleResendCode = async () => {
        otpRef?.current?.clear();
        const res = await resendCodeAPI(email as string, code);
        Toast.show(res.data ? "Resend code thành công !" : res.message as string, {
            duration: Toast.durations.LONG,
            backgroundColor: APP_COLOR.ORANGE,
        });
    }

    // Logic tự động submit khi đủ 6 ký tự
    useEffect(() => {
        if (code && code.length === 6) {
            verifyCode();
        }
    }, [code])

    return (
        <>
            <View style={{ flex: 1, paddingTop: 30 }}>
                <VerifyContent
                    ref={otpRef}
                    email={email as string}
                    setCode={setCode}
                    handleResendCode={handleResendCode}
                />
            </View>
            {isSubmit && <LoadingOverlay />}
        </>
    )
};

export default VerifyPage;