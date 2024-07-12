import { View } from "react-native";
import Subtitle from "../TextStyles/Subtitle";
import DeleteButton from "./DeleteButton";

export default function DeleteExpenseModal({ onPress }) {
    return (
        <View className="flex-col items-center mb-8">
            <Subtitle extraClassName={"text-center"}>Are you sure you want to delete this expense?</Subtitle>
            <DeleteButton onPress={onPress} />
        </View>
    );
}
