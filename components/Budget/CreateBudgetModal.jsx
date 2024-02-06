import { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { get, set, ref, onValue } from "firebase/database";
import FormField from "../Form/FormField";
import FormButton from "../Form/FormButton";
import ParticipantSelector from "../Participants/ParticipantSelector";
import { AlertContext } from "../Alert/AlertProvider";
import { firebase_db } from "../../firebase.config";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ModalContext } from "../Modal/ModalProvider";

export default function CreateBudgetModal({ productionCode }) {
    const [name, setName] = useState("");
    const [budget, setBudget] = useState("");
    const [participants, setParticipants] = useState({});
    const [loading, setLoading] = useState(true);
    const db = firebase_db;
    const { setAlert } = useContext(AlertContext);
    const { setModal } = useContext(ModalContext);

    useEffect(() => {
        setLoading(true);
        try {
            onValue(
                ref(db, `productions/${productionCode}/participants`),
                async (productionSnapshot) => {
                    if (!productionSnapshot.exists()) {
                        setAlert(
                            "Could not find production.",
                            "bg-red-500",
                            icon({ name: "circle-exclamation" })
                        );
                        return;
                    }
                    const participantArray = Object.keys(productionSnapshot.val());
                    let participantObject = {};
                    participantArray.forEach((participant) => {
                        participantObject[participant] = false;
                    });
                    setParticipants(participantObject);
                    setLoading(False);
                }
            );
        } catch (error) {
            console.log("uh oh: ", error.message);
        }
    }, []);

    const createBudget = () => {
        if (name === "" || budget === "") {
            setAlert(
                "Please fill in all fields.",
                "bg-red-500",
                icon({ name: "circle-exclamation" })
            );
            return;
        }

        const participantsToAdd = {};
        for (const participant in participants) {
            if (participants[participant]) {
                participantsToAdd[participant] = Date.now();
            }
        }

        const budgetID = Math.floor(Math.random() * 10 ** 20);
        try {
            set(ref(db, `productions/${productionCode}/budgets`), {
                [budgetID]: Date.now(),
            });
            set(ref(db, "budgets/" + budgetID), {
                name: name,
                budget: budget,
                participants: participantsToAdd,
            });
            setAlert("Budget created!", "bg-green-500", icon({ name: "circle-exclamation" }));
            setModal(null);
        } catch {
            setAlert(
                "Error occurred when creating budget.",
                "bg-red-500",
                icon({ name: "circle-exclamation" })
            );
        }
    };

    return (
        <View className="flex flex-col p-3 h-full">
            <Text className="text-3xl font-extrabold text-center mb-3">Create Budget</Text>
            <Text className="text-lg font-semibold text-center">Name</Text>
            <FormField value={name} placeholder="Name" onChangeText={setName} />
            <View className="h-2" />
            <Text className="text-lg font-semibold text-center">Budget (£)</Text>
            <FormField value={budget} placeholder="Budget" onChangeText={setBudget} />
            <View className="h-8" />
            <ParticipantSelector participants={participants} setParticipants={setParticipants} />
            <View className="h-2" />
            <FormButton title="Create" onPress={createBudget} />
        </View>
    );
}
