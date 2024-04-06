import { View, Text, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateCircles from "./DateCircles";

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

export default function AvailabilityCalendar({ availabilityInfo, setAvailabilityInfo }) {
    const [date, setDate] = useState(new Date());
    const handleOnPress = (hour, daysToChange) => {
        const correctDate = editDate(date, daysToChange);
        const dayData = splitDate(correctDate);
        const value = checkAvailability(hour, correctDate);

        newInfo = { ...availabilityInfo };

        // Fix this, is not working for some reason
        if (value === "none") {
            if (newInfo[dayData[0]] === undefined) {
                newInfo = { ...newInfo, [dayData[0]]: {} };
            }
            if (newInfo[dayData[0]][dayData[1]] === undefined) {
                newInfo[dayData[0]] = { ...newInfo[dayData[0]], [dayData[1]]: {} };
            }
            if (newInfo[dayData[0]][dayData[1]][dayData[2]] === undefined) {
                newInfo[dayData[0]][dayData[1]] = {
                    ...newInfo[dayData[0]][dayData[1]],
                    [dayData[2]]: {},
                };
            }
            newInfo[dayData[0]][dayData[1]][dayData[2]][hour] = "green";
        }
        if (value === "green") {
            newInfo[dayData[0]][dayData[1]][dayData[2]][hour] = "red";
        }
        if (value === "red") {
            newInfo[dayData[0]][dayData[1]][dayData[2]][hour] = "none";
        }
        setAvailabilityInfo(newInfo);
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
        <View className="h-full">
            <View className="h-20 flex-row justify-center items-center">
                <Text className="font-semibold text-lg">Choose Date:</Text>
                <DateTimePicker
                    value={date}
                    mode="date"
                    onChange={(_event, selectedDate) => {
                        setDate(selectedDate);
                    }}
                />
            </View>
            <View className="w-full flex flex-row justify-around">
                <View className="flex-[0.75]" />
                <View className="flex-[0.75] items-center justify-center">
                    <DateCircles number={splitDate(editDate(date, -1))[2]} onPress={() => {setDate(editDate(date, -1))}}/>
                </View>
                <View className="flex-1 items-center">
                    <DateCircles number={splitDate(editDate(date, 0))[2]} />
                </View>
                <View className="flex-[0.75] items-center">
                    <DateCircles number={splitDate(editDate(date, 1))[2]} onPress={() => {setDate(editDate(date, 1))}}/>
                </View>
            </View>
            <ScrollView className="w-full pb-8">
                <View className="w-full flex flex-row">
                    <View className="flex-[0.75]">
                        <View className="flex flex-col">
                            {[...Array(24).keys()].map((hour) => {
                                return (
                                    <View className="h-20 border-t bg-blue-100 w-full border-l p-1" key={hour}>
                                        <Text key={String(hour) + "text"}>{`${hour}:00`}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                    <View className="flex-[0.75]">
                        <View className="flex flex-col">
                            {[...Array(48).keys()].map((hour) => {
                                return (
                                    <Pressable
                                        key={hour}
                                        className={`h-10 border-t border-l ${findColour(
                                            checkAvailability(hour, editDate(date, -1))
                                        )}`}
                                        onPress={() => {
                                            handleOnPress(hour, -1);
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
                                    <Pressable
                                        key={hour}
                                        className={`h-10 border-t border-l ${findColour(
                                            checkAvailability(hour, editDate(date, 0))
                                        )}`}
                                        onPress={() => {
                                            handleOnPress(hour, 0);
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
                                    <Pressable
                                        key={hour}
                                        className={`h-10 border-t ${findColour(
                                            checkAvailability(hour, editDate(date, 1))
                                        )}`}
                                        onPress={() => {
                                            handleOnPress(hour, 1);
                                        }}
                                    />
                                );
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
