import { View, Text, ScrollView, TouchableOpacity } from "react-native";

export default function AvalilabilityCalendar({greenTimes, redTimes, setGreenTimes, SetRedTimes, date}) {
    
    return (
        <>
            <View className="w-full flex flex-row justify-around">
                <Text>Time</Text>
                <Text>PrevDay</Text>
                <Text>Date</Text>
                <Text>NextDay</Text>
            </View>
            <ScrollView className="w-full mb-32">
                <View className="w-full flex flex-row">
                    <View className="flex-[0.75]">
                        <View className="flex flex-col">
                            {[...Array(24).keys()].map((hour) => {
                                return (
                                    <View className="h-20 border-t w-full">
                                        <Text key={hour}>{`${hour}:00`}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                    <View className="bg-green-200 flex-[0.75]">
                        <View className="flex flex-col">
                            {[...Array(48).keys()].map(() => {
                                return (
                                    <TouchableOpacity className="h-10 border-t">
                
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                    <View className="bg-orange-200 flex-1">
                        <View className="flex flex-col">
                            {[...Array(48).keys()].map(() => {
                                return (
                                    <TouchableOpacity className="h-10 border-t">
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                    <View className="bg-green-700 flex-[0.75]">
                        <View className="flex flex-col">
                            {[...Array(48).keys()].map(() => {
                                return (
                                    <TouchableOpacity className="h-10 border-t">
                
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
