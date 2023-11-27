import { View, Text, TouchableOpacity } from "react-native";
import GeneralModal from "../GeneralModal/GeneralModal.jsx";
import FormField from "../Form/FormField.jsx";
import { firebase_auth, firebase_db } from "../../firebase.config.js";
import { useState } from "react";
import EditInfo from "../Form/EditInfo.jsx";
import { set, ref } from "firebase/database";

export default function UserDetailsModal(props) {
    const db = firebase_db;
    const auth = firebase_auth;
    const [initialFirstName, setInitialFirstName] = useState(auth.currentUser.displayName);
    const [firstName, setFirstName] = useState(auth.currentUser.displayName);
    const [initialLastName, setInitialLastName] = useState(auth.currentUser.displayName);
    const [lastName, setLastName] = useState(auth.currentUser.displayName);
    return (
        <GeneralModal closeModal={props.closeModal}>
            <View className="flex flex-col items-center">
                <EditInfo
                    title="First Name"
                    variableToEdit={firstName}
                    initialValue={initialFirstName}
                    onChangeFunction={(text) => {
                        setFirstName(text);
                    }}
                    onSubmitFunction={() => {
                        set(ref(db, "users/" + auth.currentUser.uid + "/firstName"), firstName);
                    }}
                />
                <View className="h-50 bg-orange-500" />
                <EditInfo
                    title="Last Name"
                    variableToEdit={lastName}
                    initialValue={initialLastName}
                    onChangeFunction={(text) => {
                        setLastName(text);
                    }}
                    onSubmitFunction={() => {
                        set(ref(db, "users/" + auth.currentUser.uid + "/lastName"), lastName);
                    }}
                />
            </View>
        </GeneralModal>
    );
}
