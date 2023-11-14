import {
    Text,
    View,
    Button,
    TextInput,
    KeyboardAvoidingView,
    ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebase_auth } from "../../firebase.config.js";
import FormButton from "../../components/FormButton.jsx";

export default function SignUpScreen({ navigation }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMissmatch, setPasswordMismatch] = useState(false);
    const [loading, setLoading] = useState(false);
    const auth = firebase_auth;

    const handleSignUp = async () => {
        setLoading(true);

        if (passwordMissmatch) {
            console.log("Passwords do not match");
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile( response.user, {displayName: `${firstName} ${lastName}`} );
            console.log(response);
        } catch (error) {
            console.log(error);
            alert(`Sign up failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 mx-10 justify-center">
            <KeyboardAvoidingView behavior="position">
                <TextInput
                    className="px-5 py-2 my-1 bg-slate-100 rounded-xl border-2"
                    value={firstName}
                    placeholder="First Name"
                    autoCapitalize="words"
                    onChangeText={(text) => setFirstName(text.replace(/\s/g, ""))}
                    blurOnSubmit={false}
                />
                <TextInput
                    className="px-5 py-2 my-1 bg-slate-100 rounded-xl border-2"
                    value={lastName}
                    placeholder="Last Name"
                    autoCapitalize="words"
                    onChangeText={(text) => setLastName(text.replace(/\s/g, ""))}
                    blurOnSubmit={false}
                />
                <TextInput
                    className="px-5 py-2 my-1 bg-slate-100 rounded-xl border-2"
                    value={email}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={(text) => setEmail(text.replace(/\s/g, ""))}
                    blurOnSubmit={false}
                />
                <TextInput
                    className="px-5 py-2 my-1 bg-slate-100 rounded-xl border-2"
                    value={password}
                    placeholder="Password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text.replace(/\s/g, ""))}
                    blurOnSubmit={false}
                />
                <TextInput
                    className={`px-5 py-2 my-1 bg-slate-100 rounded-xl border-2 ${
                        passwordMissmatch ? "border-red-500" : ""
                    }`}
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    returnKeyType="go"
                    onChangeText={(text) => {
                        setConfirmPassword(text.replace(/\s/g, ""));
                        setPasswordMismatch(password != text.replace(/\s/g, ""));
                    }}
                />
                {passwordMissmatch ? (
                    <Text className="text-red-500 text-center">Passwords do not match</Text>
                ) : (
                    <></>
                )}
                {loading ? (
                    <ActivityIndicator size="large" color="#f1f5f9" />
                ) : (
                    <>
                        <FormButton
                            blockClassName="bg-slate-700 justify-center w-40 h-10 self-center rounded-xl m-5"
                            textClassName="text-white text-center text-lg font-extrabold"
                            title="Create Account"
                            onPress={handleSignUp}
                        />
                        <Button
                            title="Back to Login"
                            onPress={() => navigation.navigate("Login")}
                        />
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
    );
}
