import { Text, View } from "react-native";
import { useEffect, useState, useContext } from "react";
import AvailabilityCalendar from "../../components/Availability/AvailabilityCalendar";
import SmallFormButton from "../../components/Form/SmallFormButton";
import { ref, set, get, child } from "firebase/database";
import { firebase_auth, firebase_db } from "../../firebase.config";
import { randomUUID } from "expo-crypto";
import { AlertContext } from "../../components/Alert/AlertProvider";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Availability({navigation, route}) {
    const [availabilityInfo, setAvailabilityInfo] = useState({});
    const [initialAvailabilityInfo, setInitialAvailabilityInfo] = useState({});
    const db = firebase_db;
    const auth = firebase_auth;
    const playCode = route.params.productionCode;
    const { setAlert } = useContext(AlertContext);

    const onSubmit = () => {
        const dbRef = ref(db);
        let availabilityUID;
        try {
            get(child(dbRef, `/productions/${playCode}/availability/`)).then(
                (snapshot) => {
                    const data = snapshot.val();
                    if (!data) {
                        console.log("No availability found, creating new availability entry.")
                        availabilityUID = randomUUID();
                        set(
                            ref(
                                db,
                                `/productions/${playCode}/availability/${auth.currentUser.uid}`
                            ),
                            availabilityUID
                        );
                    } else {
                        availabilityUID = data[auth.currentUser.uid];
                    }
                    set(ref(db, `/availabilities/${availabilityUID}/`), availabilityInfo);
                    setAlert("Availability updated", "bg-green-500", icon({ name: "check-circle" }));
                    setInitialAvailabilityInfo({...availabilityInfo});
                }
            )
        } catch (error) {
            setAlert("Could not update availability", "bg-red-500", icon({ name: "circle-exclamation" }));
        }
    };

    const onReset = () => {
        console.log("Resetting availability info", initialAvailabilityInfo, "to", availabilityInfo);
        setAvailabilityInfo({...initialAvailabilityInfo});
    };

    useEffect(() => {
        const dbRef = ref(db);
        get(child(dbRef, `/productions/${playCode}/availability/`)).then((snapshot) => {
            const data = snapshot.val();
            if (data) {
                const availabilityUID = data[auth.currentUser.uid];
                get(ref(db, `/availabilities/${availabilityUID}/`)).then((snapshot) => {
                    setInitialAvailabilityInfo(snapshot.val());
                    setAvailabilityInfo(snapshot.val());
                });
            }
        });
    }, []);

    return (
        <View className="flex-1 items-center p-2">
            <Text className="text-3xl font-extrabold mb-4">Set Availability</Text>
            <View className="w-full flex-1 border-b mb-8 ">
                <AvailabilityCalendar
                    availabilityInfo={availabilityInfo}
                    setAvailabilityInfo={setAvailabilityInfo}
                />
            </View>
            <View className="flex flex-row justify-around w-full mb-8">
                <SmallFormButton title="Submit" backgroundColor="bg-green-400" onPress={onSubmit} />
                <SmallFormButton title="Reset" backgroundColor="bg-white" onPress={onReset} />
            </View>
        </View>
    );
}
