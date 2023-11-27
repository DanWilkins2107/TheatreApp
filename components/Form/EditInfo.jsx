import { View, Text, TouchableOpacity } from "react-native";
import FormField from "../Form/FormField.jsx";

export default function EditInfo(props) {
    return (
        <View className="w-10/12 flex flex-col gap-2">
            <Text className="text-2xl font-extrabold text-center">{props.title}</Text>
            <FormField
                value={props.variableToEdit}
                onChangeText={(text) => {props.onChangeFunction(text)}}
            />
            <View className="flex flex-row justify-around">
                <TouchableOpacity
                    className="bg-green-200 border-2 border-black rounded-3xl p-2 flex items-center justify-center w-5/12"
                    onPress={() => {props.onSubmitFunction()}}
                >
                    <Text className="text-black font-bold">Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="border-2 border-black rounded-3xl p-2 w-5/12 flex items-center justify-center"
                    onPress={() => props.onChangeFunction(props.initialValue)}
                >
                    <Text className="text-black font-bold flex items-center justify-center ">
                        Reset
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
