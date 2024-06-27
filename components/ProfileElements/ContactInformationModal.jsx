import { View } from "react-native";
import { firebase_auth, firebase_db } from "../../firebase.config.js";
import { useState, useEffect, useContext } from "react";
import EditInfo from "../Form/EditInfo.jsx";
import { set, ref, get } from "firebase/database";
import LoadingWheel from "../Loading/LoadingWheel.jsx";
import { updateProfile } from "firebase/auth";
import { AlertContext } from "../../components/Alert/AlertProvider.jsx";

export default function ContactInformationModal() {
    const db = firebase_db;
    const auth = firebase_auth;
    const [loading, setLoading] = useState(true);
    const [initialContactNo, setInitialContactNo] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [initialEmail, setInitialEmail] = useState(auth.currentUser.email);
    const [email, setEmail] = useState(auth.currentUser.email);
    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        const userRef = ref(db, "users/" + auth.currentUser.uid);
        get(userRef).then((userSnapshot) => {
            if (!userSnapshot.exists()) return;
            const userData = userSnapshot.val();
            setContactNo(userData.contactNumber);
            setInitialContactNo(userData.contactNumber);
            setLoading(false);
        });
    }, []);
    return (
        <>
            {loading ? (
                <LoadingWheel size="large" />
            ) : (
                <View className="flex items-center">
                    <EditInfo
                        title="Contact Number"
                        variableToEdit={contactNo}
                        initialValue={initialContactNo}
                        onChange={setContactNo}
                        onSubmit={() => {
                            try {
                                set(
                                    ref(db, "users/" + auth.currentUser.uid + "/contactNumber"),
                                    contactNo
                                );
                                setInitialContactNo(contactNo);
                                setAlert(
                                    "Contact number updated successfully",
                                    "bg-green-500",
                                    "check-circle"
                                );
                            } catch (error) {
                                setAlert(
                                    "Error updating Contact Number. Please Try Again.",
                                    "bg-red-500",
                                    "exclamation-circle"
                                );
                            }
                        }}
                    />
                    <View className="h-8"></View>
                    <EditInfo
                        title="Email"
                        variableToEdit={email}
                        initialValue={initialEmail}
                        onChange={setEmail}
                        onSubmit={() => {
                            try {
                                updateProfile(auth.currentUser, { email: email });
                                set(ref(db, "users/" + auth.currentUser.uid + "/email"), email);
                                setInitialEmail(email);
                                setAlert(
                                    "Email updated successfully",
                                    "bg-green-500",
                                    "check-circle"
                                );
                            } catch (error) {
                                setAlert(
                                    "Could not update email. Please Try Again.",
                                    "bg-red-500",
                                    "exclamation-circle"
                                );
                            }
                        }}
                    />
                </View>
            )}
        </>
    );
}
