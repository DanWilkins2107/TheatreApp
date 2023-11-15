import { Text, View, Button, TextInput, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { firebase_auth } from "../../firebase.config.js";
import FormButton from "../../components/FormButton.jsx";

export default function ForgottenPasswordScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = firebase_auth;

    const handlePasswordReset = async () => {
        setLoading(true);
        try {
            //await sendPasswordResetEmail(email);
            alert("Reset Link Sent");
        } catch (error) {
            console.log(error);
            alert(`Password reset failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View className="flex-1 mx-10 justify-center">
            <KeyboardAvoidingView behavior="position">
                <Text className="text-xl text-center font-extrabold"> Forgotten Password</Text>
                <Text className="text-center my-5">
                    Enter your email below and you will be sent a link to reset your password.
                </Text>
                <TextInput
                    className="px-5 py-2 my-1 bg-slate-100 rounded-xl border-2"
                    value={email}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={(text) => setEmail(text.replace(/\s/g, ""))}
                />
                {loading ? (
                    <ActivityIndicator size="large" color="#f1f5f9" />
                ) : (
                    <FormButton
                        blockClassName="bg-slate-700 justify-center w-40 h-10 self-center rounded-xl m-5"
                        textClassName="text-white text-center text-lg font-extrabold"
                        title="Send Reset Link"
                        onPress={handlePasswordReset}
                    />
                )}
                <Button title="Back to Login" onPress={() => navigation.navigate("Login")} />
            </KeyboardAvoidingView>
        </View>
    );
}
