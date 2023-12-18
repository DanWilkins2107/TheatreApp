import { Text, TouchableOpacity } from "react-native";

export default function SmallFormButton({ backgroundColor, title, onPress }) {
    return (
        <TouchableOpacity
            className={`${backgroundColor} border-2 border-black rounded-3xl p-2 flex items-center justify-center w-5/12`}
            onPress={onPress}
        >
           <Text className="text-black font-bold">{title}</Text>
        </TouchableOpacity>
    );
}
