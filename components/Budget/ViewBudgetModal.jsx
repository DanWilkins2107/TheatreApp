import { View, Text, ScrollView } from "react-native";
import BudgetInfo from "./BudgetInfo.jsx";
import LoadingWheel from "../Loading/LoadingWheel.jsx";

export default function ViewBudgetModal({ loading, budgets, onPress }) {
    return (
        <View className="flex h-96 p-3">
            <Text className="text-3xl font-extrabold text-center mb-3">Select Budget</Text>
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {loading ? (
                    <LoadingWheel size="large" />
                ) : Object.keys(budgets).length > 0 ? (
                    Object.keys(budgets).map((budget, i) => {
                        return (
                            <BudgetInfo
                                key={i}
                                budget={budgets[budget]}
                                onClick={() => {
                                    onPress(budget);
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
