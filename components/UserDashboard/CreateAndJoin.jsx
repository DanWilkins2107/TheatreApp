import { Text, Image, TouchableOpacity } from "react-native";

export default function CreateAndJoinButtons(props) {
    return (
        <TouchableOpacity className="flex-col w-5/12 h-36 justify-between bg-red-400 items-center p-3 rounded-lg">
            <Text className="text-2xl font-bold">{props.title}</Text>
            <Text>IMAGE HERE</Text>
        </TouchableOpacity>
    );
}
