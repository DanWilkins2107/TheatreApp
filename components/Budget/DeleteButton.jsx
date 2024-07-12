import { TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function DeleteButton({ onPress }) {
    return (
        <TouchableOpacity
            className="bg-red-400 flex-row border-2 border-black rounded-3xl p-[7] items-center justify-center w-3/4 mt-4"
            onPress={onPress}
        >
            <Icon color="black" name="trash" size={20} />
            <Text className="font-bold ml-4">Delete Expense</Text>
        </TouchableOpacity>
    );
}
