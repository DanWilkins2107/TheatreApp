import { View, TouchableOpacity, Text, ScrollView, Modal } from "react-native";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { get, child, ref as dbRef } from "firebase/database";
import { launchImageLibraryAsync } from "expo-image-picker";
import { firebase_auth, firebase_db, storage } from "../../firebase.config.js";
import ProfilePanel from "../../components/ProfileElements/ProfilePanel.jsx";
import UserDetailsModal from "../../components/ProfileElements/UserDetailsModal.jsx";
import {
    faCircleExclamation,
    faCircleInfo,
    faPencil,
    faPhone,
    faRightFromBracket,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ProfilePicture from "../../components/ProfileElements/ProfilePicture.jsx";
import ContactInformationModal from "../../components/ProfileElements/ContactInformationModal.jsx";
import ReportErrorModal from "../../components/ProfileElements/ReportErrorModal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


export default function UserProfileScreen({ navigation }) {
    const [userName, setUserName] = useState("");
    let [modal, setModal] = useState(null);
    let auth = firebase_auth;
    let db = firebase_db;
    const storageRef = ref(storage);

    useEffect(() => {
        get(child(dbRef(db), `users/${auth.currentUser.uid}`)).then((snapshot) => {
            setUserName(snapshot.exists() ? [snapshot.val().firstName, snapshot.val().lastName] : "Anonymous");
        });
    }, []);

    const handleSignOut = () => {
        try {
            signOut(auth);
        } catch (error) { 
            alert("sign out failed:", error.message);
        }
    };

    const handleDeleteAccount = () => {
        alert("Delete Account");
    };

    const modals = [
        {
            name: "UserDetails",
            component: (
                <UserDetailsModal
                    closeModal={() => {
                        setModal(null);
                    }}
                />
            ),
        },
        {
            name: "ContactInformation",
            component: (
                <ContactInformationModal
                    closeModal={() => {
                        setModal(null);
                    }}
                />
            ),
        },
        {
            name: "ReportError",
            component: (
                <ReportErrorModal
                    closeModal={() => {
                        setModal(null);
                    }}
                />
            ),
        },
    ];

    const [profileURL, setProfileURL] = useState(firebase_auth.currentUser.photoURL || null);
    const [loading, setLoading] = useState(false);
    const handleProfileChange = async () => {
        launchImageLibraryAsync({ quality: 0.1 }).then((response) => {
            if (!response.canceled) {
                setLoading(true);
                fetch(response.assets[0].uri).then((image) => {
                    image.blob().then((blob) => {
                        uploadBytes(
                            ref(
                                storageRef,
                                "images/" +
                                    auth.currentUser.uid +
                                    response.assets[0].fileName.substring(
                                        response.assets[0].fileName.lastIndexOf(".")
                                    )
                            ),
                            blob
                        ).then((snapshot) => {
                            getDownloadURL(snapshot.ref)
                                .then((url) => {
                                    updateProfile(auth.currentUser, {
                                        photoURL: url,
                                    });
                                    setProfileURL(url);
                                    setLoading(false);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        });
                    });
                });
            }
        });
    };

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
                <View className="w-max bg-white flex-row rounded-3xl px-4 m-2 border-2 align-middle items-center">
                    <TouchableOpacity
                        className="m-3 w-max"
                        onPress={() => {
                            handleProfileChange();
                        }}
                    >
                        <ProfilePicture
                            className="z-10"
                            loading={loading}
                            profileURL={profileURL}
                            displayName={`${userName[0]} ${userName[1]}`}
                        />
                        <View className="absolute right-0 bottom-0 rounded-full bg-white w-14 h-14 z-20 flex justify-center items-center border-2 border-black">
                            <FontAwesomeIcon icon={(faPencil)} size={25}/>
                        </View>

                    </TouchableOpacity>
                    <View className="w-[212] flex-col">
                        <Text
                            className="ml-4 text-xl font-extrabold text-ellipsis"
                            numberOfLines={1}
                        >
                            {`${userName[0]} ${userName[1]}`}
                        </Text>
                    </View>
                </View>
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
                <ProfilePanel
                    backgroundColor="bg-red-500"
                    icon={faTrash}
                    text="Delete Account"
                    onClick={handleDeleteAccount}
                />
            </ScrollView>
        </>
    );
}
