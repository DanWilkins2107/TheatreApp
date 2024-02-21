import { Text, TouchableOpacity, View } from "react-native";
import { firebase_db } from "../../firebase.config";
import { ref, onValue, get } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect, useState } from "react";

export default function BudgetInfo(props) {
    const db = firebase_db;
    const [budget, setBudget] = useState({});
    const [participants, setParticipants] = useState([]);

    const findParticipants = async (participants) => {
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
                        return;
                    });
            })
        );

        setParticipants(newParticipants);
    };

    useEffect(() => {
        try {
            onValue(ref(db, `budgets/${props.budgetCode}`), (budgetSnapshot) => {
                if (!budgetSnapshot.exists()) {
                    setAlert(
                        "Could not find budget.",
                        "bg-red-500",
                        icon({ name: "circle-exclamation" })
                    );
                    return;
                }
                setBudget(budgetSnapshot.val());
                findParticipants(budget.participants);
            });
        } catch (error) {
            console.log("error occurred when fetching budgets.");
        }
    }, []);

    return (
        <TouchableOpacity
            onPress={props.onClick}
            className="flex flex-col px-5 py-2 border-2 rounded-xl my-2"
        >
            <View className="flex flex-row justify-between">
                <Text className="text-2xl font-bold">{budget.name}</Text>
                <FontAwesomeIcon icon={icon({ name: "chevron-right" })} size={20} className="py-2z" />
            </View>
            <Text className="text-lg font-light">Budget: £{budget.budget}</Text>
            <Text className="text-lg font-light">
                Participants:{" "}
                {participants ? participants : "no participants"}
            </Text>
        </TouchableOpacity>
    );
}
