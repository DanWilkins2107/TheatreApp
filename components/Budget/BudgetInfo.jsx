import { Text, TouchableOpacity, View } from "react-native";
import LoadingWheel from "../Loading/LoadingWheel";
import { firebase_db } from "../../firebase.config";
import { ref, onValue, get } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect, useState } from "react";

export default function BudgetInfo(props) {
    const db = firebase_db;
    const [loading, setLoading] = useState(true);
    const [budget, setBudget] = useState({});
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        try {
            onValue(ref(db, `budgets/${props.budgetCode}`), async (budgetSnapshot) => {
                if (!budgetSnapshot.exists()) {
                    setAlert(
                        "Could not find budget.",
                        "bg-red-500",
                        icon({ name: "circle-exclamation" })
                    );
                    return;
                }

                setBudget(budgetSnapshot.val());

                const participants = budgetSnapshot.val().participants;
                const newParticipants = await Promise.all(
                    Object.keys(participants).map(async (participant) => {
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
        } catch (error) {
            setAlert(
                "Error occurred when fetching budgets.",
                "bg-red-500",
                icon({ name: "circle-exclamation" })
            );
            return;
        }
    }, []);

    return (
        <TouchableOpacity
            onPress={loading ? () => {} : props.onClick}
            className="flex px-5 py-2 border-2 rounded-xl my-2"
        >
            {loading ? (
                <LoadingWheel size="large" color="#0000ff" />
            ) : (
                <>
                    <View className="flex flex-row justify-between">
                        <Text className="text-2xl font-bold">{budget.name}</Text>
                        <FontAwesomeIcon
                            icon={icon({ name: "chevron-right" })}
                            size={20}
                            className="py-2z"
                        />
                    </View>
                    <Text className="text-lg font-light">Budget: £{budget.budget}</Text>
                    <Text className="text-lg font-light">
                        Participants: {participants ? participants : "no participants"}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
}
