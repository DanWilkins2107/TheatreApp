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
import ProductionDashboardScreen from "./screens/ProductionScreens/ProductionDashboard.jsx";
import { View } from "react-native";
import { AlertProvider } from "./components/Alert/AlertProvider.jsx";
import Alert from "./components/Alert/Alert.jsx";
import { ModalProvider } from "./components/Modal/ModalProvider.jsx";
import Modal from "./components/Modal/Modal.jsx";
import BudgetAddExpenseScreen from "./screens/ProductionScreens/BudgetAddExpense.jsx";
import AdminScreen from "./screens/AdminScreens/AdminScreen.jsx";
import BudgetMainScreen from "./screens/ProductionScreens/BudgetMain.jsx";
import AvailabilityScreen from "./screens/ProductionScreens/Availability.jsx";
import ViewScheduleScreen from "./screens/ProductionScreens/ViewSchedule.jsx";
import SetScheduleScreen from "./screens/ProductionScreens/SetSchedule.jsx";
import Container from "./components/General/Container.jsx";

const Stack = createNativeStackNavigator();

export default function App() {
    const [user, setUser] = useState(null);
    const auth = firebase_auth;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, []);

    const makeScreen = (screen) => {
        return (props) => (
            <Container>
                <screen.component {...props} />
            </Container>
        );
    };

    const authScreens = [
        { name: "Login", component: LoginScreen, header: false },
        { name: "SignUp", component: SignUpScreen, header: false },
        { name: "ForgottenPassword", component: ForgottenPasswordScreen, header: false },
    ];

    const userScreens = [
        { name: "UserDashboard", component: UserDashboardScreen, firstScreen: true, header: true },
        { name: "UserProfile", component: UserProfileScreen, header: true, profileScreen: true },
        { name: "ProductionDashboard", component: ProductionDashboardScreen, header: true },
        { name: "BudgetAddExpense", component: BudgetAddExpenseScreen, header: true },
        { name: "BudgetMain", component: BudgetMainScreen, header: true },
        { name: "Admin", component: AdminScreen, header: true },
        { name: "Availability", component: AvailabilityScreen, header: true },
        { name: "ViewSchedule", component: ViewScheduleScreen, header: true },
        { name: "SetSchedule", component: SetScheduleScreen, header: true },
    ];

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
                        {(user ? userScreens : authScreens).map((screen) => (
                            <Stack.Screen
                                key={screen.name}
                                name={screen.name}
                                component={makeScreen(screen)}
                                options={{
                                    header: (props) => <Header {...props} {...screen} />,
                                    headerTransparent: true,
                                    headerShown: screen.header,
                                }}
                            />
                        ))}
                    </Stack.Navigator>
                </NavigationContainer>
            </ModalProvider>
        </AlertProvider>
    );
}
