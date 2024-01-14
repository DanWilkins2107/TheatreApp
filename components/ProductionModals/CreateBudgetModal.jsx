import { useState } from "react";
import { View, Text } from "react-native";
import { ref, set } from "firebase/database";

export default function CreateBudgetModal({ closeModal, productionCode }) {
    const budgetID = randomUUID();
    const [name, setName] = useState("");
    const [budget, setBudget] = useState(0);

    const createBudget = () => {
        set(ref(db, `productions/${productionCode}/budgets`), {
            [budgetID]: Date.now(),
        });
        set(ref(db, "budgets/" + budgetID), {
            name: name,
            budget: budget,
        })
        closeModal();
    };
}