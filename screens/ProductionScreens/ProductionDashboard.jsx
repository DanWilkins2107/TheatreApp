import { useState, useEffect, useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { get, ref, onValue } from "firebase/database";
import { firebase_db, firebase_auth } from "../../firebase.config.js";
import ProductionDashboardButton from "../../components/Budget/ProductionDashboardButton.jsx";
import CreateBudgetModal from "../../components/Budget/CreateBudgetModal.jsx";
import ViewBudgetModal from "../../components/Budget/ViewBudgetModal.jsx";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFA5 from "react-native-vector-icons/FontAwesome5";
import { ModalContext } from "../../components/Modal/ModalProvider.jsx";
import Title from "../../components/TextStyles/Title.jsx";
import Subtitle from "../../components/TextStyles/Subtitle.jsx";

export default function ProductionDashboardScreen({ navigation, route }) {
    const [production, setProduction] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const productionCode = route.params.playCode;
    const db = firebase_db;
    const auth = firebase_auth;

    const { setModal } = useContext(ModalContext);

    useEffect(() => {
        onValue(
            ref(db, `/productions/${productionCode}`),
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

        onValue(ref(db, `/productions/${productionCode}/admins`), async (snapshot) => {
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

        onValue(ref(db, `/productions/${productionCode}/participants`), async (snapshot) => {
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

    const fetchBudgets = async () => {
        try {
            const prodSnapshot = await get(ref(db, `productions/${productionCode}/budgets`));
            if (!prodSnapshot.exists()) {
                return {};
            }
            let newBudgets = {};
            const budgetUUIDs = Object.keys(prodSnapshot.val());
            await Promise.all(
                budgetUUIDs.map(async (budgetUUID) => {
                    const budgetInfo = await get(ref(db, `budgets/${budgetUUID}`));
                    if (!budgetInfo.exists()) {
                        return;
                    }
                    if (
                        budgetInfo.val().participants &&
                        Object.keys(budgetInfo.val().participants).includes(auth.currentUser.uid)
                    ) {
                        newBudgets[budgetUUID] = budgetInfo.val();
                    }
                })
            );
            return newBudgets;
        } catch (error) {
            console.log(error.message);
            setAlert("Could not find all the budgets", "bg-red-400");
            return {};
        }
    };

    const handleChooseBudgetPress = async () => {
        setModal(
            <ViewBudgetModal
                budgets={{}}
                loading={true}
                onPress={(budget) => {
                    setModal(null);
                }}
            />
        );
        const newBudgets = await fetchBudgets();
        setModal(
            <ViewBudgetModal
                budgets={newBudgets}
                loading={false}
                onPress={(budget) => {
                    navigation.navigate("BudgetMain", { budgetUUID: budget });
                    setModal(null)
                }}
            />
        );
    };

    return (
        // TODO: Restyle this page
        <View className="flex-col">
            <Title extraClassName="text-center mt-4">Production Dashboard</Title>
            {loading ? (
                <ActivityIndicator color="#000000" size="large" />
            ) : (
                <>
                    <View className="flex-row justify-around my-2">
                        <Subtitle>Production: {production.playName}</Subtitle>
                        <Subtitle>{productionCode}</Subtitle>
                    </View>
                    <View className="flex-col m-2">
                        <Subtitle>Admins:</Subtitle>
                        {admins.map((admin, index) => {
                            return (
                                <Text key={index}>
                                    {admin[0]} {admin[1]}
                                </Text>
                            );
                        })}
                    </View>
                    <View className="flex-col m-2">
                        <Subtitle>Participants:</Subtitle>
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
                                        setModal(<CreateBudgetModal productionCode={productionCode} />)
                                    }
                                >
                                    <IconFA5 name="plus" size={50} />
                                </ProductionDashboardButton>
                            )}
                            <ProductionDashboardButton
                                text="View Budget"
                                onPress={handleChooseBudgetPress}
                            >
                                <IconFA5 name="search-dollar" size={50} />
                            </ProductionDashboardButton>
                            <ProductionDashboardButton
                                text="Add Expense"
                                onPress={() =>
                                    navigation.navigate("BudgetAddExpense", {
                                        productionCode: productionCode,
                                    })
                                }
                            >
                                <IconFA5 name="file-invoice-dollar" size={50} />
                            </ProductionDashboardButton>
                            <ProductionDashboardButton
                                text="Set Availability"
                                onPress={() => navigation.navigate("Availability")}
                            >
                                <FontAwesomeIcon icon={faCalendarCheck} size={50} />
                            </ProductionDashboardButton>
                            {isAdmin && (
                                <ProductionDashboardButton
                                    text="Admin Stuff"
                                    onPress={() =>
                                        navigation.navigate("Admin", { productionCode: productionCode })
                                    }
                                >
                                    <Icon name="cogs" size={50} />
                                </ProductionDashboardButton>
                            )}
                            <ProductionDashboardButton
                                text="View Schedule"
                                onPress={() => alert("Need to Implement")}
                            >
                                <IconFA5 name="eye" size={50} />
                            </ProductionDashboardButton>
                            {isAdmin && (
                                <ProductionDashboardButton
                                    text="Create Schedule"
                                    onPress={() => alert("Need to Implement")}
                                >
                                    <IconFA5 name="business-time" size={50} />
                                </ProductionDashboardButton>
                            )}
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}
