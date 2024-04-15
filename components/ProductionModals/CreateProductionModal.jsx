import { View, Text } from "react-native";
import FormField from "../Form/FormField";
import FormButton from "../Form/FormButton";
import { useState, useContext } from "react";
import { firebase_auth, firebase_db } from "../../firebase.config";
import { get, ref, set, child } from "firebase/database";
import { ModalContext } from "../Modal/ModalProvider";
import Title from "../TextStyles/Title";

const generatePlayCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return code;
};

export default function CreateProductionModal() {
    const [name, setName] = useState("");
    const [errorText, setErrorText] = useState("");
    const db = firebase_db;
    const auth = firebase_auth;
    const { setModal } = useContext(ModalContext);

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
                    setModal(null);
                } else {
                    CreateProduction();
                }
            })
            .catch((error) => {
                setErrorText("Error getting data: " + error);
            });
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
            <Text className="text-red-500 text-center">{errorText}</Text>
        </View>
    );
}
