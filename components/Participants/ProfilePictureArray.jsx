import { View, Text } from "react-native";
import ProfilePicture from "../ProfileElements/ProfilePicture";

export default function ProfilePictureArray({ participants, number, size }) {
    return (
        <View className="w-max flex flex-row mt-1">
            {participants
                .slice(0, number || 5)
                .map((id, index) => {
                    return (
                        <View key={id}>
                            <ProfilePicture
                                key={2 * index}
                                dimensions={size || 10}
                                textSize="2xl"
                                userId={id}
                                className="mx-10"
                                loadingSize="small"
                            />
                            <View key={2 * index + 1} className="w-1" />
                        </View>
                    );
                })}

            {participants.length > (number || 5) && (
                <View className="w-10 h-10 rounded-full bg-white justify-center items-center border-2 border-black">
                    <Text className="font-semibold">{`+${participants.length - 5}`}</Text>
                </View>
            )}
        </View>
    );
}
