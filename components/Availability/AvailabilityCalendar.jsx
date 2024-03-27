import { View, Text, ScrollView, TouchableOpacity } from "react-native";

const splitDate = (date) => {
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    return [year, month, day];
};

const editDate = (oldDate, daysToChange) => {
    newDate = new Date(oldDate);
    newDate.setTime(newDate.getTime() + daysToChange * 24 * 60 * 60 * 1000);
    return newDate;
};

const findColour = (colour) => {
    if (colour != "none") {
        return "bg-" + colour + "-400";
    } else return "bg-white";
};

export default function AvailabilityCalendar({ availabilityInfo, setAvailabilityInfo, date }) {
    const handleOnPress = (hour, daysToChange) => {
        const correctDate = editDate(date, daysToChange);
        const dayData = splitDate(correctDate);
        const value = checkAvailability(hour, correctDate);

        newInfo = { ...availabilityInfo };

        if (value === "none") {
            if (newInfo[dayData[0]] === undefined) {
                newInfo[dayData[0]] = {};
            }
            if (newInfo[dayData[0]][dayData[1]] === undefined) {
                newInfo[dayData[0][dayData[1]]] = {};
            }
            if (newInfo[dayData[0]][dayData[1]][dayData[2]] === undefined) {
                newInfo[dayData[0]][dayData[1]][dayData[2]] = {};
            }
            newInfo[dayData[0]][dayData[1]][dayData[2]][hour] = "green";
        }
        if (value === "green") {
            newInfo[dayData[0]][dayData[1]][dayData[2]][hour] = "red";
        }
        if (value === "red") {
            newInfo[dayData[0]][dayData[1]][dayData[2]][hour] = "none";
        }
        setAvailabilityInfo(() => newInfo);
    };

    const checkAvailability = (hour, date) => {
        const dayInfo = splitDate(date);
        const year = dayInfo[0];
        const month = dayInfo[1];
        const day = dayInfo[2];
        if (
            availabilityInfo[year] &&
            availabilityInfo[year][month] &&
            availabilityInfo[year][month][day] &&
            availabilityInfo[year][month][day][hour]
        ) {
            return availabilityInfo[year][month][day][hour];
        }
        return "none";
    };
    return (
        <>
            <View className="w-full flex flex-row justify-around">
                <Text>Time</Text>
                <Text>PrevDay</Text>
                <Text>Date</Text>
                <Text>NextDay</Text>
            </View>
            <ScrollView className="w-full mb-32">
                <View className="w-full flex flex-row border-b">
                    <View className="flex-[0.75]">
                        <View className="flex flex-col">
                            {[...Array(24).keys()].map((hour) => {
                                return (
                                    <View className="h-20 border-t w-full border-l p-1">
                                        <Text key={hour}>{`${hour}:00`}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                    <View className="flex-[0.75]">
                        <View className="flex flex-col">
                            {[...Array(48).keys()].map((hour) => {
                                return (
                                    <TouchableOpacity
                                        className={`h-10 border-t border-l ${findColour(
                                            checkAvailability(hour / 2, editDate(date, -1))
                                        )}`}
                                        onPress={() => {
                                            handleOnPress(hour / 2, -1);
                                        }}
                                    />
                                );
                            })}
                        </View>
                    </View>
                    <View className="flex-1">
                        <View className="flex flex-col">
                            {[...Array(48).keys()].map((hour) => {
                                return (
                                    <TouchableOpacity
                                        className={`h-10 border-t border-l ${findColour(
                                            checkAvailability(hour / 2, editDate(date, 0))
                                        )}`}
                                        onPress={() => {
                                            handleOnPress(hour / 2, 0);
                                        }}
                                    />
                                );
                            })}
                        </View>
                    </View>
                    <View className="border-x flex-[0.75]">
                        <View className="flex flex-col">
                            {[...Array(48).keys()].map((hour) => {
                                return (
                                    <TouchableOpacity
                                        className={`h-10 border-t ${findColour(
                                            checkAvailability(hour / 2, editDate(date, 1))
                                        )}`}
                                        onPress={() => {
                                            handleOnPress(hour / 2, 1);
                                        }}
                                    />
                                );
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
