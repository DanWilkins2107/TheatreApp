import { Text, View, Button, TextInput, KeyboardAvoidingView, Image } from "react-native";
import React, { useState } from "react";
import { firebase_auth } from "../../firebase.config.js";

function handleLogin() {
    alert("Login");
}

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = firebase_auth;

    return (
        <View className="flex-1 mx-10 justify-center">
            <KeyboardAvoidingView behavior="position">
                <Image className="self-center w-64 h-64" source={require("../../assets/logo.png")} />
                <Text className="text-xl text-center font-extrabold my-5"> Login</Text>
                <TextInput
                    className="px-5 py-2 my-1 bg-slate-100 rounded-xl border-2"
                    value={email}
                    placeholder="Email"
                    autoCapitalize="none"
                    returnKeyType="next"
                    onSubmitEditing={() => this.password.focus()}
                    onChangeText={(text) => setEmail(text)}
                    blurOnSubmit={false}
                />
                <TextInput
                    className="px-5 py-2 my-1 bg-slate-100 rounded-xl border-2"
                    ref={(input) => this.password = input}
                    value={password}
                    placeholder="Password"
                    autoCapitalize="none"
                    returnKeyType="go"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <Button title="Login" onPress={handleLogin} />
                <Button
                    title="Forgotten Password"
                    onPress={() => navigation.navigate("ForgottenPassword")}
                />
                <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
            </KeyboardAvoidingView>
        </View>
    );
}
