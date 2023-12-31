import { View, Text } from "react-native";
import FormField from "../Form/FormField";
import FormButton from "../Form/FormButton";
import { useState } from "react";
import GeneralModal from "../GeneralModal/GeneralModal";
import { firebase_auth, firebase_db } from "../../firebase.config";
import { get, ref, set, child } from "firebase/database";

const generatePlayCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return code;
};

export default function CreateProductionModal({ closeModal }) {
    const [name, setName] = useState("");
    const [errorText, setErrorText] = useState("");
    const db = firebase_db;
    const auth = firebase_auth;

    const CreateProduction = () => {
        setErrorText("");
        const dbRef = ref(db);
        const playCode = generatePlayCode();
        get(child(dbRef, `/productions/${playCode}`))
            .then((snapshot) => {
                const data = snapshot.val();
                if (!data) {
                    set(ref(db, "productions/" + playCode), {
                        playName: name,
                        admins: {
                            [auth.currentUser.uid]: Date.now(),
                        },
                        participants: {
                            [auth.currentUser.uid]: Date.now(),
                        },
                        teams: [],
                        budgets: [],
                    });
                    set(
                        ref(db, "users/" + auth.currentUser.uid + "/productions/" + playCode),
                        Date.now()
                    );
                    closeModal();
                } else {
                    CreateProduction();
                }
            })
            .catch((error) => {
                setErrorText("Error getting data: " + error);
            });
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
                <Text className="text-red-500 text-center">{errorText}</Text>
            </View>
        </GeneralModal>
    );
}
