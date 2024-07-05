import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ProfilePictureArray from "../Participants/ProfilePictureArray";

export default function BudgetInfo({budget, onClick}) {
    const participants = budget.participants || {};
    return (
        <TouchableOpacity
            onPress={onClick}
            className="flex bg-neutral-100 p-3 border-2 rounded-lg my-2 w-full "
        >
            <View className="flex flex-row justify-between items-center">
                <Text className="text-2xl font-bold">{budget.name}</Text>
                {/* Not sure we need the arrow all the time? Idk tho again what do u think?*/}
                <Icon name="chevron-right" size={20} />
            </View>
            <Text className="text-lg font-light">Budget: £{budget.budget}</Text>
            <ProfilePictureArray participants={Object.keys(participants)} number={5} />
        </TouchableOpacity>
    );
}
