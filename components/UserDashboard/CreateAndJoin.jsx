import { Text, TouchableOpacity, View } from "react-native";

export default function CreateAndJoinButtons(props) {
    return (
        <TouchableOpacity className="flex-col w-5/12 h-36 justify-around items-center p-3 rounded-lg bg-red-400 border-2">
            <Text className="text-3xl font-extrabold">{props.title}</Text>
            <View className="items-center">{props.children}</View>
        </TouchableOpacity>
    );
}
