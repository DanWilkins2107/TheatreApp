import { View, Text } from "react-native";

// TODO:
// - Check admin + change playcode option
// - QR code for joining
// - Big Letters

export default function PlayCodeModal({ playcode }) {
    console.log(playcode);

    return (
        <View className="flex-col items-center p-3">
            <View className="bg-slate-400 h-36 w-36" />
            <Text className="text-xl text-black">{playcode}</Text>
        </View>
    );
}
