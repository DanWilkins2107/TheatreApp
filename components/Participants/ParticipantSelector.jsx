import Checkbox from "./Checkbox";
import { ScrollView, View, Text } from "react-native";
import ProfilePicture from "../ProfileElements/ProfilePicture";
import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { firebase_db } from "../../firebase.config";

export default function ParticipantSelector({ participants, setParticipants }) {
    const [participantDisplayNames, setParticipantDisplayNames] = useState({});
    const [allChecked, setAllChecked] = useState(false);
    const db = firebase_db;

    useEffect(() => {
        const fetchParticipantNames = async () => {
            const participantNames = {};
            const promises = Object.keys(participants).map(async (participantKey) => {
                try {
                    const userSnapshot = await get(ref(db, `users/${participantKey}`));
                    if (!userSnapshot.exists()) {
                        participantNames[participantKey] = "Deleted Account";
                    } else {
                        const userData = userSnapshot.val();
                        participantNames[
                            participantKey
                        ] = `${userData.firstName} ${userData.lastName}`;
                    }
                } catch (error) {
                    console.log("uh oh: ", error.message);
                }
            });
            await Promise.all(promises);
            setParticipantDisplayNames(participantNames);
        };
        fetchParticipantNames();
    }, [participants]);

    return (
        <>
            <View className="h-16 border-2 w-full flex flex-row justify-between items-center px-4">
                <Text className="font-bold">Select Participants</Text>
                <Checkbox
                    checked={allChecked}
                    setChecked={() => {
                        let newParticipants = {};
                        Object.keys(participants).forEach((participant) => {
                            newParticipants[participant] = !allChecked;
                        });
                        setParticipants(newParticipants);
                        setAllChecked(!allChecked);
                    }}
                />
            </View>
            <ScrollView className="max-h-64">
                {Object.keys(participants).map((participant) => {
                    return (
                        <View
                            key={participant}
                            className="h-16 border-2 w-full flex flex-row justify-between items-center px-4 mt-[-2]"
                        >
                            <ProfilePicture
                                dimensions={10}
                                textSize="2xl"
                                userId={participant}
                                className="mx-10"
                                loadingSize="small"
                            />
                            <Text className="w-3/6">{participantDisplayNames[participant]}</Text>
                            <Checkbox
                                checked={participants[participant]}
                                setChecked={() => {
                                    setParticipants({
                                        ...participants,
                                        [participant]: !participants[participant],
                                    });
                                }}
                            />
                        </View>
                    );
                })}
            </ScrollView>
        </>
    );
}
