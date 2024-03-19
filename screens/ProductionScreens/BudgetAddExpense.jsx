import { Text, View, ScrollView } from "react-native";
import { useContext, useState } from "react";
import SmallFormButton from "../../components/Form/SmallFormButton.jsx";
import { AlertContext } from "../../components/Alert/AlertProvider";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import FormField from "../../components/Form/FormField.jsx";
import ReceiptViewer from "../../components/Budget/ReceiptViewer.jsx";
import AddRecieptButton from "../../components/Budget/AddRecieptButton.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera, faImages, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    launchImageLibraryAsync,
    launchCameraAsync,
    requestCameraPermissionsAsync,
    requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { storage } from "../../firebase.config.js";

export default function BudgetAddExpense({ navigation, route }) {
    const expenseID = Math.floor(Math.random() * 10 ** 20);
    const [budget, setBudget] = useState("");
    const [reference, setReference] = useState("");
    const [description, setDescription] = useState("");
    const [receiptURI, setReceiptURI] = useState("");
    const [cost, setCost] = useState("");
    const { setAlert } = useContext(AlertContext);
    const storageRef = ref(storage);

    const submitForm = async () => {
        // TODO: Complete Submit Form Functionality
        setAlert("Created Budget", "bg-green-500", icon({ name: "circle-check" }));
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
            } catch (error) {
                setAlert(
                    "Error uploading receipt",
                    "bg-red-500",
                    icon({ name: "circle-exclamation" })
                );
            }
        }
    };

    const setReceiptLibrary = async () => {
        const libraryStatus = await requestMediaLibraryPermissionsAsync();
        if (libraryStatus.status != "granted") {
            setAlert(
                "Please grant permission to access your photo library to upload a receipt",
                "bg-red-500",
                icon({ name: "circle-exclamation" })
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
                        icon({ name: "circle-exclamation" })
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
                icon({ name: "circle-exclamation" })
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
                        icon({ name: "circle-exclamation" })
                    );
                }
            }
        });
    };

    return (
        <View className="py-2 flex justify-center items-center">
            <Text className="self-center text-3xl font-extrabold">Add Expense</Text>
            <ScrollView className="h-5/6 w-10/12">
                <View className="h-40">
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
                                <FontAwesomeIcon icon={faTrash} size={50} />
                            </AddRecieptButton>
                        </View>
                    ) : (
                        <View className="flex-row justify-around mt-[-50]">
                            <AddRecieptButton onPress={setReceiptCamera}>
                                <FontAwesomeIcon icon={faCamera} size={50} />
                            </AddRecieptButton>
                            <AddRecieptButton onPress={setReceiptLibrary}>
                                <FontAwesomeIcon icon={faImages} size={50} />
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
