import { View, Text, TouchableOpacity } from "react-native";
import ProfilePicture from "../ProfileElements/ProfilePicture";
import { useEffect } from "react";

export default function ProductionButton({ navigation, production }) {
    const participantString = `${Object.keys(production.participants).length} participant${Object.keys(production.participants).length === 1 ? "" : "s"}`;
    

    return (
        <TouchableOpacity onPress={() => navigation.navigate("ProductionDashboard", {playCode: production.playCode})} className="w-max bg-slate-200 flex-col justify-between p-4 h-36 rounded-lg mt-3 border-2 ">
            <Text className="text-2xl font-extrabold text-ellipsis" numberOfLines={1}>
                {production.playName}
            </Text>
            <Text className="text-xl font-semibold">{participantString}</Text>
            <View className="flex-row gap-1">
                {Object.keys(production.participants).map((id) => {
                return <ProfilePicture key={id} dimensions={10} userId={id} />;
                }
                )}
            </View>
        </TouchableOpacity>
    );
}
