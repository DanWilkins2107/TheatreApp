import { useState, useEffect, useContext } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { get, ref, onValue } from "firebase/database";
import { firebase_db, firebase_auth } from "../../firebase.config.js";
import ProductionDashboardButton from "../../components/Budget/ProductionDashboardButton.jsx";
import CreateBudgetModal from "../../components/Budget/CreateBudgetModal.jsx";
import ViewBudgetModal from "../../components/Budget/ViewBudgetModal.jsx";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFA5 from "react-native-vector-icons/FontAwesome5";
import { ModalContext } from "../../components/Modal/ModalProvider.jsx";
import ProfilePictureArray from "../../components/Participants/ProfilePictureArray.jsx";
import ProductionCodeButton from "../../components/UserDashboard/ProductionCodeButton.jsx";
import ProductionCodeModal from "../../components/ProductionModals/ProductionCodeModal.jsx";

// TODO:
// - Modal popup on press of playcode
//      > Change playcode option for admin
//      > [future] QR code for joining
// - Refactor play keys in database
//      > UUIDv7 (no import)

export default function ProductionDashboardScreen({ navigation, route }) {
    const [production, setProduction] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const productionID = route.params.productionID;
    console.log("production id: " + productionID)
    const db = firebase_db;
    const auth = firebase_auth;

    const { setModal } = useContext(ModalContext);

    useEffect(() => {
        onValue(
            ref(db, `/productions/${productionID}`),
            (snapshot) => {
                if (!snapshot.exists()) {
                    setLoading(false);
                    return;
                }
                const data = snapshot.val();
                console.log(data)
                setProduction(data);
            },
            { onlyOnce: true }
        );

        onValue(ref(db, `/productions/${productionID}/admins`), async (snapshot) => {
            if (!snapshot.exists()) return;
            const adminData = snapshot.val();
            if (adminData[auth.currentUser.uid]) {
                setIsAdmin(true);
            }
            setAdmins(Object.keys(adminData));
        });

        onValue(ref(db, `/productions/${productionID}/participants`), async (snapshot) => {
            if (!snapshot.exists()) return;
            const participantData = snapshot.val();
            setParticipants(Object.keys(participantData));
            setLoading(false);
        });
    }, []);

    const fetchBudgets = async () => {
        try {
            const prodSnapshot = await get(ref(db, `productions/${productionID}/budgets`));
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
                    setModal(null);
                }}
            />
        );
    };

    return (
        // TODO: Restyle this page
        <View className="flex-col items-center">
            {loading ? (
                <ActivityIndicator color="#000000" size="large" />
            ) : (
                <>
                    <View className="flex-col border-2 rounded-3xl items-center justify-between mb- mt-4 px-16 pt-2 pb-4">
                        <Text className="text-3xl font-extrabold">{production.productionName}</Text>
                        <View className="py-1" />
                        <ProductionCodeButton
                            productionCode={production.productionCode}
                            onPress={() =>
                                setModal(<ProductionCodeModal productionCode={production.productionCode} />)
                            }
                        />
                        <View className="py-1" />
                        <ProfilePictureArray participants={participants} size={12} />
                    </View>
                    <ScrollView className="flex flex-col m-2">
                        {isAdmin && (
                            <ProductionDashboardButton
                                text="Create Budget"
                                onPress={() =>
                                    setModal(<CreateBudgetModal productionID={productionID} />)
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
                                    productionID: productionID,
                                })
                            }
                        >
                            <IconFA5 name="file-invoice-dollar" size={50} />
                        </ProductionDashboardButton>
                        {isAdmin && (
                            <ProductionDashboardButton
                                text="Admin Stuff"
                                onPress={() =>
                                    navigation.navigate("Admin", { productionID: productionID })
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
                    </ScrollView>
                </>
            )}
        </View>
    );
}
