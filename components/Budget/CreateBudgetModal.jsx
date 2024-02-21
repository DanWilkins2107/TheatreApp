import { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { set, ref, push, onValue } from "firebase/database";
import FormField from "../Form/FormField";
import FormButton from "../Form/FormButton";
import ParticipantSelector from "../Participants/ParticipantSelector";
import { AlertContext } from "../Alert/AlertProvider";
import { firebase_db } from "../../firebase.config";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ModalContext } from "../Modal/ModalProvider";
import Title from "../TextStyles/Title";
import { randomUUID } from "expo-crypto";

export default function CreateBudgetModal({ productionCode }) {
    const [name, setName] = useState("");
    const [budget, setBudget] = useState("");
    const [participants, setParticipants] = useState({});
    const db = firebase_db;
    const { setAlert } = useContext(AlertContext);
    const { setModal } = useContext(ModalContext);

    useEffect(() => {
        try {
            onValue(ref(db, `productions/${productionCode}/participants`), (productionSnapshot) => {
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
            });
        } catch (error) {
            setAlert(
                "Error occurred when fetching participants.",
                "bg-red-500",
                icon({ name: "circle-exclamation" })
            );
            return;
        }
    }, []);

    const createBudget = () => {
        if (name === "" || budget === "") {
            setAlert(
                "Please fill out all fields.",
                "bg-red-500",
                icon({ name: "circle-exclamation" })
            );
            return;
        }

        if (isNaN(budget)) {
            setAlert(
                "Please enter a valid budget amount",
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

        const budgetID = randomUUID();
        try {
            set(ref(db, `productions/${productionCode}/budgets/${budgetID}`), Date.now());
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
        <View className="flex p-3">
            <Title extraClassName="mb-4 text-center">
                Create Budget
            </Title>
            <Text className="text-lg font-semibold text-center">Name</Text>
            <FormField
                value={name}
                placeholder="Name"
                onChangeText={setName}
                extraClassName="mb-2"
                autocapitalize="sentences"
            />
            <Text className="text-lg font-semibold text-center">Budget (£)</Text>
            <FormField
                value={budget}
                placeholder="Budget"
                onChangeText={setBudget}
                extraClassName="mb-8"
            />
            <ParticipantSelector participants={participants} setParticipants={setParticipants} />
            <FormButton title="Create" onPress={createBudget} blockClassName="mt-6" />
        </View>
    );
}
