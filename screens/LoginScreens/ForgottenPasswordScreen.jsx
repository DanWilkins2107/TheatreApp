import { Text, View, Button, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import FormField from "../../components/Form/FormField.jsx";
import { firebase_auth } from "../../firebase.config.js";
import FormButton from "../../components/Form/FormButton.jsx";
import LoadingWheel from "../../components/Loading/LoadingWheel.jsx";
import { sendPasswordResetEmail } from "@firebase/auth";

export default function ForgottenPasswordScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = firebase_auth;

    const handlePasswordReset = async () => {
        setLoading(true);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Reset Link Sent");
                navigation.navigate("Login");
            })
            .catch((error) => {
                console.log(error.code, error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <View className="flex-1 mx-10 justify-center">
            <KeyboardAvoidingView behavior="position">
                <Text className="text-xl text-center font-extrabold"> Forgotten Password</Text>
                <Text className="text-center my-5">
                    Enter your email below and you will be sent a link to reset your password.
                </Text>
                <FormField
                    value={email}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={(text) => setEmail(text.replace(/\s/g, ""))}
                />
                {loading ? (
                    <LoadingWheel />
                ) : (
                    <FormButton title="Send Reset Link" onPress={handlePasswordReset} />
                )}
                <Button title="Back to Login" onPress={() => navigation.navigate("Login")} />
            </KeyboardAvoidingView>
        </View>
    );
}
