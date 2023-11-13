import { Text, View, Button } from "react-native";

export default function SignUpScreen({ navigation }) {
    return (
        <View>
            <Text>
                Sign Up
            </Text>
            <Button title = "Back to Login"
                onPress = {() => navigation.navigate("Login")} />
        </View>
    )
}