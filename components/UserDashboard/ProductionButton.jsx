import { View, Text, TouchableOpacity } from "react-native";

export default function ProductionButton({ production }) {
    let memberString = production.no_of_members;
    memberString += production.no_of_members === 1 ? " member" : " members";
    return (
        <TouchableOpacity className="w-max bg-slate-200 flex-col justify-between p-4 h-36 rounded-lg mt-3 border-2 ">
            <Text className="text-2xl font-extrabold text-ellipsis" numberOfLines={1}>
                {production.name}
            </Text>
            <Text className="text-xl font-semibold">{memberString}</Text>
            <View className="flex-row gap-1">
                {production.ids.map((id) => {
                return <View className="w-10 h-10 rounded-full bg-blue-500" key={id}></View>})}
            </View>
        </TouchableOpacity>
    );
}
