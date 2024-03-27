import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import AvailabilityCalendar from "../../components/Availability/AvailabilityCalendar";
import SmallFormButton from "../../components/Form/SmallFormButton";

export default function Availability() {
    const [date, setDate] = useState(new Date());
    const [isEditingDate, setIsEditingDate] = useState(false);
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
            <View className="flex flex-row justify-between p-2 items-center">
                <Text>{String(date)}</Text>
                <TouchableOpacity
                    onPress={() => setIsEditingDate(true)}
                    className="w-16 h-16 bg-blue-200 rounded-full items-center justify-around"
                >
                    <FontAwesomeIcon icon={faPenToSquare} size={25} />
                </TouchableOpacity>
            </View>
            {isEditingDate && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    onChange={(event, selectedDate) => {setDate(selectedDate); setIsEditingDate(false);}}
                />
            )}
            <View className="w-full h-5/6 border-b">
                <AvailabilityCalendar date={date} availabilityInfo={availabilityInfo} setAvailabilityInfo={setAvailabilityInfo}/>
            </View>
            <View className="flex flex-row justify-around w-full">
                <SmallFormButton title="Submit" backgroundColor="bg-green-400" />
                <SmallFormButton title="Reset" backgroundColor="bg-white" />
            </View>
        </View>
    );
}
