import { View, Text, KeyboardAvoidingView } from "react-native";
import FormField from "../Form/FormField";
import FormButton from "../Form/FormButton";
import { useState } from "react";
import GeneralModal from "../GeneralModal/GeneralModal";

export default function JoinProductionModal({ closeModal }) {
    const [code, setCode] = useState("");
    return (
        <GeneralModal closeModal={closeModal}>
            <View className="flex flex-col p-3 h-full">
                <Text className="text-3xl font-extrabold text-center mb-3">Join Production</Text>
                <View className="flex-1" />
                <Text className="text-lg font-semibold text-center">Enter the code for the production you wish to join.</Text>
                <FormField value={code} placeholder="Code" onChangeText={(text) => setCode(text)} />
                <View className="flex-1" />
                <FormButton title="Join" 
                onPress={() => alert("Joined")}/>
            </View>
        </GeneralModal>
    );
}
