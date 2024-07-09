import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import SmallFormButton from "../../components/Form/SmallFormButton.jsx";
import { AlertContext } from "../../components/Alert/AlertProvider";
import FormField from "../../components/Form/FormField.jsx";
import Title from "../../components/TextStyles/Title.jsx";
import ReceiptViewer from "../../components/Budget/ReceiptViewer.jsx";
import AddRecieptButton from "../../components/Budget/AddRecieptButton.jsx";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Icon from "react-native-vector-icons/FontAwesome";
import {
    launchImageLibraryAsync,
    launchCameraAsync,
    requestCameraPermissionsAsync,
    requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { storage } from "../../firebase.config.js";
import { randomUUID } from "expo-crypto";
import { get } from "firebase/database";
import { firebase_db, firebase_auth } from "../../firebase.config.js";
import { ref as dbRef } from "firebase/database";
import BudgetInfo from "../../components/Budget/BudgetInfo.jsx";
import { ModalContext } from "../../components/Modal/ModalProvider.jsx";
import ViewBudgetModal from "../../components/Budget/ViewBudgetModal.jsx";

export default function BudgetAddExpenseScreen({ navigation, route }) {
    const expenseID = randomUUID();
    const [playBudgets, setPlayBudgets] = useState({});
    const [budget, setBudget] = useState("");
    const [reference, setReference] = useState("");
    const [description, setDescription] = useState("");
    const [receiptURI, setReceiptURI] = useState("");
    const [cost, setCost] = useState("");
    const { setAlert } = useContext(AlertContext);
    const storageRef = ref(storage);
    const productionCode = route.params.productionCode;
    const db = firebase_db;
    const auth = firebase_auth;
    const { setModal } = useContext(ModalContext);

    const submitForm = async () => {
        // TODO: Complete Submit Form Functionality
        const url = "";
        if (receiptURI) {
            try {
                const blob = receiptURI.blob();
                const extension = receiptURI.substring(receiptURI.lastIndexOf("."));
                const snapshot = await uploadBytes(
                    ref(storageRef, "receipts/" + expenseID + extension),
                    blob
                );
                url = await getDownloadURL(snapshot.ref);
                throw Error();
            } catch (error) {
                setAlert("Error uploading receipt", "bg-red-500", "exclamation-circle");
            }
        }
    };

    const setReceiptLibrary = async () => {
        const libraryStatus = await requestMediaLibraryPermissionsAsync();
        if (libraryStatus.status != "granted") {
            setAlert(
                "Please grant permission to access your photo library to upload a receipt",
                "bg-red-500",
                "exclamation-circle"
            );
            return;
        }
        launchImageLibraryAsync({ quality: 0.1 }).then((response) => {
            if (!response.canceled) {
                try {
                    fetch(response.assets[0].uri).then(() => {
                        setReceiptURI(response.assets[0].uri);
                    });
                } catch (error) {
                    setAlert(
                        "An error occurred while uploading the receipt. Please try again.",
                        "bg-red-500",
                        "exclamation-circle"
                    );
                }
            }
        });
    };

    const setReceiptCamera = async () => {
        const cameraStatus = await requestCameraPermissionsAsync();
        if (cameraStatus.status != "granted") {
            setAlert(
                "Please grant permission to access your camera to upload a receipt",
                "bg-red-500",
                "exclamation-circle"
            );
            return;
        }
        launchCameraAsync({ quality: 0.1 }).then((response) => {
            if (!response.canceled) {
                try {
                    fetch(response.assets[0].uri).then(() => {
                        setReceiptURI(response.assets[0].uri);
                    });
                } catch (error) {
                    setAlert(
                        "An error occurred while uploading the receipt. Please try again.",
                        "bg-red-500",
                        "exclamation-circle"
                    );
                }
            }
        });
    };

    const fetchBudgets = async () => {
        try {
            const prodSnapshot = await get(dbRef(db, `productions/${productionCode}/budgets`));
            if (!prodSnapshot.exists()) {
                return {};
            }
            let newBudgets = {};
            const budgetUUIDs = Object.keys(prodSnapshot.val());
            await Promise.all(
                budgetUUIDs.map(async (budgetUUID) => {
                    const budgetInfo = await get(dbRef(db, `budgets/${budgetUUID}`));
                    if (!budgetInfo.exists()) {
                        return;
                    }
                    if (
                        budgetInfo.val().participants &&
                        Object.keys(budgetInfo.val().participants).includes(auth.currentUser.uid)
                    ) {
                        newBudgets[budgetUUID] = budgetInfo.val();
                    }
                })
            );
            return newBudgets;
        } catch (error) {
            console.log(error.message);
            setAlert("Could not find all the budgets", "bg-red-400", "exclamation-circle");
            return {};
        }
    };

    const handleChooseBudgetPress = async () => {
        setModal(
            <ViewBudgetModal
                budgets={{}}
                loading={true}
                onPress={(budget) => {
                    setBudget(budget);
                    setModal(null);
                }}
            />
        );
        const newBudgets = await fetchBudgets();
        setPlayBudgets(newBudgets);
        setModal(
            <ViewBudgetModal
                budgets={newBudgets}
                loading={false}
                onPress={(budget) => {
                    setBudget(budget);
                    setModal(null);
                }}
            />
        );
    };

    return (
        <View className="py-2 flex justify-center items-center">
            <Title extraClassName="mb-2">Add Expense</Title>
            <ScrollView className="h-5/6 w-full px-8">
                <View className="h-40 items-center justify-center">
                    <Text className="text-lg font-semibold text-center">Select Budget</Text>
                    {budget ? (
                        <BudgetInfo
                            budget={playBudgets[budget]}
                            onClick={handleChooseBudgetPress}
                        />
                    ) : (
                        <TouchableOpacity
                            onPress={handleChooseBudgetPress}
                            className="flex bg-neutral-100 p-3 border-2 rounded-lg my-2 w-full h-28 items-center justify-center"
                        >
                            <Text className="text-lg">Choose a Budget</Text>
                        </TouchableOpacity>
                    )}
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
                        extraClassName="h-20"
                        autoCapitalize="sentences"
                    />
                </View>
                <View>
                    <Text className="text-lg font-semibold text-center">Cost</Text>
                    <FormField value={cost} placeholder="Cost (£)" onChangeText={setCost} />
                </View>
                <View className="h-80 mb-24">
                    <Text className="text-lg font-semibold text-center">Receipt</Text>
                    <ReceiptViewer recieptURL={receiptURI} />
                    {receiptURI ? (
                        <View className="flex-row justify-around mt-[-50]">
                            <AddRecieptButton
                                onPress={() => {
                                    setReceiptURI("");
                                }}
                            >
                                <Icon name="trash" size={50} />
                            </AddRecieptButton>
                        </View>
                    ) : (
                        <View className="flex-row justify-around mt-[-50]">
                            <AddRecieptButton onPress={setReceiptCamera}>
                                <Icon name="camera" size={50} />
                            </AddRecieptButton>
                            <AddRecieptButton onPress={setReceiptLibrary}>
                                <Icon name="image" size={50} />
                            </AddRecieptButton>
                        </View>
                    )}
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
                        setReceiptURI("");
                    }}
                />
            </View>
        </View>
    );
}
