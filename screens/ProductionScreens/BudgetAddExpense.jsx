import { Text, View, TouchableOpacity } from "react-native";
import { useContext, useState, useCallback } from "react";
import SmallFormButton from "../../components/Form/SmallFormButton.jsx";
import { AlertContext } from "../../components/Alert/AlertProvider";
import FormField from "../../components/Form/FormField.jsx";
import Title from "../../components/TextStyles/Title.jsx";
import ReceiptViewer from "../../components/Budget/ReceiptViewer.jsx";
import AddRecieptButton from "../../components/Budget/AddRecieptButton.jsx";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import Icon from "react-native-vector-icons/FontAwesome";
import {
    launchImageLibraryAsync,
    launchCameraAsync,
    requestCameraPermissionsAsync,
    requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { storage } from "../../firebase.config.js";
import { randomUUID } from "expo-crypto";
import { get, set } from "firebase/database";
import { firebase_db, firebase_auth } from "../../firebase.config.js";
import { ref as dbRef, runTransaction } from "firebase/database";
import BudgetInfo from "../../components/Budget/BudgetInfo.jsx";
import { ModalContext } from "../../components/Modal/ModalProvider.jsx";
import ViewBudgetModal from "../../components/Budget/ViewBudgetModal.jsx";
import Checkbox from "../../components/Participants/Checkbox.jsx";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DeleteExpenseModal from "../../components/Budget/DeleteExpenseModal.jsx";
import DeleteButton from "../../components/Budget/DeleteButton.jsx";

export default function BudgetAddExpenseScreen({ navigation, route }) {
    const [playBudgets, setPlayBudgets] = useState({});
    const [budget, setBudget] = useState("");
    const [reference, setReference] = useState("");
    const [description, setDescription] = useState("");
    const [receiptURI, setReceiptURI] = useState("");
    const [cost, setCost] = useState("");
    const [isPlaceholder, setIsPlaceholder] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setAlert } = useContext(AlertContext);
    const storageRef = ref(storage);
    const productionCode = route.params.productionCode;
    const id = route.params.id;
    const expenseID = route.params.id || randomUUID();
    const db = firebase_db;
    const auth = firebase_auth;
    const { setModal } = useContext(ModalContext);
    const [originalCost, setOriginalCost] = useState(0);
    const [originalReceipt, setOriginalReceipt] = useState("");
    const [originalReceiptExtension, setOriginalReceiptExtension] = useState("");

    const resetValues = () => {
        setBudget("");
        setReference("");
        setDescription("");
        setIsPlaceholder(false);
        setCost("");
        setReceiptURI("");
    };

    const handleLoad = () => {
        if (!id) {
            resetValues();
            return;
        }
        try {
            resetValues();
            get(dbRef(db, `expenses/${id}`)).then(async (snapshot) => {
                if (!snapshot.exists()) {
                    resetValues();
                    return;
                }
                const data = snapshot.val();
                const playBudgetsFetch = await fetchBudgets();
                setPlayBudgets(playBudgetsFetch);
                setBudget(data.budget);
                setReference(data.reference);
                setDescription(data.description);
                setIsPlaceholder(data.placeholder);
                setCost(data.cost);
                setReceiptURI(data.receipt);
                setOriginalCost(data.cost);
                setOriginalReceipt(data.receipt);
                setOriginalReceiptExtension(data.receiptExtension);
            });
        } catch {
            setAlert("Error loading expense", "bg-red-500", "exclamation-circle");
        }
    };

    useFocusEffect(
        useCallback(() => {
            handleLoad();
        }, [])
    );

    const submitForm = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        if (!budget) {
            setAlert("Please select a budget", "bg-red-500", "exclamation-circle");
            setIsSubmitting(false);
            return;
        }

        if (!reference) {
            setAlert("Please enter a reference", "bg-red-500", "exclamation-circle");
            setIsSubmitting(false);
            return;
        }

        if (!cost) {
            setAlert("Please enter the cost of the expense", "bg-red-500", "exclamation-circle");
            setIsSubmitting(false);
            return;
        }

        let url = "";
        let extension = "";
        if (receiptURI) {
            try {
                const image = await fetch(receiptURI);
                const blob = await image.blob();
                extension = receiptURI.substring(receiptURI.lastIndexOf("."));
                const snapshot = await uploadBytes(
                    ref(storageRef, "receipts/" + expenseID + extension),
                    blob
                );
                url = await getDownloadURL(snapshot.ref);
            } catch (error) {
                setAlert("Error uploading receipt", "bg-red-500", "exclamation-circle");
            }
        }

        try {
            await set(dbRef(db, `expenses/${expenseID}`), {
                budget: budget,
                reference: reference,
                description: description,
                cost: cost,
                placeholder: isPlaceholder,
                receipt: url,
                receiptExtension: extension,
                user: auth.currentUser.uid,
            });
            await set(dbRef(db, `budgets/${budget}/expenses/${expenseID}`), Date.now());
            setAlert(
                `Expense ${id ? "updated" : "added"} successfully`,
                "bg-green-500",
                "check-circle"
            );
            setIsSubmitting(false);

            await runTransaction(
                dbRef(
                    db,
                    `budgets/${budget}/${
                        isPlaceholder ? "placeholderExpenses" : "nonPlaceholderExpenses"
                    }`
                ),
                (currentValue) => {
                    if (currentValue) {
                        return Number(currentValue) + Number(cost);
                    }
                    return Number(cost);
                }
            );

            navigation.navigate("BudgetMain", {
                productionCode: productionCode,
                budgetUUID: budget,
            });
        } catch (error) {
            setAlert("Error occurred when adding expense", "bg-red-500", "exclamation-circle");
            setIsSubmitting(false);
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

    const handleDelete = async () => {
        try {
            await runTransaction(
                dbRef(
                    db,
                    `budgets/${budget}/${
                        isPlaceholder ? "placeholderExpenses" : "nonPlaceholderExpenses"
                    }`
                ),
                (currentValue) => {
                    if (currentValue) {
                        return Number(currentValue) - Number(originalCost);
                    }
                    return -1 * Number(originalCost);
                }
            );
            const receiptRef = ref(storage, `receipts/${id}${originalReceiptExtension}`);
            await deleteObject(receiptRef);
            await set(dbRef(db, `expenses/${id}`), null);
            await set(dbRef(db, `budgets/${budget}/expenses/${id}`), null);

            setAlert("Expense deleted successfully", "bg-green-500", "check-circle");
            setModal(null);
            navigation.navigate("BudgetMain", {
                productionCode: productionCode,
                budgetUUID: budget,
            });
        } catch (error) {
            setAlert("Could not delete expense", "bg-red-500", "exclamation-circle");
        }
    };

    return (
        <View className="py-2 flex h-full justify-center items-center">
            <Title extraClassName="mb-4">{id ? "Edit" : "Add"} Expense</Title>
            <KeyboardAwareScrollView className="flex-1 w-full px-8">
                <View className="items-center justify-center mb-4">
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
                <View className="mb-4">
                    <Text className="text-lg font-semibold text-center">Reference</Text>
                    <FormField
                        value={reference}
                        placeholder="Reference"
                        onChangeText={setReference}
                    />
                </View>
                <View className="mb-4">
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
                <View className="mb-4">
                    <Text className="text-lg font-semibold text-center">Cost</Text>
                    <FormField
                        value={cost}
                        placeholder="Cost (£)"
                        onChangeText={(value) => {
                            if (value.match(/^[0-9]*\.?[0-9]{0,2}$/)) {
                                setCost(value);
                            }
                        }}
                    />
                    <View className="flex-row justify-center items-center">
                        <Text className="text-lg font-semibold mr-4">Is this a placeholder?</Text>
                        <Checkbox
                            checked={isPlaceholder}
                            setChecked={() => {
                                setIsPlaceholder(!isPlaceholder);
                            }}
                            size={18}
                        />
                    </View>
                </View>
                <View className="h-80 mb-24">
                    <Text className="text-lg font-semibold text-center mb-1">Receipt</Text>
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
            </KeyboardAwareScrollView>
            <View className="flex-col w-full items-center mb-4 mt-2">
                <View className="flex-row w-full justify-center">
                    <SmallFormButton
                        title="Submit"
                        backgroundColor="bg-green-400"
                        onPress={submitForm}
                        loading={isSubmitting}
                    />
                    <View className="w-4" />
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
                {id && (
                    <DeleteButton
                        onPress={() => setModal(<DeleteExpenseModal onPress={handleDelete} />)}
                    />
                )}
            </View>
        </View>
    );
}
