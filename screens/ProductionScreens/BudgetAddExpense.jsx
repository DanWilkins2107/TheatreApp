import { Text, View, ScrollView } from "react-native";
import { useContext, useState } from "react";
import SmallFormButton from "../../components/Form/SmallFormButton.jsx";
import { AlertContext } from "../../components/Alert/AlertProvider";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import FormField from "../../components/Form/FormField.jsx";

export default function BudgetAddExpense({ navigation, route }) {
    const [budget, setBudget] = useState("");
    const [reference, setReference] = useState("");
    const [description, setDescription] = useState("");
    const [recieptURL, setRecieptURL] = useState("");
    const [cost, setCost] = useState("");
    const { setAlert } = useContext(AlertContext);

    const submitForm = () => {
        setAlert("Created Budget", "bg-green-500", icon({ name: "circle-check" }));
        // TODO: Complete Submit Form Functionality
    };

    const setRecieptLibrary = () => {
        // TODO: Add Library Reciept Functionality
    };

    const setRecieptCamera = () => {
        // TODO: Add Camera Reciept Functionality
    };

    return (
        <View className="py-2 flex justify-center items-center">
            <Text className="self-center text-3xl font-extrabold">Add Expense</Text>
            <ScrollView className="h-5/6 w-10/12">
                <View>
                    {/* TODO: Select Budget */}
                    <Text className="text-lg font-semibold text-center">Select Budget</Text>
                </View>
                <View>
                    <Text className="text-lg font-semibold text-center">Reference</Text>
                    <FormField
                        value={reference}
                        placeholder="Reference"
                        onChangeText={setReference}
                    />
                </View>
                <View>
                    <Text className="text-lg font-semibold text-center">Description</Text>
                    <FormField
                        value={description}
                        placeholder="Description"
                        onChangeText={setDescription}
                        multiline
                    />
                </View>
                <View>
                    <Text className="text-lg font-semibold text-center">Cost</Text>
                    <FormField value={cost} placeholder="Cost (£)" onChangeText={setCost} />
                </View>
                {/* TODO: Add Reciept Camera/Photo Library Buttons */}
                {/* TODO: Edit Reciept Implementation */}
                <View>
                    {recieptURL ? 
                    <Text>Reciept Exists</Text> :
                    <Text>Reciept Doesn't Exist</Text>}
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
