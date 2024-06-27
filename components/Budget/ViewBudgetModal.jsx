import { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { ref, onValue, get, set } from "firebase/database";
import { AlertContext } from "../Alert/AlertProvider";
import { firebase_db, firebase_auth } from "../../firebase.config";
import BudgetInfo from "./BudgetInfo.jsx";
import LoadingWheel from "../Loading/LoadingWheel.jsx";

export default function ViewBudgetModal({ productionCode }) {
    const { setAlert } = useContext(AlertContext);
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const db = firebase_db;
    const auth = firebase_auth;

    useEffect(() => {
        onValue(ref(db, `productions/${productionCode}/budgets`), async (productionSnapshot) => {
            if (!productionSnapshot.exists()) {
                setLoading(false);
                return;
            }
            const newBudgets = await Promise.all(
                Object.keys(productionSnapshot.val()).map(async (budget) => {
                    return get(ref(db, `budgets/${budget}`))
                        .then(async (budgetSnapshot) => {
                            if (!budgetSnapshot.exists()) return;
                            return budgetSnapshot.val();
                        })
                        .catch(() => {
                            setAlert("Error occurred when fetching budgets.", "bg-red-500");
                        });
                })
            );

            setBudgets(
                newBudgets.filter(Boolean).filter((budget) => {
                    if (budget.participants) {
                        return Object.keys(budget.participants).includes(auth.currentUser.uid);
                    } else {
                        return false;
                    }
                })
            );
            setLoading(false);
        });
    }, []);

    return (
        <View className="flex p-3">
            <Text className="text-3xl font-extrabold text-center mb-3">Select Budget</Text>
            <ScrollView className="flex flex-col h-96" showsVerticalScrollIndicator={false}>
                {loading ? (
                    <LoadingWheel size="large" />
                ) : budgets.length > 0 ? (
                    budgets.map((budget, i) => {
                        return (
                            <BudgetInfo
                                key={i}
                                budget={budget}
                                onClick={() => {
                                    alert("working");
                                }}
                            />
                        );
                    })
                ) : (
                    <Text className="text-center">No budgets found.</Text>
                )}
            </ScrollView>
        </View>
    );
}
