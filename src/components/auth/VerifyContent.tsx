import React, { forwardRef } from "react";
import { View, Text } from "react-native";
import OTPTextView from "react-native-otp-textinput";
import { APP_COLOR } from "@/utils/constant";
import { authStyles } from "@/styles/auth.styles";

interface IProps {
    email: string;
    setCode: (code: string) => void;
    handleResendCode: () => void;
}

// Sử dụng forwardRef để truyền ref của OTPTextView từ cha xuống
const VerifyContent = forwardRef<OTPTextView, IProps>(({ email, setCode, handleResendCode }, ref) => {
    return (
        <View style={authStyles.container}>
            <Text style={authStyles.heading}>Xác thực tài khoản</Text>
            <Text style={authStyles.text}>
                Vui lòng nhập mã xác nhận đã được gửi tới địa chỉ {email}
            </Text>

            <View style={{ marginVertical: 20 }}>
                <OTPTextView
                    ref={ref}
                    handleTextChange={setCode}
                    autoFocus
                    inputCount={6}
                    inputCellLength={1}
                    tintColor={APP_COLOR.ORANGE}
                    textInputStyle={{
                        borderWidth: 1,
                        borderColor: APP_COLOR.GREY,
                        borderBottomWidth: 1,
                        borderRadius: 5,
                        // @ts-ignore
                        color: APP_COLOR.ORANGE
                    }}
                />
            </View>

            <View style={authStyles.centerRow}>
                <Text>Không nhận được mã xác nhận.</Text>
                <Text
                    onPress={handleResendCode}
                    style={authStyles.linkText}>Gửi lại</Text>
            </View>
        </View>
    );
});

export default VerifyContent;