import { Text, View, Button, TextInput, KeyboardAvoidingView, Image } from "react-native";
import React, { useState } from "react";
import { firebase_auth } from "../../firebase.config.js";

function handleSignUp() {
    alert("Sign Up");
}

export default function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const auth = firebase_auth;
    let passwordMissmatch = false;

    return (
        <View className="flex-1 mx-10 justify-center">
            <KeyboardAvoidingView behavior="position">
                {/* <Image className="self-center w-64 h-64" source={require("../../assets/logo.png")} /> */}
                <Text className="text-xl text-center font-extrabold my-5"> Sign Up</Text>
                <TextInput
                    className="px-5 py-2 my-1 bg-slate-100 rounded-xl border-2"
                    value={email}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    className="px-5 py-2 my-1 bg-slate-100 rounded-xl border-2"
                    value={password}
                    placeholder="Password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                    className="px-5 py-2 my-1 bg-slate-100 rounded-xl border-2"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        setConfirmPassword(text);
                        passwordMissmatch = text !== password;
                    }}
                />
                <Text className="text-red">{passwordMissmatch ? "Passwords do not match" : ""}</Text>
                <Button title="Sign Up" onPress={handleSignUp} />
                <Button title="Back to Login" onPress={() => navigation.navigate("Login")} />
            </KeyboardAvoidingView>
        </View>
    );
}
