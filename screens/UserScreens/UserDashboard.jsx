import { View, Text, ScrollView } from "react-native";
import CreateAndJoinButtons from "../../components/UserDashboard/CreateAndJoin";
import ProductionButton from "../../components/UserDashboard/ProductionButton";

let mockProduction = {
    name: "Mock Production",
    members: 6,
};

export default function UserDashboardScreen({ navigation }) {
    return (
        <View className="flex-col p-4 gap h-[95%]">
            <View className="flex-row justify-around mb-10">
                <CreateAndJoinButtons title="Create" />
                <CreateAndJoinButtons title="Join" />
            </View>
            <Text className="text-2xl font-bold text-center mb-5">Your Productions</Text>
            <ScrollView className="flex-col border-t-2 space-y-12 p-1 grow">
                <ProductionButton {...mockProduction} />
                <ProductionButton {...mockProduction} />
                <ProductionButton {...mockProduction} />
                <ProductionButton {...mockProduction} />
                <ProductionButton {...mockProduction} />
                <ProductionButton {...mockProduction} />
                <ProductionButton {...mockProduction} />
            </ScrollView>
        </View>
    );
}
