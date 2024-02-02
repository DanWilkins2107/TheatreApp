import Checkbox from "./Checkbox";
import { ScrollView, View, Text } from "react-native";

export default function ParticipantSelector({participants, setParticipants}) {
    return (
        <>
            <ScrollView className="h-64 bg-blue-400">
                {Object.keys(participants).map((participant) => {
                    return (
                        <View className="h-10 bg-blue-200 border-2 w-full flex-row space-between">
                            <Text>{participant}</Text>
                            <Checkbox checked={participants[participant]} setChecked={() => setParticipants(
                                {
                                    ...participants,
                                    [participant]: !participants[participant]
                                }
                            )}/>
                        </View>
                    );
                })}
            </ScrollView>

        </>
        
    )
}