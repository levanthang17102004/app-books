import { View, Text } from "react-native";
import { Formik } from "formik";
import { Link } from "expo-router";
import ShareInput from "@/components/input/share.input";
import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import { APP_COLOR } from "@/utils/constant";
import { SignUpSchema } from "@/utils/validate.schema";
import { authStyles } from "@/styles/auth.styles";

interface IProps {
    onSubmit: (email: string, pass: string, name: string) => void;
    loading: boolean;
}

const SignUpForm = ({ onSubmit, loading }: IProps) => {
    return (
        <Formik
            validationSchema={SignUpSchema}
            initialValues={{ email: "", password: "", name: "" }}
            onSubmit={(values) => onSubmit(values.email, values.password, values.name)}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={authStyles.container}>
                    <Text style={authStyles.heading}>Đăng ký tài khoản</Text>

                    <ShareInput
                        title="Họ tên"
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                        error={errors.name}
                        touched={touched.name}
                    />
                    <ShareInput
                        title="Email"
                        keyboardType="email-address"
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        error={errors.email}
                        touched={touched.email}
                    />
                    <ShareInput
                        title="Password"
                        secureTextEntry={true}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        error={errors.password}
                        touched={touched.password}
                    />

                    <ShareButton
                        loading={loading}
                        title="Đăng Ký"
                        onPress={handleSubmit as any}
                        textStyle={{ color: "#fff", textTransform: "uppercase", paddingVertical: 5 }}
                        buttonStyle={{
                            borderRadius: 30,
                            marginHorizontal: 50,
                            paddingVertical: 10,
                            backgroundColor: APP_COLOR.ORANGE,
                            marginTop: 10
                        }}
                        pressStyle={{ alignSelf: "stretch" }}
                    />

                    <View style={authStyles.centerRow}>
                        <Text style={{ color: "black" }}>Đã có tài khoản?</Text>
                        <Link href={"/(auth)/login"}>
                            <Text style={authStyles.linkText}>Đăng nhập.</Text>
                        </Link>
                    </View>
                    <SocialButton title="Đăng ký với" />
                </View>
            )}
        </Formik>
    );
};
export default SignUpForm;