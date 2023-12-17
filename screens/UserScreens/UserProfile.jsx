import { View, TouchableOpacity, Text, ScrollView, Modal } from "react-native";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { updateProfile, deleteUser } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { get, child, ref as dbRef, remove, set } from "firebase/database";
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
    const [modal, setModal] = useState(null);
    const auth = firebase_auth;
    const db = firebase_db;
    const storageRef = ref(storage);

    useEffect(() => {
        get(child(dbRef(db), `users/${auth.currentUser.uid}`)).then((snapshot) => {
            setUserName(
                snapshot.exists()
                    ? [snapshot.val().firstName, snapshot.val().lastName]
                    : "Anonymous"
            );
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
        try {
            // Find all of user's productions
            get(child(dbRef(db), `users/${auth.currentUser.uid}/productions`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const productions = snapshot.val();
                    // Delete user from all productions
                    Object.keys(productions).forEach((playCode) => {
                        remove(
                            dbRef(
                                db,
                                `productions/${playCode}/participants/${auth.currentUser.uid}`
                            )
                        );
                        get(child(dbRef(db), `productions/${playCode}/admins`)).then((snapshot) => {
                            if (snapshot.exists()) {
                                const admins = Object.keys(snapshot.val());
                                if (admins.includes(auth.currentUser.uid)) {
                                    if (admins.length === 1) {
                                        // If only one admin, add someone in from participants or delete production
                                        get(
                                            child(dbRef(db), `productions/${playCode}/participants`)
                                        ).then((snapshot) => {
                                            if (snapshot.exists()) {
                                                const participants = Object.keys(snapshot.val());
                                                // If there are other participants, make first one an admin
                                                set(dbRef(db, `productions/${playCode}/admins`), {
                                                    [participants[0]]: Date.now(),
                                                });
                                            } else {
                                                // If there are no participants, delete production.
                                                remove(dbRef(db, `productions/${playCode}`));
                                            }
                                        });
                                    } else {
                                        // If user is in list of admins, but is not the only admin, remove user
                                        remove(
                                            dbRef(
                                                db,
                                                `productions/${playCode}/admins/${auth.currentUser.uid}`
                                            )
                                        );
                                    }
                                }
                            }
                        });
                    });
                }
            });
            // // Delete user from database
            // remove(ref(db, `users/${auth.currentUser.uid}`));
            // // Delete user from authentication
            // deleteUser(auth.currentUser);
        } catch (error) {
            alert("delete account failed:", error.message);
        }
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

    const handleProfileChange = async () => {
        launchImageLibraryAsync({ quality: 0.1 }).then((response) => {
            if (!response.canceled) {
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
                                    set(dbRef(db, "users/" + auth.currentUser.uid + "/profileURL"), url);
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

    //TODO: Add form validation for all of the modals

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
                        className="my-3 w-32"
                        onPress={() => {
                            handleProfileChange();
                        }}
                    >
                        <ProfilePicture
                            className="z-10"
                            dimensions={32}
                            textSize="text-4xl"
                            userId={auth.currentUser.uid}
                            loadingSize="large"
                        />
                        <View className="absolute right-0 bottom-0 rounded-full bg-white w-14 h-14 z-20 flex justify-center items-center border-2 border-black">
                            <FontAwesomeIcon icon={faPencil} size={25} />
                        </View>
                    </TouchableOpacity>
                    <View className="flex-1 flex-col">
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
