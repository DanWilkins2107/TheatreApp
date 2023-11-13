import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "./screens/LoginScreens/SignUpScreen";
import ForgottenPasswordScreen from "./screens/LoginScreens/ForgottenPasswordScreen";
import LoginScreen from "./screens/LoginScreens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="ForgottenPassword" component={ForgottenPasswordScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
