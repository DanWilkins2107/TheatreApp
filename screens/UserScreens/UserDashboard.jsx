import { View, Text, ScrollView } from "react-native";
import CreateAndJoinButtons from "../../components/UserDashboard/CreateAndJoin";
import ProductionButton from "../../components/UserDashboard/ProductionButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClapperboard, faMasksTheater} from "@fortawesome/free-solid-svg-icons";
import { mockProductions } from "../../MockData/MockProductions";

export default function UserDashboardScreen({ navigation }) {
    return (
        <View className="flex-col p-4 gap h-[95%]">
            <View className="flex-row justify-around mb-10">
                <CreateAndJoinButtons title="Create">
                    <FontAwesomeIcon icon={faClapperboard} size={50} />
                </CreateAndJoinButtons>
                <CreateAndJoinButtons title="Join">
                    <FontAwesomeIcon icon={faMasksTheater} size={50} />
                </CreateAndJoinButtons>
            </View>
            <View className="border-b-2">
                <Text className="text-3xl font-extrabold text-center mb-5">Your Productions</Text>
            </View>
            <ScrollView className="flex-col space-y-12 grow">
                {mockProductions.map((production) => {
                    return <ProductionButton production={production} key={production.name}/>})}
            </ScrollView>
        </View>
    );
}
