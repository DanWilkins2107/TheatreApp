import { View, Text, TouchableOpacity } from "react-native";
import GenericModal from "../GeneralModal/GeneralModal.jsx";
import { useState } from "react";
import FormField from "../Form/FormField.jsx";

export default function ReportErrorModal(props) {
    const [errorDescription, setErrorDescription] = useState("");
    return (
        <GenericModal closeModal={props.closeModal}>
            <View className="flex flex-col items-center h-5/6 justify-between" >
                <Text className="text-2xl font-extrabold text-center mb-1">Report Error</Text>
                <View className="w-10/12 h-32 mb-6">
                    <FormField
                        value={errorDescription}
                        onChangeText={setErrorDescription}
                        extraClassName="h-32"
                        multiline
                    />
                </View>
                <TouchableOpacity
                    className="bg-green-200 border-2 border-black rounded-3xl p-2 flex items-center justify-center w-5/12"
                    onPress={() => {
                        alert("Report submitted!");
                    }}
                >
                    <Text className="text-black font-bold">Submit</Text>
                </TouchableOpacity>
            </View>
        </GenericModal>
    );
}
