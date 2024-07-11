import { View, Text } from "react-native";
import FormField from "../Form/FormField";
import FormButton from "../Form/FormButton";
import { useState, useContext } from "react";
import { firebase_auth, firebase_db } from "../../firebase.config";
import { get, ref, set, child } from "firebase/database";
import { ModalContext } from "../Modal/ModalProvider";
import Title from "../TextStyles/Title";
import { randomUUID } from "expo-crypto";

const generateProductionCode = (db) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const dbRef = ref(db);
    let code = "";

    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    get(child(dbRef, "productionCodes/" + code)).then((snapshot) => {
        if (snapshot.exists()) {
            code = generateProductionCode();
        }
    });

    return code;
};
// TODO: Error handling

export default function CreateProductionModal() {
    const [name, setName] = useState("");
    const db = firebase_db;
    const auth = firebase_auth;
    const { setModal } = useContext(ModalContext);

    const CreateProduction = () => {
        const productionID = randomUUID();
        const productionCode = generateProductionCode(db);

        set(ref(db, "productions/" + productionID), {
            productionName: name, // remember that you have changed this if anything goes wrong!!
            productionCode: productionCode,
            admins: {
                [auth.currentUser.uid]: Date.now(),
            },
            participants: {
                [auth.currentUser.uid]: Date.now(),
            },
            budgets: [],
            availabilities: [],
        });

        set(ref(db, "productionCodes/" + productionCode), productionID);

        set(ref(db, "users/" + auth.currentUser.uid + "/productions/" + productionID), Date.now());

        setModal(null);
    };

    return (
        <View className="flex px-4">
            <Title extraClassName="text-center mb-2">Create Production</Title>
            <Text className="text-lg font-semibold text-center mb-2">
                Enter the name for your production.
            </Text>
            <FormField
                extraClassName="mb-4"
                value={name}
                placeholder="Name"
                onChangeText={setName}
            />
            <FormButton title="Create" onPress={CreateProduction} />
        </View>
    );
}
