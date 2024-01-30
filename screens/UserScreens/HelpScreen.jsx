import { View } from "react-native";
import { useState } from "react";
import { firebase_auth, firebase_db } from "../../firebase.config.js";
import { set, ref } from "firebase/database";
import FormField from "../../components/Form/FormField";
import SmallFormButton from "../../components/Form/SmallFormButton";

const descriptions = {
    ReportError:
        "Describe what happened in detail. If you can, include the steps you took to get to this point.",
    AskQuestion: "Further details about your question.",
    SuggestImprovement: "Further details about your suggestion.",
};

export default function HelpScreen({ navigation, type }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
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
    };

    return (
        <View className="flex-1">
            <View className="flex-1 flex-col">
                <FormField title="Title" onChangeText={setTitle} value={title} placeholder="Title" />
                <FormField
                    title="Description"
                    onChangeText={setDescription}
                    value={description}
                    placeholder={descriptions[type]}
                    multiline
                />
            </View>
            <View className="flex-1">
                <SmallFormButton backgroundColor="bg-green-400" title="Submit" onPress={report} />
            </View>
        </View>
    );
}
