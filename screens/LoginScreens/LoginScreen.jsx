import { View, Button, KeyboardAvoidingView, Image } from "react-native";
import { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import FormField from "../../components/Form/FormField.jsx";
import FormButton from "../../components/Form/FormButton.jsx";
import { firebase_auth } from "../../firebase.config.js";
import LoadingWheel from "../../components/Loading/LoadingWheel.jsx";
import TextButton from "../../components/Form/TextButton.jsx";
import { AlertContext } from "../../components/Alert/AlertProvider.jsx";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = firebase_auth;
    const { setAlert } = useContext(AlertContext);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setAlert(`Signed in as ${email}`, "bg-green-500", "circle-check");
        } catch (error) {
            if (
                error.code === "auth/user-not-found" ||
                error.code === "auth/invalid-email" ||
                error.code === "auth/missing-password" ||
                error.code === "auth/invalid-login-credentials"
            ) {
                setAlert("Incorrect details entered.", "bg-red-500", "exclamation-circle");
                return;
            }
            console.log(error.code);
            setAlert("Could not sign you in", "bg-red-500", "exclamation-circle");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 mx-10 justify-center">
            <KeyboardAvoidingView behavior="position">
                <View className="m-5">
                    <Image
                        className="self-center w-64 h-64"
                        source={require("../../assets/logo.png")}
                    />
                </View>
                <FormField
                    value={email}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={(text) => setEmail(text.replace(/\s/g, ""))}
                />
                <FormField
                    value={password}
                    placeholder="Password"
                    autoCapitalize="none"
                    secureTextEntry
                    onChangeText={(text) => setPassword(text.replace(/\s/g, ""))}
                />
                {loading ? (
                    <LoadingWheel />
                ) : (
                    <>
                        <FormButton title="Login" onPress={handleLogin} />
                        <TextButton
                            text="Forgotten Password"
                            onPress={() => navigation.navigate("ForgottenPassword")}
                        />
                        <TextButton text="Sign Up" onPress={() => navigation.navigate("SignUp")} />
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
    );
}
