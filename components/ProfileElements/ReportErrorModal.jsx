import { View, Text } from "react-native";
import GenericModal from "../GeneralModal/GeneralModal.jsx";
export default function ReportErrorModal(props) {
    return (
        <GenericModal closeModal={props.closeModal}>
            <View>
                <Text>
                    ReportErrorModal
                </Text>
            </View>
        </GenericModal>
    );
}