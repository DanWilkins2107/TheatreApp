import { Button, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { get, ref, child } from "firebase/database";
import { firebase_auth, firebase_db } from "../../firebase.config.js";

export default function UserProfileScreen({ navigation }) {
    const [userName, setUserName] = useState("");
    const auth = firebase_auth;
    const db = firebase_db;
    
    useEffect(() => {
        get(child(ref(db), `users/${auth.currentUser.uid}`)).then((snapshot) => {
            setUserName(snapshot.exists() ? [snapshot.val().firstName, snapshot.val().lastName] : "Anonymous");
        });
    }, []);

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
                Welcome {userName ? `${userName[0]} ${userName[1]}` : ""}
            </Text>
            <Button title="Log Out" onPress={handleSignOut} />
        </View>
    );
}
