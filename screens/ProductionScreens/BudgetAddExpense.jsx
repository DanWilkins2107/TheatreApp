import { Text, View, ScrollView } from "react-native";
import { useContext, useState } from "react";
import SmallFormButton from "../../components/Form/SmallFormButton.jsx";
import { AlertContext } from "../../components/Alert/AlertProvider";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";


export default function BudgetAddExpense({ navigation, route }) {
    const [budget, setBudget] = useState("");
    const [reference, setReference] = useState("");
    const [cost, setCost] = useState("");
    const { setAlert } = useContext(AlertContext);
    submitForm = () => {
        setAlert("Created Budget", "bg-green-500", icon({ name: "circle-check" }));
    };
    return (
        <View className="py-2 flex">
            <Text className="self-center text-3xl font-extrabold">Add Expense</Text>
            <ScrollView className="h-5/6">
                <View>
                    <Text>Select Budget Section</Text>
                </View>
                <View>
                    <Text>Reference</Text>
                </View>
                <View>
                    <Text>Cost</Text>
                </View>
                <View>
                    <Text>Reciept</Text>
                </View>
            </ScrollView>
            <View className="flex flex-row w-max justify-around">
                <SmallFormButton
                    title="Submit"
                    backgroundColor="bg-green-400"
                    onPress={submitForm}
                />
                <SmallFormButton
                    title="Reset"
                    onPress={() => {
                        setBudget("");
                        setReference("");
                        setCost("");
                        // TODO: Add reset for reciept
                    }}
                />
            </View>
        </View>
    );
}
