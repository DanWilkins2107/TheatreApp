import { View, Text } from "react-native";
import GenericModal from "../GeneralModal/GeneralModal.jsx";
import { firebase_auth } from "../../firebase.config.js";
import { useState } from "react";
import FormField from "../Form/FormField.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native-web";

export default function ContactInformationModal(props) {
    let auth = firebase_auth;
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingPhoneNumber, setEditingPhoneNumber] = useState(false);
    const [email, setEmail] = useState(auth.currentUser.email);
    const [phoneNumber, setPhoneNumber] = useState(auth.currentUser.phoneNumber);
    return (
        <GenericModal closeModal={props.closeModal}>
            <Text>Works</Text>
        </GenericModal>
    );
}
