import { Text, View, Button } from "react-native";
import { useState, useContext } from "react";
import FormField from "../../components/Form/FormField.jsx";
import { firebase_auth } from "../../firebase.config.js";
import FormButton from "../../components/Form/FormButton.jsx";
import LoadingWheel from "../../components/Loading/LoadingWheel.jsx";
import { sendPasswordResetEmail } from "@firebase/auth";
import TextButton from "../../components/Form/TextButton.jsx";
import { AlertContext } from "../../components/Alert/AlertProvider.jsx";

export default function ForgottenPasswordScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = firebase_auth;
    const { setAlert } = useContext(AlertContext);

    const handlePasswordReset = async () => {
        setLoading(true);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setAlert("Password reset link sent to email.", "bg-red-500", "exclamation-circle")
                navigation.navigate("Login");
            })
            .catch((error) => {
                setAlert("Could not send the reset link.", "bg-red-500", "exclamation-circle")
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <View className="flex-1 mx-10 justify-center">
            <View>
                <Text className="text-xl text-center font-extrabold">Forgotten Password</Text>
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
                <TextButton text="Back to Login" onPress={() => navigation.navigate("Login")} />
            </View>
        </View>
    );
}
