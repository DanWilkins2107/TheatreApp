import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { ref, set } from "firebase/database";
import FormField from "../Form/FormField";
import FormButton from "../Form/FormButton";
import ParticipantSelector from "../Participants/ParticipantSelector";

export default function CreateBudgetModal({ closeModal, productionCode }) {
    const [name, setName] = useState("");
    const [budget, setBudget] = useState("");
    const [participants, setParticipants] = useState({});

    useEffect(() => {
        setParticipants({
            1: true,
            2: false,
            3: true,
        });
    }, []);

    const createBudget = () => {
        // set(ref(db, `productions/${productionCode}/budgets`), {
        //     [budgetID]: Date.now(),
        // });
        // set(ref(db, "budgets/" + budgetID), {
        //     name: name,
        //     budget: budget,
        // });
        // closeModal();
        alert("Budget created!");
    };

    return (
        <View className="flex flex-col p-3 h-full">
            <Text className="text-3xl font-extrabold text-center mb-3">Create Budget</Text>
            <Text className="text-lg font-semibold text-center">Name</Text>
            <FormField value={name} placeholder="Name" onChangeText={setName} />
            <Text className="text-lg font-semibold text-center">Budget</Text>
            <FormField value={budget} placeholder="Budget" onChangeText={setBudget} />
            <ParticipantSelector participants={participants} setParticipants={setParticipants} />
            <FormButton title="Create" onPress={createBudget} />
        </View>
    );
}
