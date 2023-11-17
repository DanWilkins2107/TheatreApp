import { View, Text, KeyboardAvoidingView } from "react-native";
import FormField from "../Form/FormField";
import FormButton from "../Form/FormButton";
import { useState } from "react";
import GeneralModal from "../GeneralModal/GeneralModal";

export default function CreateProductionModal({ closeModal }) {
    const [name, setname] = useState("");
    return (
        <GeneralModal closeModal={closeModal}>
            <View className="flex flex-col p-3 h-full">
                <Text className="text-3xl font-extrabold text-center mb-3">Create Production</Text>
                <View className="flex-1" />
                <Text className="text-lg font-semibold text-center">
                    Enter the name for your production.
                </Text>
                <FormField value={name} placeholder="Name" onChangeText={(name) => setCode(name)} />
                <View className="flex-1" />
                <FormButton title="Create" onPress={() => alert("Created")} />
            </View>
        </GeneralModal>
    );
}
