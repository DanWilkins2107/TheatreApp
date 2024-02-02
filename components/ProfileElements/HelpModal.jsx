import { View, Text } from "react-native";
import { useState, useContext } from "react";
import { set, ref } from "firebase/database";
import { firebase_auth, firebase_db } from "../../firebase.config.js";
import DropDownPicker from "react-native-dropdown-picker";
import SmallFormButton from "../Form/SmallFormButton.jsx";
import FormField from "../../components/Form/FormField";
import { AlertContext } from "../../components/Alert/AlertProvider.jsx";
import { ModalContext } from "../../components/Modal/ModalProvider.jsx";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const furtherInfo = {
    ReportError:
        "Describe what happened in detail. If you can, include the steps you took to get to this point.",
    AskQuestion: "Further details about your question.",
    SuggestImprovement: "Further details about your suggestion.",
};

export default function HelpModal() {
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: "Report an error", value: "ReportError" },
        { label: "Ask a question", value: "AskQuestion" },
        { label: "Suggest an improvement", value: "SuggestImprovement" },
    ]);
    const auth = firebase_auth;
    const db = firebase_db;
    const { setAlert } = useContext(AlertContext);
    const { setModal } = useContext(ModalContext);

    const report = () => {
        if (title === "") {
            alert("Please enter a title");
            return;
        }

        try {
            set(ref(db, "reports/" + Date.now()), {
                uid: auth.currentUser.uid,
                type: type ? type : "none",
                title: title,
                description: description ? description : "none",
            });
            setAlert("Report submitted!", "bg-green-500", icon({ name: "circle-check" }));
            setModal(null);
        } catch (error) {
            setAlert("Error sending report", "bg-red-500", icon({ name: "circle-exclamation" }));
        }
    };

    return (
        <View className="flex items-center mx-4">
            <Text className="text-2xl font-extrabold text-center mb-2">Help</Text>
            <View>
                <DropDownPicker
                    className="px-5 my-1 rounded-xl border-2"
                    dropDownContainerStyle={{ borderWidth: 2, borderTopWidth: 1, borderRadius: 12 }}
                    open={open}
                    value={type}
                    items={items}
                    setOpen={setOpen}
                    setValue={setType}
                    setItems={setItems}
                />
                <FormField
                    onChangeText={setTitle}
                    value={title}
                    placeholder="Title"
                    autoCapitalize={"sentences"}
                    multiline
                />
                <FormField
                    extraClassName={"h-20"}
                    onChangeText={setDescription}
                    value={description}
                    placeholder={type ? furtherInfo[type] : "Description"}
                    autoCapitalize={"sentences"}
                    multiline
                />
                <View className="items-center mt-4">
                    <SmallFormButton
                        backgroundColor="bg-green-400"
                        title="Submit"
                        onPress={report}
                    />
                </View>
            </View>
        </View>
    );
}
