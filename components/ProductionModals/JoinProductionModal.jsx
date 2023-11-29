import { View, Text } from "react-native";
import FormField from "../Form/FormField";
import FormButton from "../Form/FormButton";
import { useState } from "react";
import GeneralModal from "../GeneralModal/GeneralModal";
import { firebase_auth, firebase_db } from "../../firebase.config";
import { get, ref, set, child, push } from "firebase/database";

export default function JoinProductionModal({ closeModal }) {
    const [code, setCode] = useState("");
    const [errorText, setErrorText] = useState("");
    const db = firebase_db;
    const auth = firebase_auth;

    const JoinProduction = () => {
        setErrorText("");
        const dbRef = ref(db);
        get(child(dbRef, `/productions/${code}`))
            .then((snapshot) => {
                const data = snapshot.val();
                if (data) {
                    if (data.participants && data.participants[auth.currentUser.uid]) {
                        setErrorText("You are already in this production");
                    } else {
                        set(ref(db, "productions/" + code + "/participants/" + auth.currentUser.uid), Date.now());
                        set(ref(db, "users/" + auth.currentUser.uid + "/productions/" + code), Date.now());
                        closeModal();
                    }
                } else {
                    setErrorText("Invalid code entered: Production not found");
                }
            })
            .catch((error) => {
                setErrorText("Error getting data: " + error);
            });
    };

    return (
        <GeneralModal closeModal={closeModal}>
            <View className="flex flex-col p-3 h-full">
                <Text className="text-3xl font-extrabold text-center mb-3">Join Production</Text>
                <View className="flex-1" />
                <Text className="text-lg font-semibold text-center">
                    Enter the code for the production you wish to join.
                </Text>
                <FormField value={code} placeholder="Code" autoCapitalize="none" onChangeText={(text) => setCode(text)} />
                <View className="flex-1" />
                <FormButton title="Join" onPress={() => JoinProduction()} />
                <Text className="text-red-500 text-center">{errorText}</Text>
            </View>
        </GeneralModal>
    );
}
