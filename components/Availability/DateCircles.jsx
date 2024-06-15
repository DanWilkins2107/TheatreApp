import { View, Text, TouchableOpacity } from "react-native";

export default function DateCircles({ number, onPress }) {
    return <TouchableOpacity className="rounded-full bg-blue-100 w-10 h-10 items-center justify-center border-2" onPress={onPress}>
        <Text className="font-semibold text-center">{number}</Text>
    </TouchableOpacity>
}