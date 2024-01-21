import { View, Text } from "react-native";
import { useState } from "react";
import FormField from "../Form/FormField.jsx";
import SmallFormButton from "../Form/SmallFormButton.jsx";

export default function ReportErrorModal(props) {
    const [errorDescription, setErrorDescription] = useState("");
    return (
        <>
            <View className="flex flex-col items-center h-5/6 justify-between">
                <Text className="text-2xl font-extrabold text-center mb-1">Report Error</Text>
                <View className="w-10/12 h-32 mb-6">
                    <FormField
                        value={errorDescription}
                        onChangeText={setErrorDescription}
                        extraClassName="h-32"
                        multiline
                    />
                </View>
                <SmallFormButton
                    backgroundColor="bg-green-400"
                    title="Submit"
                    onPress={() => {
                        alert("Report submitted!");
                    }}
                />
            </View>
        </>
    );
}
