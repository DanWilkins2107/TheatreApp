import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { get, onValue, ref } from "firebase/database";
import { firebase_db } from "../../firebase.config.js";

export default function AdminScreen({ navigation, route }) {
    const [participants, setParticipants] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [production, setProduction] = useState({});
    const db = firebase_db;
    const playCode = route.params.productionCode;

    console.log("playCode: ", playCode);

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
        });
    }, []);

    return (
        <View>
            <View>
                <Text>{production.title}</Text>
                {admins.map((admin) => {
                    return (
                        <Text>
                            {admin[0]} {admin[1]}
                        </Text>
                    );
                })}
                {participants.map((participant) => {
                    return (
                        <Text>
                            {participant[0]} {participant[1]}
                        </Text>
                    );
                })}
                <View>
                    {participants.map((participant) => {
                        return (
                            <Text>
                                {participant[0]} {participant[1]}
                            </Text>
                        ); 

                    })}
                </View>
            </View>
        </View>
    );
}
