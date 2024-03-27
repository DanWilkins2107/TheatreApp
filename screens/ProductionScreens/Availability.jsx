import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import AvailabilityCalendar from "../../components/Availability/AvailabilityCalendar";
import SmallFormButton from "../../components/Form/SmallFormButton";

export default function Availability() {
    const [availabilityInfo, setAvailabilityInfo] = useState({})

    useEffect(() => {
        const exampleAvailabilityInfo = {
            2024: {
                3: {
                    26: {
                        0: "green",
                        0.5: "green",
                        1: "green",
                        1.5: "green",
                        2: "red",
                        4: "red",
                        5: "red",
                        7: "red",
                    }
                },
                4: {
                    21: {
                        0: "green",
                        0.5: "green",
                    }
                }
            }
        }
        setAvailabilityInfo(exampleAvailabilityInfo)
    }, []);

    return (
        <View className="flex items-center p-2">
            <Text className="text-3xl font-extrabold">Set Availability</Text>
            <View className="w-full h-5/6 border-b mb-8">
                <AvailabilityCalendar availabilityInfo={availabilityInfo} setAvailabilityInfo={setAvailabilityInfo}/>
            </View>
            <View className="flex flex-row justify-around w-full">
                <SmallFormButton title="Submit" backgroundColor="bg-green-400" />
                <SmallFormButton title="Reset" backgroundColor="bg-white" />
            </View>
        </View>
    );
}
