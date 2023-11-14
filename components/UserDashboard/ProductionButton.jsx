import { View, Text, TouchableOpacity } from "react-native";

export default function ProductionButton(production) {
    let memberString = production.members;
    memberString += production.members === 1 ? " member" : " members";
    return (
        <TouchableOpacity className = "w-max bg-slate-200 flex-col justify-between p-4 h-36 rounded-lg mt-3">
            <Text className="text-3xl font-bold">{production.name}</Text>
            <Text className="text-xl font-bold">{memberString}</Text>
            <View className="flex-row gap-1">
                <View className="w-10 h-10 rounded-full bg-blue-500"></View>
                <View className="w-10 h-10 rounded-full bg-red-500"></View>
                <View className="w-10 h-10 rounded-full bg-orange-500"></View>
            </View>
        </TouchableOpacity>
    );
}
