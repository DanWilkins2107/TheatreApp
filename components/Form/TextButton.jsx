import { TouchableOpacity, Text } from "react-native";

export default function TextButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>{message}</Text>
        </TouchableOpacity>
    );
}
