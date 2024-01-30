import { View, Text } from "react-native";
import { useState } from "react";
import { set, ref } from "firebase/database";
import { firebase_auth, firebase_db } from "../../firebase.config.js";
import DropDownPicker from 'react-native-dropdown-picker';
import GenericModal from "../GeneralModal/GeneralModal.jsx";
import SmallFormButton from "../Form/SmallFormButton.jsx";
import FormField from "../../components/Form/FormField";

const furtherInfo = {
    ReportError:
        "Describe what happened in detail. If you can, include the steps you took to get to this point.",
    AskQuestion: "Further details about your question.",
    SuggestImprovement: "Further details about your suggestion.",
};

export default function HelpModal({navigation, closeModal}) {
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        {label: "Report an error", value: "ReportError"},
        {label: "Ask a question", value: "AskQuestion"},
        {label: "Suggest an improvement", value: "SuggestImprovement"},
    ]);
    // attachments
    const auth = firebase_auth;
    const db = firebase_db;

    const report = () => {
        if (title === "") {
            alert("Please enter a title");
            return;
        }

        try {
            set(ref(db, "reports/" + Date.now()), {
                uid: auth.currentUser.uid,
                type: type,
                title: title,
                description: description ? description : none,
            });
            navigation.navigate("UserProfile");
        } catch (error) {
            alert("Report failed: " + error.message);
        }

        //close modal and alert success
    };

    return (
        <GenericModal closeModal={closeModal}>
            <View className="flex flex-col items-center h-5/6">
                <Text className="text-2xl font-extrabold text-center mb-1">Help</Text>
                <View className="flex-1 flex-col m-4">
                    <DropDownPicker
                        className="px-5 my-1 rounded-xl border-2"
                        open={open}
                        value={type}
                        items={items}
                        setOpen={setOpen}
                        setValue={setType}
                        setItems={setItems}
                    />
                    <FormField onChangeText={setTitle} value={title} placeholder="Title" autoCapitalize="sentences" multiline/>
                    <FormField
                        extraClassName={"h-20"}
                        onChangeText={setDescription}
                        value={description}
                        placeholder={type ? furtherInfo[type] : "Description"}
                        autoCapitalize={"sentences"}
                        multiline
                    />
                    <SmallFormButton backgroundColor="bg-green-400" title="Submit" onPress={report} />
                </View>
            </View>
        </GenericModal>
    );
}
