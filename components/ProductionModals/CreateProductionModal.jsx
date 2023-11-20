import { View, Text } from "react-native";
import FormField from "../Form/FormField";
import FormButton from "../Form/FormButton";
import { useState } from "react";
import GeneralModal from "../GeneralModal/GeneralModal";
import { firebase_auth, firebase_db } from "../../firebase.config";
import { get, ref, set, child } from "firebase/database";

export default function CreateProductionModal({ closeModal }) {
    const [name, setName] = useState("");
    const db = firebase_db;
    const auth = firebase_auth;

    const CreateProduction = () => {
        const dbRef = ref(db);
        playCodeValid = false;
        failedAttempts = 0;
        const playCode = Math.random().toString(36).substring(7);
        while (!playCodeValid && failedAttempts < 10) {
            get(child(dbRef, `/production/${playCode}`))
                .then((snapshot) => {
                    const data = snapshot.val();
                    if (!data) {
                        playCodeValid = true;
                    } else {
                        failedAttempts++;
                        console.log(data)
                    }
                })
                .catch((error) => {
                    console.log("Error getting data:", error);
                });
            if (failedAttempts >= 10) {
                break;
            }
        }
        if (playCodeValid) {
            set(ref(db, "productions/" + playCode), {
                playName: name,
                admins: [auth.currentUser.uid],
                participants: [auth.currentUser.uid],
                teams: [],
                budgets: [],
            });
        } else {
            // TODO add visual error
            console.log("Failed to create production");
        }
    };

    return (
        <GeneralModal closeModal={closeModal}>
            <View className="flex flex-col p-3 h-full">
                <Text className="text-3xl font-extrabold text-center mb-3">Create Production</Text>
                <View className="flex-1" />
                <Text className="text-lg font-semibold text-center">
                    Enter the name for your production.
                </Text>
                <FormField value={name} placeholder="Name" onChangeText={(name) => setName(name)} />
                <View className="flex-1" />
                <FormButton title="Create" onPress={() => CreateProduction()} />
            </View>
        </GeneralModal>
    );
}
