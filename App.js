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
import BudgetHomeScreen from "./screens/ProductionScreens/BudgetHomeScreen.jsx";
import ProductionDashboardScreen from "./screens/ProductionScreens/ProductionDashboard.jsx";
import { View } from "react-native";
import { AlertProvider } from "./components/Alert/AlertProvider.jsx";
import Alert from "./components/Alert/Alert.jsx";
import { ModalProvider } from "./components/Modal/ModalProvider.jsx";
import Modal from "./components/Modal/Modal.jsx";
import BudgetAddExpense from "./screens/ProductionScreens/BudgetAddExpense.jsx";
import AdminScreen from "./screens/AdminScreens/AdminScreen.jsx";

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
        <AlertProvider>
            <ModalProvider>
                <View className="h-fit w-full z-30 absolute">
                    <Alert />
                </View>
                <View className="h-fit w-full z-20 absolute">
                    <Modal />
                </View>
                <NavigationContainer className="z-10 absolute">
                    <Stack.Navigator initialRouteName={user ? "UserDashboard" : "Login"}>
                        {user ? (
                            <>
                                <Stack.Screen
                                    name="UserDashboard"
                                    component={UserDashboardScreen}
                                    options={({ navigation }) => ({
                                        headerTitle: () => (
                                            <Header navigation={navigation} firstScreen />
                                        ),
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
                                        headerTitle: () => (
                                            <Header navigation={navigation} profileScreen />
                                        ),
                                        headerBackVisible: false,
                                    })}
                                />
                                <Stack.Screen
                                    name="BudgetHome"
                                    component={BudgetHomeScreen}
                                    options={({ navigation }) => ({
                                        headerTitle: () => (
                                            <Header navigation={navigation} />
                                        ),
                                        headerBackVisible: false,
                                    })}
                                />
                                <Stack.Screen
                                    name="BudgetAddExpense"
                                    component={BudgetAddExpense}
                                    options={({ navigation }) => ({
                                        headerTitle: () => (
                                            <Header navigation={navigation} />
                                        ),
                                        headerBackVisible: false,
                                    })}
                                />
                                <Stack.Screen
                                    name="Admin"
                                    component={AdminScreen}
                                    options={({ navigation }) => ({
                                        headerTitle: () => (
                                            <Header navigation={navigation} />
                                        ),
                                        headerBackVisible: false,
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
            </ModalProvider>
        </AlertProvider>
    );
}
