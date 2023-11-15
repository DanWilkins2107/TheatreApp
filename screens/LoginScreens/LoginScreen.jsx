import {
    Text,
    View,
    Button,
    TextInput,
    KeyboardAvoidingView,
    Image,
    ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import FormButton from "../../components/FormButton.jsx";
import { firebase_auth } from "../../firebase.config.js";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = firebase_auth;

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
            alert(`Sign in failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 mx-10 justify-center">
            <KeyboardAvoidingView behavior="position">
                <Image
                    className="self-center w-64 h-64"
                    source={require("../../assets/logo.png")}
                />
                <TextInput
                    className="px-5 py-2 my-1 mt-10 bg-slate-100 rounded-xl border-2"
                    value={email}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={(text) => setEmail(text.replace(/\s/g, ""))}
                />
                <TextInput
                    className="px-5 py-2 my-1 bg-slate-100 rounded-xl border-2"
                    value={password}
                    placeholder="Password"
                    autoCapitalize="none"
                    returnKeyType="go"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text.replace(/\s/g, ""))}
                />
                {loading ? (
                    <ActivityIndicator size="large" color="#f1f5f9" />
                ) : (
                    <>
                        <FormButton
                            blockClassName="bg-slate-700 justify-center w-32 h-10 self-center rounded-xl m-5"
                            textClassName="text-white text-center text-lg font-extrabold"
                            title="Login"
                            onPress={handleLogin}
                        />
                        <Button
                            title="Forgotten Password"
                            onPress={() => navigation.navigate("ForgottenPassword")}
                        />
                        <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
    );
}
