import { Text, View, Button } from "react-native";

export default function LoginScreen({ navigation }) {
    return (
        <View>
            <Text>
                Login
            </Text>
            <Button title = "Forgotten Password"
                onPress = {() => navigation.navigate("ForgottenPassword")} />
            <Button title = "Sign Up"
                onPress = {() => navigation.navigate("SignUp")} />
        </View>
    )
}