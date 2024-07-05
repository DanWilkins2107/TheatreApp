import { View, Text, ScrollView, Image } from "react-native";
import { useEffect, useState } from "react";
import { onValue, ref, get } from "firebase/database";
import { firebase_db } from "../../firebase.config";

export default function BudgetMainScreen({ route }) {
    const budgetUUID = route.params.budgetUUID;
    const [budgetInfo, setBudgetInfo] = useState({});
    const [expenses, setExpenses] = useState([]);
    const db = firebase_db;

    useEffect(() => {
        const fetchData = async () => {
            onValue(ref(db, `/budgets/${budgetUUID}`), async (snapshot) => {
                if (!snapshot.exists()) {
                    return;
                }
                const data = snapshot.val();
                setBudgetInfo(data);

                const expenseData = await Promise.all(
                    Object.keys(data.expenses || {}).map(async (expenseUUID) => {
                        return get(ref(db, `expenses/${expenseUUID}`)).then((expenseSnapshot) => {
                            if (!expenseSnapshot.exists()) return null;
                            const expenseData = expenseSnapshot.val();
                            return { ...expenseData, expenseUUID: expenseSnapshot.key };
                        });
                    })
                );
                setExpenses(expenseData);
            });
        };
        fetchData();
    }, []);

    return (
        <ScrollView className="flex-col">
            {Object.keys(expenses).map((expenseID) => {
                const expense = expenses[expenseID];
                return (
                    <View className="bg-blue-300 mb-2">
                        <Text>{JSON.stringify(expense)}</Text>
                        <Text>reference: {expense.reference}</Text>
                        <Text>description: {expense.description}</Text>

                        {expense.receipt && (
                            <>
                                <Text>IMAGE: {expense.receipt}</Text>
                                <Image
                                    source={{ uri: expense.receipt }}
                                    style={{ width: 200, height: 200, backgroundColor: "red" }}
                                    resizeMode="cover"
                                />
                            </>
                        )}
                    </View>
                );
            })}
        </ScrollView>
    );
}
