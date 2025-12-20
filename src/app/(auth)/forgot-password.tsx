import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-root-toast";
import { APP_COLOR } from "@/utils/constant";
import { resetPasswordAPI } from "@/api/auth";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

const ForgotPasswordPage = () => {
    const handleSendResetLink = async (email: string) => {
        try {
            const res = await resetPasswordAPI(email);
            if (res.data) {
                Toast.show("Liên kết đặt lại mật khẩu đã được gửi!", {
                    duration: Toast.durations.LONG,
                    backgroundColor: APP_COLOR.ORANGE,
                });
            } else {
                const message = Array.isArray(res.message) ? res.message[0] : res.message;
                Toast.show(message, {
                    duration: Toast.durations.LONG,
                    backgroundColor: APP_COLOR.ORANGE,
                });
            }
        } catch (error) {
            console.error("Error sending reset link:", error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ForgotPasswordForm onSubmit={handleSendResetLink} />
        </SafeAreaView>
    );
};

export default ForgotPasswordPage;