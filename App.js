import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import SignUpScreen from "./screens/LoginScreens/SignUpScreen";
import ForgottenPasswordScreen from "./screens/LoginScreens/ForgottenPasswordScreen";
import LoginScreen from "./screens/LoginScreens/LoginScreen";
import { firebase_auth } from "./firebase.config.js";
import UserDashboardScreen from "./screens/UserScreens/UserDashboard.jsx";
import Header from "./components/Header/Header.jsx";
import UserProfileScreen from "./screens/UserScreens/UserProfile.jsx";
import ProductionDashboardScreen from "./screens/UserScreens/ProductionDashboard.jsx";

const Stack = createNativeStackNavigator();

export default function App() {
    const [user, setUser] = useState(null);
    const auth = firebase_auth;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={user ? "UserDashboard" : "Login"}>
                {user ? (
                    <>
                        <Stack.Screen
                            name="UserDashboard"
                            component={UserDashboardScreen}
                            options={({ navigation }) => ({
                                headerTitle: () => <Header navigation={navigation} firstScreen />,
                                headerBackVisible: false,
                            })}
                        />
                        <Stack.Screen
                            name="ProductionDashboard"
                            component={ProductionDashboardScreen}
                            options={({ navigation }) => ({
                                headerTitle: () => <Header navigation={navigation} />,
                                headerBackVisible: false,
                            })}
                        />
                        <Stack.Screen
                            name="UserProfile"
                            component={UserProfileScreen}
                            options={({ navigation }) => ({
                                headerTitle: () => <Header navigation={navigation} profileScreen/>,
                                headerBackVisible: false
                              })}
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
