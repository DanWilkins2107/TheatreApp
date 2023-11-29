import { Modal, View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { onValue, get, ref, child, set } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClapperboard, faMasksTheater } from "@fortawesome/free-solid-svg-icons";
import { firebase_auth, firebase_db } from "../../firebase.config.js";
import CreateAndJoinButtons from "../../components/UserDashboard/CreateAndJoin";
import ProductionButton from "../../components/UserDashboard/ProductionButton";
import JoinProductionModal from "../../components/ProductionModals/JoinProductionModal";
import CreateProductionModal from "../../components/ProductionModals/CreateProductionModal";

//TODO:
// - order participants by last action/ time joined

export default function UserDashboardScreen({ navigation }) {
    const [modal, setModal] = useState(null);
    const [createName, setCreateName] = useState("");
    const [joinCode, setJoinCode] = useState("");
    const [productions, setProductions] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = firebase_auth;
    const db = firebase_db;

    useEffect(() => {
        setLoading(true);
        onValue(ref(db, `users/${auth.currentUser.uid}/productions`), async (userSnapshot) => {
            if (!userSnapshot.exists()) {
                setLoading(false);
                return;
            }

            const userData = userSnapshot.val();

            const newProds = await Promise.all(
                Object.keys(userData).map(async (productionCode) => {
                    return get(child(ref(db), `productions/${productionCode}`))
                        .then((playSnapshot) => {
                            if (!playSnapshot.exists()) return;
                            const playData = playSnapshot.val();
                            return { ...playData, playCode: playSnapshot.key };
                        })
                        .catch((error) => {
                            console.log("uh oh: ", error.message);
                        });
                })
            );

            setProductions(
                newProds.sort(
                    (a, b) =>
                        b.participants[auth.currentUser.uid] - a.participants[auth.currentUser.uid]
                )
            );

            setLoading(false);
        });
    }, []);

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modal === "Join"}
                onRequestClose={() => {
                    setModal(null);
                }}
            >
                <JoinProductionModal
                    closeModal={() => setModal(null)}
                    code={joinCode}
                    setCode={setJoinCode}
                />
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modal === "Create"}
                onRequestClose={() => {
                    setModal(null);
                }}
            >
                <CreateProductionModal
                    closeModal={() => setModal(null)}
                    name={createName}
                    setName={setCreateName}
                />
            </Modal>
            <View className="flex-col p-4 gap h-[95%] z-10">
                <View className="flex-row justify-around mb-10">
                    <CreateAndJoinButtons
                        title="Create"
                        onClick={() => {
                            setModal("Create");
                        }}
                    >
                        <FontAwesomeIcon icon={faClapperboard} size={50} />
                    </CreateAndJoinButtons>
                    <CreateAndJoinButtons
                        title="Join"
                        onClick={() => {
                            setModal("Join");
                        }}
                    >
                        <FontAwesomeIcon icon={faMasksTheater} size={50} />
                    </CreateAndJoinButtons>
                </View>
                <View className="border-b-2">
                    <Text className="text-3xl font-extrabold text-center mb-5">
                        Your Productions
                    </Text>
                </View>
                <ScrollView className="flex-col space-y-12 grow">
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
                            return <ProductionButton production={production} key={index} />;
                        })
                    )}
                </ScrollView>
            </View>
        </>
    );
}
