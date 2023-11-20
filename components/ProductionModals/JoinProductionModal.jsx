import { View, Text } from "react-native";
import FormField from "../Form/FormField";
import FormButton from "../Form/FormButton";
import { useState } from "react";
import GeneralModal from "../GeneralModal/GeneralModal";
import { firebase_auth, firebase_db } from "../../firebase.config";
import { get, ref, set, child } from "firebase/database";

export default function JoinProductionModal({ closeModal }) {
    const [code, setCode] = useState("");
    const db = firebase_db;
    const auth = firebase_auth;
    const JoinProduction = () => {
        const dbRef = ref(db);
        console.log("Code: " + code)
        get(child(dbRef, `/production/${code}`))
            .then((snapshot) => {
                console.log("Reached1")
                const data = snapshot.val();
                if (!data) {
                    // Check whether user is in participants
                    if (data.participants.includes(auth.currentUser.uid)) {
                        // TODO add visual error
                        console.log("User already in production");
                    } else {
                        // Add user to participants
                        data.participants.push(auth.currentUser.uid);
                        set(ref(db, "productions/" + code), data);
                    }
                } else {
                    // TODO add visual error
                    console.log("Invalid Code Entered");
                }
            })
            .catch((error) => {
                console.log("Error getting data:", error);
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
                <FormField value={code} placeholder="Code" onChangeText={(text) => setCode(text)} />
                <View className="flex-1" />
                <FormButton title="Join" onPress={() => JoinProduction()} />
            </View>
        </GeneralModal>
    );
}
