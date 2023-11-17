import { View, Button, KeyboardAvoidingView, Image, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import FormField from "../../components/Form/FormField.jsx";
import FormButton from "../../components/Form/FormButton.jsx";
import { firebase_auth } from "../../firebase.config.js";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = firebase_auth;

    const handleLogin = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            alert(`Sign in failed: ${error.message}`);
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
                    <View className="h-20">
                        <ActivityIndicator size="large" color="#f1f5f9" />
                    </View>
                ) : (
                    <>
                        <FormButton title="Login" onPress={handleLogin} />
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
