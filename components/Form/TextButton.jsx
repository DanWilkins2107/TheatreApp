import { TouchableOpacity, Text } from "react-native";

export default function TextButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text className="text-lg text-blue-600 text-center mt-2">{text}</Text>
        </TouchableOpacity>
    );
}
