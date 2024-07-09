import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { onValue, ref, get } from "firebase/database";
import { firebase_auth, firebase_db } from "../../firebase.config";
import Title from "../../components/TextStyles/Title";
import LoadingWheel from "../../components/Loading/LoadingWheel";
import ExpenseSummary from "../../components/Budget/ExpenseSummary";
import Subtitle from "../../components/TextStyles/Subtitle";
import Icon from "react-native-vector-icons/FontAwesome";
import Checkbox from "../../components/Participants/Checkbox";
import BudgetLineGraph from "../../components/Budget/BudgetLineGraph";

export default function BudgetMainScreen({ route }) {
    const budgetUUID = route.params.budgetUUID;
    const [budgetInfo, setBudgetInfo] = useState({});
    const [expenses, setExpenses] = useState([]);
    const db = firebase_db;
    const auth = firebase_auth;
    const [loading, setLoading] = useState(true);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [hidePlaceholders, setHidePlaceholders] = useState(false);
    const [hideOthers, setHideOthers] = useState(false);
    const [isPlaceholder, setIsPlaceholder] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            onValue(ref(db, `/budgets/${budgetUUID}`), async (snapshot) => {
                if (!snapshot.exists()) {
                    setLoading(false);
                    return;
                }
                const data = snapshot.val();
                setBudgetInfo(data);

                const expenseData = await Promise.all(
                    Object.keys(data.expenses || {}).map(async (expenseUUID) => {
                        return get(ref(db, `expenses/${expenseUUID}`)).then((expenseSnapshot) => {
                            if (!expenseSnapshot.exists()) return null;
                            const expenseData = expenseSnapshot.val();
                            return {
                                ...expenseData,
                                expenseUUID: expenseSnapshot.key,
                                time: data.expenses[expenseUUID],
                            };
                        });
                    })
                );
                setExpenses(expenseData);
                setLoading(false);
            });
        };
        fetchData();
    }, []);

    const filterExpenses = (expenses) => {
        let filteredExpenses = [];
        for (i = 0; i < expenses.length; i++) {
            if (hidePlaceholders && expenses[i].placeholder) {
                continue;
            }
            if (hideOthers && expenses[i].user !== auth.currentUser.uid) {
                continue;
            }
            filteredExpenses.push(expenses[i]);
        }
        return filteredExpenses;
    };

    return (
        <View className="flex-1 items-center">
            {loading ? (
                <LoadingWheel size="large" />
            ) : (
                <>
                    <View className="bg-slate-100 w-[90%] border-2 rounded-xl justify-center items-center mb-8 mt-4">
                        <Title extraClassName="mt-4">{budgetInfo.name}</Title>
                        <View className="w-[90%] mt-4">
                            <BudgetLineGraph
                                budget={Number(budgetInfo.budget)}
                                placeholder={Number(budgetInfo.placeholderExpenses)}
                                nonPlaceholder={Number(budgetInfo.nonPlaceholderExpenses)}
                                isPlaceholder={isPlaceholder}
                            />
                        </View>
                        <Subtitle>
                            £
                            {Number(budgetInfo.nonPlaceholderExpenses) +
                                (isPlaceholder && Number(budgetInfo.placeholderExpenses))}{" "}
                            Spent out of £{budgetInfo.budget}
                        </Subtitle>
                        <View className="w-full flex-row justify-center items-center my-4">
                            <Checkbox
                                checked={isPlaceholder}
                                setChecked={() => setIsPlaceholder(!isPlaceholder)}
                                size={20}
                            />
                            <Subtitle extraClassName="ml-2">Include Placeholders?</Subtitle>
                        </View>
                    </View>
                    <View className="border-b-2 w-[90%]">
                        <Title extraClassName="mb-4 text-center">Expenses</Title>
                    </View>
                    <TouchableOpacity
                        className="justify-between w-[90%] my-2 bg-slate-200 rounded-lg p-2 border-2"
                        onPress={() => {
                            setFiltersOpen(!filtersOpen);
                        }}
                    >
                        <View className="flex-col justify-between w-full">
                            <View className="flex-row justify-between w-full p-1">
                                <Subtitle extraClassName="text-center ml-2">Filters</Subtitle>
                                <View className="ml-2 w-6 justify-center items-center">
                                    <Icon
                                        name={filtersOpen ? "caret-down" : "caret-right"}
                                        size={30}
                                        color="black"
                                    />
                                </View>
                            </View>
                            {filtersOpen && (
                                <View className="flex-col">
                                    <View className="flex-row justify-start items-center px-2 mt-2">
                                        <Checkbox
                                            checked={hidePlaceholders}
                                            setChecked={() =>
                                                setHidePlaceholders(!hidePlaceholders)
                                            }
                                        />
                                        <Subtitle extraClassName="ml-4">
                                            Hide Placeholder Expenses
                                        </Subtitle>
                                    </View>
                                    <View className="flex-row justify-start items-center px-2 mt-2">
                                        <Checkbox
                                            checked={hideOthers}
                                            setChecked={() => setHideOthers(!hideOthers)}
                                        />
                                        <Subtitle extraClassName="ml-4">
                                            Hide Others' Expenses
                                        </Subtitle>
                                    </View>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>

                    <ScrollView className="flex-col flex-1 w-[90%]">
                        {filterExpenses(expenses).length === 0 ? (
                            <Text className="text-center text-2xl my-6 font-bold">
                                No transactions yet...
                            </Text>
                        ) : (
                            <>
                                {filterExpenses(expenses).map((expense) => {
                                    if (!expense) return null;
                                    if (hidePlaceholders && expense.placeholder) return null;
                                    if (hideOthers && expense.user !== auth.currentUser.uid)
                                        return null;
                                    return (
                                        <ExpenseSummary
                                            expense={expense}
                                            key={expense.expenseUUID}
                                            isUser={expense.user === auth.currentUser.uid}
                                        />
                                    );
                                })}
                            </>
                        )}
                    </ScrollView>
                </>
            )}
        </View>
    );
}
