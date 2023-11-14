import { Button, Text, View } from "react-native";
import { signOut } from "firebase/auth";
import { firebase_auth } from "../../firebase.config.js";

export default function HomeScreen({ navigation }) {
    const auth = firebase_auth;

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Signed Out");
            })
            .catch((error) => {
                console.log("Sign Out Error", error);
								alert("sign out failed:", error.message)
            });
    };

    return (
        <View className="flex-1 mx-10 justify-center">
						<Text className="text-center text-3xl font-extrabold">Welcome {auth.currentUser.displayName}</Text>
            <Button title="Log Out" onPress={handleSignOut} />
        </View>
    );
}
