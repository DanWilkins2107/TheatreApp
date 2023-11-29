import { View } from "react-native";
import GeneralModal from "../GeneralModal/GeneralModal.jsx";
import { firebase_auth, firebase_db } from "../../firebase.config.js";
import { useState, useEffect } from "react";
import EditInfo from "../Form/EditInfo.jsx";
``;
import { set, ref, get } from "firebase/database";
import LoadingWheel from "../Loading/LoadingWheel.jsx";

export default function UserDetailsModal(props) {
    const db = firebase_db;
    const auth = firebase_auth;
    const [loading, setLoading] = useState(true);
    const [initialFirstName, setInitialFirstName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [initialLastName, setInitialLastName] = useState("");
    const [lastName, setLastName] = useState("");
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
        <GeneralModal closeModal={props.closeModal}>
            {loading ? (
                <LoadingWheel />
            ) : (
                <View className="flex flex-col items-center h-full">
                    <EditInfo
                        title="First Name"
                        variableToEdit={firstName}
                        initialValue={initialFirstName}
                        onChangeFunction={(text) => {
                            setFirstName(_old => text)
                        }}
                        onSubmitFunction={() => {
                            set(ref(db, "users/" + auth.currentUser.uid + "/firstName"), firstName);
                            setInitialFirstName(firstName);
                        }}
                    />
                    <View className="h-8"></View>
                    <EditInfo
                        title="Last Name"
                        variableToEdit={lastName}
                        initialValue={initialLastName}
                        onChangeFunction={(text) => setLastName(_old => text)}
                        onSubmitFunction={() => {
                            set(ref(db, "users/" + auth.currentUser.uid + "/lastName"), lastName);
                            setInitialLastName(lastName);
                        }}
                    />
                </View>
            )}
        </GeneralModal>
    );
}
