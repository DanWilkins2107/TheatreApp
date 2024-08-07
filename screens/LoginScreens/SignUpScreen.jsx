import { Text, View, KeyboardAvoidingView } from "react-native";
import { useState, useContext } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import { firebase_auth, firebase_db } from "../../firebase.config.js";
import FormField from "../../components/Form/FormField.jsx";
import FormButton from "../../components/Form/FormButton.jsx";
import LoadingWheel from "../../components/Loading/LoadingWheel.jsx";
import TextButton from "../../components/Form/TextButton.jsx";
import { AlertContext } from "../../components/Alert/AlertProvider.jsx";

function ChooseProfileColor() {
    const colorArray = [
        "#ff0000",
        "#ddaa00",
        "#00ff00",
        "#00aaff",
        "#0000ff",
        "#aa00ff",
        "#ff00aa",
        "#ffaaaa",
        "#aaffaa",
        "#aaaaff",
        "#ffffaa",
        "#ffaaff",
    ];

    return colorArray[Math.floor(Math.random() * colorArray.length)];
}

export default function SignUpScreen({ navigation }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordMatching, setIsPasswordMatching] = useState(false);
    const [loading, setLoading] = useState(false);
    const auth = firebase_auth;
    const db = firebase_db;
    const { setAlert } = useContext(AlertContext);

    const handleSignUp = async () => {
        if (isPasswordMatching) {
            setAlert("Passwords do not match", "bg-red-500", "exclamation-circle");
            return;
        }

        try {
            setLoading(true);
            const response = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(response.user, { displayName: `${firstName} ${lastName}` });
            const color = ChooseProfileColor();
            set(ref(db, "users/" + response.user.uid), {
                firstName: firstName,
                lastName: lastName,
                email: email,
                profileBackground: color,
            });
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setAlert("Email already in use.", "bg-red-500", "exclamation-circle");
                return;
            }
            if (error.code === "auth/invalid-email") {
                setAlert("Please enter a valid email", "bg-red-500", "exclamation-circle");
                return;
            }
            if (error.code === "auth/weak-password" || error.code === "auth/missing-password") {
                setAlert(
                    "Password must be at least 6 characters long",
                    "bg-red-500",
                    "exclamation-circle"
                );
                return;
            }
            setAlert("Could not create account", "bg-red-500", "exclamation-circle");
        } finally {
            setLoading(false)
        }
    };

    return (
        <View className="flex-1 mx-10 justify-center">
            <KeyboardAvoidingView behavior="position">
                <FormField
                    value={firstName}
                    placeholder="First Name"
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
                    <LoadingWheel />
                ) : (
                    <>
                        <FormButton title="Create Account" onPress={handleSignUp} />
                        <TextButton
                            text="Back to Login"
                            onPress={() => navigation.navigate("Login")}
                        />
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
    );
}
