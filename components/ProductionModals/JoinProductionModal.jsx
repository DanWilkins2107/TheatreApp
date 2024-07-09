import { View, Text } from "react-native";
import FormField from "../Form/FormField";
import FormButton from "../Form/FormButton";
import { useState, useContext } from "react";
import { firebase_auth, firebase_db } from "../../firebase.config";
import { get, ref, set, child } from "firebase/database";
import { ModalContext } from "../Modal/ModalProvider";
import Title from "../TextStyles/Title";

// TODO: Error handling

export default function JoinProductionModal() {
    const [code, setCode] = useState("");
    const db = firebase_db;
    const auth = firebase_auth;
    const { setModal } = useContext(ModalContext);

    const JoinProduction = () => {
        const dbRef = ref(db);
        get(child(dbRef, "productionCodes/" + code)).then((codeSnapshot) => {
            const productionID = codeSnapshot.val();
            if (!productionID) {
                // handle error
                return;
            } else {
                get(child(dbRef, "productions/" + productionID)).then((snapshot) => {
                    const data = snapshot.val();
                    if (data.participants && data.participants[auth.currentUser.uid]) {
                        // handle error
                    } else {
                        set(
                            ref(
                                db,
                                "productions/" + productionID + "/participants/" + auth.currentUser.uid
                            ),
                            Date.now()
                        );
                        set(
                            ref(db, "users/" + auth.currentUser.uid + "/productions/" + productionID),
                            Date.now()
                        );
                        setModal(null);
                    }
                });
            }
        });
    };

    return (
        <View className="flex px-4">
            <Title extraClassName="text-center mb-2">Join Production</Title>
            <Text className="text-lg font-semibold text-center mb-2">
                Enter the code for the production you wish to join.
            </Text>
            <FormField
                extraClassName="mb-4"
                value={code}
                placeholder="Code"
                autoCapitalize="none"
                onChangeText={setCode}
            />
            <FormButton title="Join" onPress={JoinProduction} />
        </View>
    );
}
