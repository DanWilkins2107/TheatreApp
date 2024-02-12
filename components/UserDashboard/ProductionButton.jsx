import { View, Text, TouchableOpacity } from "react-native";
import ProfilePicture from "../ProfileElements/ProfilePicture";

export default function ProductionButton({ navigation, production }) {
    const noOfParticipants = Object.keys(production.participants).length;
    const participantString = `${noOfParticipants} participant${
        noOfParticipants === 1 ? "" : "s"
    }`;
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("ProductionDashboard", { playCode: production.playCode })
            }
            className="w-max bg-slate-200 flex-col justify-between p-4 h-36 rounded-lg mt-3 border-2 "
        >
            <Text className="text-2xl font-extrabold text-ellipsis" numberOfLines={1}>
                {production.playName}
            </Text>
            <Text className="text-xl font-semibold">{participantString}</Text>
            <View className="w-max flex flex-row">
                {Object.keys(production.participants)
                    .slice(0, 5)
                    .map((id, index) => {
                        return (
                            <View key={id}>
                                <ProfilePicture
                                    key={2 * index}
                                    dimensions={10}
                                    textSize="2xl"
                                    userId={id}
                                    className="mx-10"
                                    loadingSize="small"
                                />
                                <View key={2 * index + 1} className="w-1" />
                            </View>
                        );
                    })}

                {noOfParticipants > 5 && (
                    <View className="w-10 h-10 rounded-full bg-white justify-center items-center border-2 border-black">
                        <Text className="font-semibold">
                            {`+${noOfParticipants - 5}`}
                        </Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}
