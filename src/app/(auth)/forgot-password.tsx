import ShareButton from "@/components/button/share.button";
import ShareInput from "@/components/input/share.input";
import { APP_COLOR } from "@/utils/constant";
import { Formik } from "formik";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";
import { resetPasswordAPI } from "@/utils/api";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        gap: 10,
    },
    heading: {
        fontSize: 25,
        fontWeight: "600",
        marginVertical: 30,
    }
});

const ForgotPasswordPage = () => {
    const handleSendResetLink = async (email: string) => {
        try {
            const res = await resetPasswordAPI(email);
            if (res.data) {
                Toast.show("Liên kết đặt lại mật khẩu đã được gửi!", {
                    duration: Toast.durations.LONG,
                    textColor: 'white',
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1,
                });
            } else {
                const message = Array.isArray(res.message) ? res.message[0] : res.message;
                Toast.show(message, {
                    duration: Toast.durations.LONG,
                    textColor: 'white',
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1,
                });
            }
        } catch (error) {
            console.error("Error sending reset link:", error);
            Toast.show("Có lỗi xảy ra, vui lòng thử lại!", {
                duration: Toast.durations.LONG,
                textColor: 'white',
                backgroundColor: APP_COLOR.ORANGE,
                opacity: 1,
            });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Formik
                initialValues={{ email: "" }}
                onSubmit={values => handleSendResetLink(values.email)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View style={styles.container}>
                        <Text style={styles.heading}>Quên mật khẩu</Text>
                        <Text style={{ fontSize: 16, marginBottom: 10 }}>
                            Nhập địa chỉ email của bạn để nhận liên kết đặt lại mật khẩu.
                        </Text>
                        <ShareInput
                            title="Email"
                            keyboardType="email-address"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            error={errors.email}
                        />
                        <ShareButton
                            title="Gửi liên kết đặt lại mật khẩu"
                            onPress={handleSubmit as any}
                            textStyle={{
                                color: "#fff",
                                paddingVertical: 5,
                                textTransform: "uppercase",
                            }}
                            buttonStyle={{
                                justifyContent: "center",
                                borderRadius: 30,
                                marginHorizontal: 50,
                                paddingVertical: 10,
                                backgroundColor: APP_COLOR.ORANGE,
                            }}
                            pressStyle={{ alignSelf: "stretch" }}
                        />
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    );
};

export default ForgotPasswordPage;