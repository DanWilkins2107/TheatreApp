import { View, Text } from "react-native";
import GeneralModal from "../GeneralModal/GeneralModal.jsx";

export default function UserDetailsModal(props) {
    return (
        <GeneralModal closeModal={props.closeModal}>
            <View>
                <Text>
                    User Details Modal
                </Text>
            </View>
        </GeneralModal>
    );
}