
import { Image, Text, TouchableOpacity, View } from "react-native";
import LoadingWheel from "../Loading/LoadingWheel.jsx";

export default function ProfilePicture({loading, profileURL, displayName}) {
    return (
        <>
            {loading ? (
                <View className="w-28 h-28 rounded-full border-2 items-center justify-center">
                    <LoadingWheel />
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
                        {displayName.split(" ")[0][0]}
                        {displayName.split(" ")[1][0]}
                    </Text>
                </View>
            )}
        </>
    );
}
