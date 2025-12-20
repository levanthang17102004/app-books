import { View, Text } from "react-native";
import { Formik } from "formik";
import ShareInput from "@/components/input/share.input";
import ShareButton from "@/components/button/share.button";
import { APP_COLOR } from "@/utils/constant";
import { authStyles } from "@/styles/auth.styles"; // Import style chung

interface IProps {
    onSubmit: (email: string) => void;
}

const ForgotPasswordForm = ({ onSubmit }: IProps) => {
    return (
        <Formik
            initialValues={{ email: "" }}
            onSubmit={values => onSubmit(values.email)}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={authStyles.container}>
                    <Text style={authStyles.heading}>Quên mật khẩu</Text>
                    <Text style={authStyles.text}>
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
                        textStyle={{ color: "#fff", textTransform: "uppercase", paddingVertical: 5 }}
                        buttonStyle={{
                            borderRadius: 30,
                            marginHorizontal: 50,
                            paddingVertical: 10,
                            backgroundColor: APP_COLOR.ORANGE,
                            marginTop: 20
                        }}
                        pressStyle={{ alignSelf: "stretch" }}
                    />
                </View>
            )}
        </Formik>
    );
};
export default ForgotPasswordForm;