import { View } from "react-native";
import GeneralModal from "../GeneralModal/GeneralModal.jsx";
import { firebase_auth, firebase_db } from "../../firebase.config.js";
import { useState, useEffect } from "react";
import EditInfo from "../Form/EditInfo.jsx";
import { set, ref, get } from "firebase/database";
import LoadingWheel from "../Loading/LoadingWheel.jsx";
import { updateProfile } from "firebase/auth";


export default function ContactInformationModal(props) {
    const db = firebase_db;
    const auth = firebase_auth;
    const [loading, setLoading] = useState(true);
    const [initialContactNo, setInitialContactNo] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [initialEmail, setInitialEmail] = useState(auth.currentUser.email);
    const [email, setEmail] = useState(auth.currentUser.email);
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
        <GeneralModal closeModal={props.closeModal}>
            {loading ? (
                <LoadingWheel size="large"/>
            ) : (
                <View className="flex flex-col items-center h-full">
                    <EditInfo
                        title="Contact Number"
                        variableToEdit={contactNo}
                        initialValue={initialContactNo}
                        onChange={setContactNo}
                        onSubmit={() => {
                            set(ref(db, "users/" + auth.currentUser.uid + "/contactNumber"), contactNo);
                            setInitialContactNo(contactNo);
                        }}
                    />
                    <View className="h-8"></View>
                    <EditInfo
                        title="Email"
                        variableToEdit={email}
                        initialValue={initialEmail}
                        onChange={setEmail}
                        onSubmit={() => {
                            updateProfile(auth.currentUser, { email: email });
                            set(ref(db, "users/" + auth.currentUser.uid + "/email"), email);
                            setInitialEmail(email);
                        }
                    }
                    />
                </View>
            )}
        </GeneralModal>
    );
}
