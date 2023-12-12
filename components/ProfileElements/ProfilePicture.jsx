import { Image, Text, View } from "react-native";
import LoadingWheel from "../Loading/LoadingWheel.jsx"
import { useState, useEffect } from "react";
import { firebase_db } from "../../firebase.config.js";
import { ref, get } from "firebase/database"

export default function ProfilePicture({dimensions, textSize, userId}) {
    const [loading, setLoading] = useState(true);
    const [profileURL, setProfileURL] = useState("");
    const [initials, setInitials] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("white");

    useEffect(() => {
        const db = firebase_db;
        const userRef = ref(db, "users/" + userId);
        get(userRef).then((userSnapshot) => {
            if (!userSnapshot.exists()) return;
            const userData = userSnapshot.val();
            setProfileURL(userData.profileURL);
            setInitials(userData.firstName[0] + userData.lastName[0]);
            setBackgroundColor(userData.profileBackground);
            setLoading(false);
        });
    }
    , []);

    return (
        <>
            {loading ? (
                <View className={`w-${dimensions} h-${dimensions} rounded-full border-2 items-center justify-center`}>
                    <LoadingWheel />
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
                <View className={`w-${dimensions} h-${dimensions} rounded-full border-2 items-center justify-center bg-[${backgroundColor}]`}>
                    <Text className={`font-extrabold text-${textSize} p-0 m-0`}>
                        {initials}
                    </Text>
                </View>
            )}
        </>
    );
}
