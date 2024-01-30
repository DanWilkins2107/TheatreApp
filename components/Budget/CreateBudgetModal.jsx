import { useState } from "react";
import { View, Text } from "react-native";
import { ref, set } from "firebase/database";
import FormField from "../Form/FormField";
import FormButton from "../Form/FormButton";

export default function CreateBudgetModal({ closeModal, productionCode }) {
    const [name, setName] = useState("");
    const [budget, setBudget] = useState(0);

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
            <View className="flex-1" />
            <Text className="text-lg font-semibold text-center">
                Enter the name for your budget.
            </Text>
            <FormField value={name} placeholder="Name" onChangeText={setName} />
            <Text className="text-lg font-semibold text-center">
                Enter the budget for your budget.
            </Text>
            <FormField
                value={budget}
                placeholder="Budget"
                onChangeText={setBudget}
            />
            <View className="flex-1" />
            <FormButton title="Create" onPress={createBudget} />
        </View>
    );
}
