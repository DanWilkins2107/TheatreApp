import { Text, View, Button } from "react-native";

export default function ForgottenPasswordScreen({ navigation }) {
    return (
        <View>
            <Text>
                Forgotten Password
            </Text>
            <Button title = "Back to Login"
                onPress = {() => navigation.navigate("Login")} />
        </View>
    )
}