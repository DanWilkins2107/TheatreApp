import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import SignUpScreen from "./screens/LoginScreens/SignUpScreen";
import ForgottenPasswordScreen from "./screens/LoginScreens/ForgottenPasswordScreen";
import LoginScreen from "./screens/LoginScreens/LoginScreen";
import HomeScreen from "./screens/HomeScreens/HomeScreen";
import { firebase_auth } from "./firebase.config.js";

const Stack = createNativeStackNavigator();

export default function App() {
    const [user, setUser] = useState(null);
    const auth = firebase_auth;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log("User state changed. Current user is: ", user);
            setUser(user);
        });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
                {user ? (
                    <>
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="SignUp"
                            component={SignUpScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="ForgottenPassword"
                            component={ForgottenPasswordScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
