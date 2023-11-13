import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, Button } from "react-native";

function Screen1({ navigation }) {
    return (
        <View>
            <Text>Screen 1</Text>
            <Button title="Go to screen 2" onPress={() => navigation.navigate("Screen 2")} />
        </View>
    );
}

function Screen2({ navigation }) {
    return (
        <View>
            <Text>Screen 2</Text>
            <Button title="Go to screen 1" onPress={() => navigation.navigate("Screen 1")} />
        </View>
    );
}

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Screen 1" component={Screen1} />
                <Stack.Screen name="Screen 2" component={Screen2} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
