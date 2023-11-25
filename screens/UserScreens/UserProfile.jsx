import { ScrollView, Modal } from "react-native";
import { signOut } from "firebase/auth";
import { useState } from "react";
import ProfilePanel from "../../components/ProfileElements/ProfilePanel.jsx";
import UserDetailsModal from "../../components/ProfileElements/UserDetailsModal.jsx";

import {
    faCircleExclamation,
    faCircleInfo,
    faPhone,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import ProfilePicture from "../../components/ProfileElements/ProfilePicture.jsx";
import ContactInformationModal from "../../components/ProfileElements/ContactInformationModal.jsx";
import ReportErrorModal from "../../components/ProfileElements/ReportErrorModal.jsx";
import { firebase_auth } from "../../firebase.config.js";

export default function UserProfileScreen({ navigation }) {
    let [modal, setModal] = useState(null);
    let auth = firebase_auth;
    const handleSignOut = () => {
        try {
            signOut(auth);
        } catch (error) { 
            alert("sign out failed:", error.message);
        }
    };

    const modals = [
        { name: "UserDetails", component: <UserDetailsModal closeModal={() => {setModal(null)}}/> },
        { name: "ContactInformation", component: <ContactInformationModal closeModal={() => {setModal(null)}}/> },
        { name: "ReportError", component: <ReportErrorModal closeModal={() => {setModal(null)}}/> },
    ];

    return (
        <>
            {modals.map((item) => {
                return (
                    <Modal
                        key={item.name}
                        animationType="fade"
                        transparent={true}
                        visible={modal === item.name}
                        onRequestClose={() => {
                            setModal(null);
                        }}
                    >
                        {item.component}
                    </Modal>
                );
            })}
            <ScrollView className="flex flex-col h-full">
                <ProfilePicture />
                <ProfilePanel
                    icon={faCircleInfo}
                    text="User Details"
                    onClick={() => {
                        setModal("UserDetails");
                    }}
                />
                <ProfilePanel
                    icon={faPhone}
                    text="Contact Information"
                    onClick={() => {
                        setModal("ContactInformation");
                    }}
                />
                <ProfilePanel
                    icon={faCircleExclamation}
                    text="Report Error"
                    onClick={() => {
                        setModal("ReportError");
                    }}
                />
                <ProfilePanel
                    backgroundColor="bg-red-300"
                    icon={faRightFromBracket}
                    text="Sign Out"
                    onClick={handleSignOut}
                />
            </ScrollView>
        </>
    );
}
