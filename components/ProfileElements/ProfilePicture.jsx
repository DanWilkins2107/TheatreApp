import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { launchImageLibraryAsync } from "expo-image-picker";
import { firebase_auth, storage } from "../../firebase.config.js";
import { useState } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

export default function ProfilePicture() {
    const [profileURL, setProfileURL] = useState(firebase_auth.currentUser.photoURL || null);
    const [loading, setLoading] = useState(false);
    const auth = firebase_auth;
    const storageRef = ref(storage);

    const handleProfileChange = async () => {
        launchImageLibraryAsync({ quality: 0.1 }).then((response) => {
            if (!response.canceled) {
                setLoading(true);
                fetch(response.assets[0].uri).then((image) => {
                    image.blob().then((blob) => {
                        uploadBytes(
                            ref(
                                storageRef,
                                "images/" +
                                    auth.currentUser.uid +
                                    response.assets[0].fileName.substring(
                                        response.assets[0].fileName.lastIndexOf(".")
                                    )
                            ),
                            blob
                        ).then((snapshot) => {
                            getDownloadURL(snapshot.ref)
                                .then((url) => {
                                    updateProfile(auth.currentUser, {
                                        photoURL: url,
                                    });
                                    setProfileURL(url);
                                    setLoading(false);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        });
                    });
                });
            }
        });
    };

    return (
        <View className="w-max bg-white flex-row rounded-3xl px-4 m-2 border-2 align-middle items-center">
            <TouchableOpacity
                className="m-3 rounded-full bg-purple-300"
                onPress={() => {
                    handleProfileChange();
                }}
            >
                {loading ? (
                    <View className="w-28 h-28 rounded-full border-2 items-center justify-center">
                        <ActivityIndicator size="large" color="#f1f5f9" />
                    </View>
                ) : profileURL ? (
                    <Image
                        className="w-28 h-28 rounded-full border-2"
                        source={{
                            uri: profileURL,
                        }}
                        resizeMode="cover"
                    />
                ) : (
                    <View className="w-28 h-28 rounded-full border-2 items-center justify-center">
                        <Text className="font-extrabold text-4xl p-0 m-0">
                            {auth.currentUser.displayName.split(" ")[0][0]}
                            {auth.currentUser.displayName.split(" ")[1][0]}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
            <View className="w-[212] flex-col">
                <Text className="ml-4 text-xl font-extrabold text-ellipsis" numberOfLines={1}>
                    {auth.currentUser.displayName}
                </Text>
            </View>
        </View>
    );
}
