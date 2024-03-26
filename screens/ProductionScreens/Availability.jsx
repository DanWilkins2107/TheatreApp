import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import AvalilabilityCalendar from "../../components/Availability/AvalilabilityCalendar";

export default function Availability() {
    const [date, setDate] = useState(new Date());
    const [isEditingDate, setIsEditingDate] = useState(false);
    const [greenTimes, setGreenTimes] = useState({});
    const [redTimes, setRedTimes] = useState({});
    return (
        <View className="flex items-center p-2">
            <Text>Set Availability</Text>
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
            <AvalilabilityCalendar />
        </View>
    );
}
