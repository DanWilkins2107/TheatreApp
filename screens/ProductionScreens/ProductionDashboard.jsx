import { useState, useEffect, useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { get, ref, onValue } from "firebase/database";
import { firebase_db, firebase_auth } from "../../firebase.config.js";
import ProductionDashboardButton from "../../components/Budget/ProductionDashboardButton.jsx";
import CreateBudgetModal from "../../components/Budget/CreateBudgetModal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faPiggyBank,
    faSearchDollar,
    faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";
import { ModalContext } from "../../components/Modal/ModalProvider.jsx";

export default function ProductionDashboardScreen({ navigation, route }) {
    const [production, setProduction] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const playCode = route.params.playCode;
    const db = firebase_db;
    const auth = firebase_auth;

    const { setModal } = useContext(ModalContext);

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
            if (adminData[auth.currentUser.uid]) {
                setIsAdmin(true);
            }
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

                        <View className="flex flex-col m-2">
                            {isAdmin && (
                                <ProductionDashboardButton
                                    text="Create Budget"
                                    onPress={() =>
                                        setModal(<CreateBudgetModal productionCode={playCode} />)
                                    }
                                >
                                    <FontAwesomeIcon icon={faPiggyBank} size={50} />
                                </ProductionDashboardButton>
                            )}
                            <ProductionDashboardButton
                                text="View Budget"
                                onPress={() => navigation.navigate("BudgetHome")}
                            >
                                <FontAwesomeIcon icon={faSearchDollar} size={50} />
                            </ProductionDashboardButton>
                            <ProductionDashboardButton
                                text="Add Expense"
                                onPress={() =>
                                    navigation.navigate("BudgetAddExpense", {
                                        productionCode: playCode,
                                    })
                                }
                            >
                                <FontAwesomeIcon icon={faFileInvoiceDollar} size={50} />
                            </ProductionDashboardButton>
                            {isAdmin && (
                                <ProductionDashboardButton
                                    text="Admin Stuff"
                                    onPress={() =>
                                        navigation.navigate("Admin", { productionCode: playCode })
                                    }
                                >
                                    <FontAwesomeIcon icon={faFileInvoiceDollar} size={50} />
                                </ProductionDashboardButton>
                            )}
                            <ProductionDashboardButton
                                text="View Schedule"
                                onPress={() => alert("Need to Implement")}
                            >
                                <FontAwesomeIcon icon={faFileInvoiceDollar} size={50} />
                            </ProductionDashboardButton>
                            {isAdmin && (
                                <ProductionDashboardButton
                                    text="Create Schedule"
                                    onPress={() => alert("Need to Implement")}
                                >
                                    <FontAwesomeIcon icon={faFileInvoiceDollar} size={50} />
                                </ProductionDashboardButton>
                            )}
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}
