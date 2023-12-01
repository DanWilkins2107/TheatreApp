import { View, Text, TouchableOpacity } from "react-native";

export default function ProductionButton({ navigation, production }) {
    let participantString = `${Object.keys(production.participants).length} participant${Object.keys(production.participants).length === 1 ? "" : "s"}`;
    
    return (
        <TouchableOpacity onPress={() => navigation.navigate("ProductionDashboard", {playCode: production.playCode})} className="w-max bg-slate-200 flex-col justify-between p-4 h-36 rounded-lg mt-3 border-2 ">
            <Text className="text-2xl font-extrabold text-ellipsis" numberOfLines={1}>
                {production.playName}
            </Text>
            <Text className="text-xl font-semibold">{participantString}</Text>
            <View className="flex-row gap-1">
                {Object.keys(production.participants).map((id) => {
                return <View className={`w-10 h-10 bg rounded-full ${["bg-orange-400", "bg-lime-400", "bg-teal-400", "bg-fuchsia-400"][Math.floor(Math.random() * 4)]}`} key={id}></View>})}
            </View>
        </TouchableOpacity>
    );
}
