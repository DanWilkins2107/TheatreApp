import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { get, ref, onValue } from "firebase/database";
import { firebase_db } from "../../firebase.config.js";

export default function ProductionDashboardScreen({ route }) {
    const [production, setProduction] = useState({});
    const [admins, setAdmins] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const playCode = route.params.playCode;
    const db = firebase_db;

    useEffect(() => {
        onValue(
            ref(db, `/productions/${playCode}`),
            (snapshot) => {
                if (!snapshot.exists()) {
                    setLoading(false);
                    return;
                }
                const data = snapshot.val();
                setProduction(data);
            },
            { onlyOnce: true }
        );

        onValue(ref(db, `/productions/${playCode}/admins`), async (snapshot) => {
            if (!snapshot.exists()) return;
            const adminData = snapshot.val();
            const newAdmins = await Promise.all(
                Object.keys(adminData).map(async (admin) => {
                    return get(ref(db, `users/${admin}`))
                        .then((userSnapshot) => {
                            if (!userSnapshot.exists()) return;
                            const userData = userSnapshot.val();
                            return [userData.firstName, userData.lastName];
                        })
                        .catch((error) => {
                            console.log("uh oh: ", error.message);
                        });
                })
            );

            setAdmins(newAdmins);
        });

        onValue(ref(db, `/productions/${playCode}/participants`), async (snapshot) => {
            if (!snapshot.exists()) return;
            const participantData = snapshot.val();
            const newParticipants = await Promise.all(
                Object.keys(participantData).map(async (participant) => {
                    return get(ref(db, `users/${participant}`))
                        .then((userSnapshot) => {
                            if (!userSnapshot.exists()) return;
                            const userData = userSnapshot.val();
                            return [userData.firstName, userData.lastName];
                        })
                        .catch((error) => {
                            console.log("uh oh: ", error.message);
                        });
                })
            );

            setParticipants(newParticipants);
            setLoading(false);
        });

    }, []);

    return (
        <View className="flex-col">
            <Text className="self-center text-3xl font-extrabold">Production Dashboard</Text>
            {loading ? (
                <ActivityIndicator color="#000000" size="large" />
            ) : (
                <>
                    <View className="flex-row justify-around my-2">
                        <Text className="text-xl font-semibold">
                            Production: {production.playName}
                        </Text>
                        <Text className="text-xl font-semibold">{playCode}</Text>
                    </View>
                    <View className="flex-col m-2">
                        <Text className="text-xl font-semibold">Admins:</Text>
                        {admins.map((admin, index) => {
                            return (
                                <Text key={index}>
                                    {admin[0]} {admin[1]}
                                </Text>
                            );
                        })}
                    </View>
                    <View className="flex-col m-2">
                        <Text className="text-xl font-semibold">Participants:</Text>
                        {participants.map((participant, index) => {
                            return (
                                <Text key={index}>
                                    {participant[0]} {participant[1]}
                                </Text>
                            );
                        })}
                    </View>
                </>
            )}
        </View>
    );
}
