import { View, Text } from "react-native";
import FormField from "../Form/FormField.jsx";
import SmallFormButton from "./SmallFormButton.jsx";

export default function EditInfo(props) {
    return (
        <View className="w-10/12 flex flex-col gap-2">
            <Text className="text-2xl font-extrabold text-center mb-1">{props.title}</Text>
            <FormField value={props.variableToEdit} onChangeText={(text) => props.onChange(text)} />
            <View className="flex flex-row justify-around">
                <SmallFormButton
                    backgroundColor="bg-green-400"
                    title="Submit"
                    onPress={props.onSubmit}
                />
                <SmallFormButton
                    backgroundColor="bg-white"
                    title="Reset"
                    onPress={() => props.onChange(props.initialValue)}
                />
            </View>
        </View>
    );
}
