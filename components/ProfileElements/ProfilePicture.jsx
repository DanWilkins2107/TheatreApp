import { Image, Text, View } from "react-native";
import LoadingWheel from "../Loading/LoadingWheel.jsx";
import { useState, useEffect } from "react";
import { firebase_db } from "../../firebase.config.js";
import { ref, onValue } from "firebase/database";

export default function ProfilePicture({ dimensions, textSize, userId, loadingSize }) {
    const [loading, setLoading] = useState(true);
    const [profileURL, setProfileURL] = useState("");
    const [initials, setInitials] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("white");

    useEffect(() => {
        const db = firebase_db;
        const userRef = ref(db, "users/" + userId);

        onValue(userRef, (userSnapshot) => {
            if (!userSnapshot.exists()) return;
            const userData = userSnapshot.val();
            setProfileURL(userData.profileURL);
            if (!userData.firstName || !userData.lastName) return;
            setInitials(userData.firstName[0] + userData.lastName[0]);
            setBackgroundColor(userData.profileBackground || "white");
            setLoading(false);
        });
    }, []);

    return (
        <>
            {loading ? (
                <View
                    className={`w-${dimensions} h-${dimensions} rounded-full border-2 items-center justify-center`}
                >
                    <LoadingWheel size={loadingSize} />
                </View>
            ) : profileURL ? (
                <Image
                    className={`w-${dimensions} h-${dimensions} rounded-full border-2`}
                    source={{
                        uri: profileURL,
                    }}
                    resizeMode="cover"
                />
            ) : (
                // Style is due to errors occurring w string interpolation in background colour
                <View
                    className={`w-${dimensions} h-${dimensions} rounded-full border-2 items-center justify-center`}
                    style={{ backgroundColor: backgroundColor }}
                >
                    <Text className={`font-extrabold ${textSize} p-0 m-0`}>{initials}</Text>
                </View>
            )}
        </>
    );
}
