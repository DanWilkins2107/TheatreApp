import { Text, TouchableOpacity, View } from "react-native";
import ProfilePicture from "../ProfileElements/ProfilePicture";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function BudgetInfo(props) {
    const budget = props.budget;
    const participants = budget.participants;

    return (
        <TouchableOpacity
            onPress={props.onClick}
            className="flex bg-neutral-100 p-3 border-2 rounded-lg my-2"
        >
            <View className="flex flex-row justify-between items-center">
                <Text className="text-2xl font-bold">{budget.name}</Text>
                <FontAwesomeIcon icon={icon({ name: "chevron-right" })} size={20} />
            </View>
            <Text className="text-lg font-light">Budget: £{budget.budget}</Text>
            <View className="w-max flex flex-row mt-1">
                {Object.keys(participants)
                    .slice(0, 5)
                    .map((id, index) => {
                        return (
                            <View key={id}>
                                <ProfilePicture
                                    key={2 * index}
                                    dimensions={10}
                                    textSize="2xl"
                                    userId={id}
                                    className="mx-10"
                                    loadingSize="small"
                                />
                                <View key={2 * index + 1} className="w-1" />
                            </View>
                        );
                    })}

                {participants.length > 5 && (
                    <View className="w-10 h-10 rounded-full bg-white justify-center items-center border-2 border-black">
                        <Text className="font-semibold">{`+${participants.length - 5}`}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}
