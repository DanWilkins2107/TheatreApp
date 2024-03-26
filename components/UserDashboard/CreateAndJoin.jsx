import { Text, TouchableOpacity, View } from "react-native";
import Title from "../TextStyles/Title";

export default function CreateAndJoinButtons(props) {
    return (
        <TouchableOpacity onPress={props.onClick} className="flex-col w-5/12 h-36 justify-around items-center p-3 rounded-lg bg-red-400 border-2">
            <Title>{props.title}</Title>
            <View className="items-center">{props.children}</View>
        </TouchableOpacity>
    );
}
