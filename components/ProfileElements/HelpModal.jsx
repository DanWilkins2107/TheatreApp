import { View, Text } from "react-native";
import GenericModal from "../GeneralModal/GeneralModal.jsx";
import { useState } from "react";
import SmallFormButton from "../Form/SmallFormButton.jsx";

export default function HelpModal({navigation, closeModal}) {

    return (
        <GenericModal closeModal={closeModal}>
            <View className="flex flex-col items-center h-5/6 justify-between">
                <Text className="text-2xl font-extrabold text-center mb-1">Help</Text>
                <SmallFormButton
                    title="Report a problem"
                    onClick={() => {
                        navigation.navigate("HelpScreen", { type: "ReportError" });
                    }}
                />
                <SmallFormButton
                    title="Ask a question"
                    onClick={() => {
                        navigation.navigate("HelpScreen", { type: "AskQuestion" });
                    }}
                />
                <SmallFormButton
                    title="Suggest an improvement"
                    onClick={() => {
                        navigation.navigate("HelpScreen", { type: "SuggestImprovement" });
                    }}
                />
            </View>
        </GenericModal>
    );
}
