import { Modal, View, Text, ScrollView } from "react-native";
import CreateAndJoinButtons from "../../components/UserDashboard/CreateAndJoin";
import ProductionButton from "../../components/UserDashboard/ProductionButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClapperboard, faMasksTheater } from "@fortawesome/free-solid-svg-icons";
import { mockProductions } from "../../MockData/MockProductions";
import { useState } from "react";
import JoinProductionModal from "../../components/ProductionModals/JoinProductionModal";
import CreateProductionModal from "../../components/ProductionModals/CreateProductionModal";

export default function UserDashboardScreen({ navigation }) {
    let [modal, setModal] = useState(null);
    let [createName, setCreateName] = useState("");
    let [joinCode, setJoinCode] = useState("");

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
                <JoinProductionModal closeModal={() => setModal(null)} code={joinCode} setCode={setJoinCode}/>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modal === "Create"}
                onRequestClose={() => {
                    setModal(null);
                }}
            >
                <CreateProductionModal closeModal={() => setModal(null)} name={createName} setName={setCreateName}/>
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
                    {mockProductions.map((production) => {
                        return <ProductionButton production={production} key={production.name} />;
                    })}
                </ScrollView>
            </View>
        </>
    );
}
