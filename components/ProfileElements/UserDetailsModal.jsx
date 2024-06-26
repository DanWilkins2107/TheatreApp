import { View } from "react-native";
import { firebase_auth, firebase_db } from "../../firebase.config.js";
import { useState, useEffect, useContext } from "react";
import EditInfo from "../Form/EditInfo.jsx";
import { set, ref, get } from "firebase/database";
import LoadingWheel from "../Loading/LoadingWheel.jsx";
import { AlertContext } from "../../components/Alert/AlertProvider.jsx";

export default function UserDetailsModal() {
    const db = firebase_db;
    const auth = firebase_auth;
    const [loading, setLoading] = useState(true);
    const [initialFirstName, setInitialFirstName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [initialLastName, setInitialLastName] = useState("");
    const [lastName, setLastName] = useState("");
    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        const userRef = ref(db, "users/" + auth.currentUser.uid);
        get(userRef).then((userSnapshot) => {
            if (!userSnapshot.exists()) return;
            const userData = userSnapshot.val();
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setInitialFirstName(userData.firstName);
            setInitialLastName(userData.lastName);
            setLoading(false);
        });
    }, []);

    const submitName = (string, nameVariable, editInitialValue) => {
        try {
            set(ref(db, "users/" + auth.currentUser.uid + "/" + string), nameVariable);
            editInitialValue(nameVariable);
            setAlert(
                string + " updated successfully",
                "bg-green-500",
                "check-circle"
            );
        } catch (error) {
            setAlert(
                "Error updating " + string + ". Please Try Again.",
                "bg-red-500",
                "exclamation-circle"
            );
        }
    };

    return (
        <>
            {loading ? (
                <LoadingWheel size="large" />
            ) : (
                <View className="flex items-center">
                    <EditInfo
                        title="First Name"
                        variableToEdit={firstName}
                        initialValue={initialFirstName}
                        onChange={setFirstName}
                        onSubmit={() => submitName("First name", firstName, setInitialFirstName)}
                    />
                    <View className="h-8"></View>
                    <EditInfo
                        title="Last Name"
                        variableToEdit={lastName}
                        initialValue={initialLastName}
                        onChange={setLastName}
                        onSubmit={() => submitName("Last name", lastName, setInitialLastName)}
                    />
                </View>
            )}
        </>
    );
}
