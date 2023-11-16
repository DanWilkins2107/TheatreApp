import { Text, View, Button, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import FormField from "../../components/FormField.jsx";
import { firebase_auth } from "../../firebase.config.js";
import FormButton from "../../components/FormButton.jsx";

export default function SignUpScreen({ navigation }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordMatching, setIsPasswordMatching] = useState(false);
    const [loading, setLoading] = useState(false);
    const auth = firebase_auth;

    const handleSignUp = async () => {
        setLoading(true);

        if (isPasswordMatching) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(response.user, { displayName: `${firstName} ${lastName}` });
        } catch (error) {
            alert(`Sign up failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 mx-10 justify-center">
            <KeyboardAvoidingView behavior="position">
                <FormField
                    value={firstName}
                    placeholder="FirstName"
                    onChangeText={(text) => setFirstName(text.replace(/\s/g, ""))}
                />
                <FormField
                    value={lastName}
                    placeholder="Last Name"
                    onChangeText={(text) => setLastName(text.replace(/\s/g, ""))}
                />
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
                <FormField
                    extraClassName={isPasswordMatching ? "border-red-500" : ""}
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    autoCapitalize="none"
                    secureTextEntry
                    onChangeText={(text) => {
                        setConfirmPassword(text.replace(/\s/g, ""));
                        setIsPasswordMatching(password != text.replace(/\s/g, ""));
                    }}
                />
                {isPasswordMatching ? (
                    <Text className="text-red-500 text-center">Passwords do not match</Text>
                ) : (
                    <></>
                )}
                {loading ? (
                    <ActivityIndicator size="large" color="#f1f5f9" />
                ) : (
                    <>
                        <FormButton title="Create Account" onPress={handleSignUp} />
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
