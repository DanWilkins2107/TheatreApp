import { Text, View, Button, TextInput, KeyboardAvoidingView, Image } from "react-native";
import React, { useState } from "react";

function handlePasswordReset() {
    alert("Reset Link Sent");
}

export default function ForgottenPasswordScreen({ navigation }) {
    const [email, setEmail] = useState("");

    return (
        <View className="flex-1 mx-10 justify-center">
            <KeyboardAvoidingView behavior="position">
                {/* <Image className="self-center w-64 h-64" source={require("../../assets/logo.png")} /> */}
                <Text className="text-xl text-center font-extrabold"> Forgotten Password</Text>
                <Text className="text-center my-5">Enter your email below and you will be sent a link to reset your password.</Text>
                <TextInput
                    className="px-5 py-2 my-1 bg-slate-100 rounded-xl border-2"
                    value={email}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={(text) => setEmail(text)}
                />
                <Button title="Send Reset Link" onPress={handlePasswordReset} />
                <Button title="Back to Login" onPress={() => navigation.navigate("Login")} />
            </KeyboardAvoidingView>
        </View>
    );
}
