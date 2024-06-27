import { TouchableOpacity } from "react-native";
import Title from "../TextStyles/Title";

export default function ProductionDashboardButton({ text, onPress, children }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row p-3 bg-red-400 mb-2 border-2 border-black rounded-lg items-center"
        >
            {children}
            <Title extraClassName="ml-8">{text}</Title>
        </TouchableOpacity>
    );
}
