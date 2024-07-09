import { View, Text, ScrollView, ActivityIndicator, Button } from "react-native";
import { useState, useCallback, useContext } from "react";
import { onValue, get, ref, child } from "firebase/database";
import IconFA5 from "react-native-vector-icons/FontAwesome5";
import IconFA6 from "react-native-vector-icons/FontAwesome6";
import { firebase_auth, firebase_db } from "../../firebase.config.js";
import CreateAndJoinButtons from "../../components/UserDashboard/CreateAndJoin";
import ProductionButton from "../../components/UserDashboard/ProductionButton";
import JoinProductionModal from "../../components/ProductionModals/JoinProductionModal";
import CreateProductionModal from "../../components/ProductionModals/CreateProductionModal";
import { ModalContext } from "../../components/Modal/ModalProvider.jsx";
import { AlertContext } from "../../components/Alert/AlertProvider";
import { useFocusEffect } from "@react-navigation/native";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import Title from "../../components/TextStyles/Title.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserDashboardScreen({ navigation }) {
    const [productions, setProductions] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = firebase_auth;
    const db = firebase_db;
    const { setModal } = useContext(ModalContext);
    const { setAlert } = useContext(AlertContext);

    const fetchProductions = async () => {
        setLoading(true);

        onValue(ref(db, `users/${auth.currentUser.uid}/productions`), async (userSnapshot) => {
            if (!userSnapshot.exists()) {
                setLoading(false);
                return;
            }

            const userData = userSnapshot.val();
            const localProductions = JSON.parse(await AsyncStorage.getItem("productions")) || {};
            
            let combinedProductions = { ...userData };
            Object.keys(userData).forEach((productionCode) => {
                if (localProductions[productionCode]) {
                    combinedProductions[productionCode] = localProductions[productionCode];
                }
            });

            let areAnyInvalid = false;
            const dbProductions = await Promise.all(
                Object.keys(userData).map(async (productionCode) => {
                    return get(child(ref(db), `productions/${productionCode}`))
                        .then((productionSnapshot) => {
                            if (!productionSnapshot.exists()) return null;
                            return productionSnapshot.val();
                        })
                        .catch(() => {
                            areAnyInvalid = true;
                        });
                })
            );

            if (areAnyInvalid) {
                setAlert(
                    "Error occurred when fetching productions.",
                    "bg-red-500",
                    icon({ name: "circle-exclamation" })
                );
            }
            
            const validProductions = dbProductions.filter((prod) => prod !== null);
            const sortedProductions = validProductions.sort((a, b) => {
                return combinedProductions[b.productionCode] - combinedProductions[a.productionCode];
            });
            setProductions(sortedProductions);
            setLoading(false);
        });
    };

    useFocusEffect(
        useCallback(() => {
            fetchProductions();
        }, [])
    );

    const productionButtonOnClick = async (production) => {
        navigation.navigate("ProductionDashboard", { productionCode: production.productionCode });
        const existingData = await AsyncStorage.getItem("productions");
        const newData = {
            ...JSON.parse(existingData),
            [production.productionCode]: Date.now(),
        };
        await AsyncStorage.setItem("productions", JSON.stringify(newData));
    };

    return (
        <View className="flex-col p-4 gap h-full z-10">
            <View className="flex-row justify-around mb-10">
                <CreateAndJoinButtons
                    title="Create"
                    onClick={() => {
                        setModal(<CreateProductionModal />);
                    }}
                >
                    <IconFA6 name="clapperboard" size={50} />
                </CreateAndJoinButtons>
                <CreateAndJoinButtons
                    title="Join"
                    onClick={() => {
                        setModal(<JoinProductionModal />);
                    }}
                >
                    <IconFA5 name="theater-masks" size={50} />
                </CreateAndJoinButtons>
            </View>
            <View className="border-b-2">
                <Title extraClassName="mb-4 text-center">Your Productions</Title>
            </View>
            <ScrollView className="flex-col flex-1">
                {loading ? (
                    <View className="my-6">
                        <ActivityIndicator size="large" color="#000000" />
                    </View>
                ) : productions.length === 0 ? (
                    <Text className="text-center text-2xl my-6 font-bold">
                        No productions yet...
                    </Text>
                ) : (
                    productions.map((production, index) => {
                        return (
                            <ProductionButton
                                navigation={navigation}
                                production={production}
                                key={index}
                                onPress={productionButtonOnClick}
                            />
                        );
                    })
                )}
            </ScrollView>
        </View>
    );
}
