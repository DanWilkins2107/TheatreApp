import { Button, Text, View } from "react-native";
import { signOut } from "firebase/auth";
import { firebase_auth } from "../../firebase.config.js";

export default function HomeScreen({ navigation }) {
    const auth = firebase_auth;

    const handleSignOut = () => {
        try {
            signOut(auth);
        } catch (error) {
            alert("sign out failed:", error.message);
        }
    };

    return (
        <View className="flex-1 mx-10 justify-center">
            <Text className="text-center text-3xl font-extrabold">
                Welcome{" "}
                {auth.currentUser.displayName ? auth.currentUser.displayName.split(" ")[0] : ""}
            </Text>
            <Button title="Log Out" onPress={handleSignOut} />
        </View>
    );
}
