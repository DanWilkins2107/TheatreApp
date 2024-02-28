import { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { ref, onValue } from "firebase/database";
import { AlertContext } from "../Alert/AlertProvider";
import { ModalContext } from "../Modal/ModalProvider";
import { firebase_auth, firebase_db } from "../../firebase.config";
import BudgetInfo from "./BudgetInfo.jsx";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function ViewBudgetModal({ productionCode }) {
    const { setAlert } = useContext(AlertContext);
    //const { setModal } = useContext(ModalContext);
    const [budgets, setBudgets] = useState([]);
    //const auth = firebase_auth;
    const db = firebase_db;

    useEffect(() => {
        try {
            onValue(ref(db, `productions/${productionCode}/budgets`), (productionSnapshot) => {
                if (!productionSnapshot.exists()) {
                    setAlert(
                        "Could not find production.",
                        "bg-red-500",
                        icon({ name: "circle-exclamation" })
                    );
                    return;
                }
                
                setBudgets(Object.keys(productionSnapshot.val()));
            });
        } catch (error) {
            setAlert(
                "Error occurred when fetching budgets.",
                "bg-red-500",
                icon({ name: "circle-exclamation" })
            );
            return;
        }
    }, []);

    return (
        <View className="flex p-3">
            <Text className="text-3xl font-extrabold text-center mb-3">Select Budget</Text>
            <ScrollView className="flex flex-col h-72">
                {budgets.map((budget, i) => {
                    return (
                        <BudgetInfo
                            key={i}
                            budgetCode={budget}
                            onClick={() => {
                                alert("working");
                            }}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}
