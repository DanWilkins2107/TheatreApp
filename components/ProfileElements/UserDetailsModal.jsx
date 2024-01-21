import { View } from "react-native";
import { firebase_auth, firebase_db } from "../../firebase.config.js";
import { useState, useEffect, useContext } from "react";
import EditInfo from "../Form/EditInfo.jsx";
import { set, ref, get } from "firebase/database";
import LoadingWheel from "../Loading/LoadingWheel.jsx";
import { AlertContext } from "../../components/Alert/AlertProvider.jsx";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function UserDetailsModal(props) {
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

    return (
        <>
            {loading ? (
                <LoadingWheel size="large" />
            ) : (
                <View className="flex flex-col items-center h-full">
                    <EditInfo
                        title="First Name"
                        variableToEdit={firstName}
                        initialValue={initialFirstName}
                        onChange={setFirstName}
                        onSubmit={() => {
                            try {
                                set(
                                    ref(db, "users/" + auth.currentUser.uid + "/firstName"),
                                    firstName
                                );
                                setInitialFirstName(firstName);
                                setAlert(
                                    "First name updated successfully",
                                    "bg-green-500",
                                    icon({ name: "circle-check" })
                                );
                            } catch (error) {
                                setAlert(
                                    "Error updating First Name. Please Try Again.",
                                    "bg-red-500",
                                    icon({ name: "circle-exclamation" })
                                );
                            }
                        }}
                    />
                    <View className="h-8"></View>
                    <EditInfo
                        title="Last Name"
                        variableToEdit={lastName}
                        initialValue={initialLastName}
                        onChange={setLastName}
                        onSubmit={() => {
                            try {
                                set(
                                    ref(db, "users/" + auth.currentUser.uid + "/lastName"),
                                    lastName
                                );
                                setInitialLastName(lastName);
                                setAlert(
                                    "Last name updated successfully",
                                    "bg-green-500",
                                    icon({ name: "circle-check" })
                                );
                            } catch (error) {
                                setAlert(
                                    "Error updating Last Name. Please Try Again.",
                                    "bg-red-500",
                                    icon({ name: "circle-exclamation" })
                                );
                            }
                        }}
                    />
                </View>
            )}
        </>
    );
}
