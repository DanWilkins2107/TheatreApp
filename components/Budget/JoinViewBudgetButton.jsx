import { Text, TouchableOpacity } from "react-native";

export default function JoinViewBudgetButton({text, onPress,children}) {
    return (
        <TouchableOpacity onPress={onPress} className="flex-row p-3 bg-red-400 mb-2 border-2 border-black rounded-lg items-center">
            {children}
            <Text className="ml-8 text-3xl font-extrabold">{text}</Text>
        </TouchableOpacity>
    )
}