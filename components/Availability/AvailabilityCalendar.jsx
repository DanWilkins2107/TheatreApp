import { View, Text, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { useState, useRef, useCallback } from "react";
import DateCircles from "./DateCircles";
import Icon from "react-native-vector-icons/FontAwesome5";

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

const getWeekStartDate = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(date.setDate(diff));
};

const dateString = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export default function AvailabilityCalendar({ availabilityInfo, setAvailabilityInfo }) {
    const [date, setDate] = useState(new Date());
    const scrollRef = useRef(null);

    const findColour = (colour) => {
        if (colour != "none") {
            return "bg-" + colour + "-400";
        } else return "bg-white";
    };

    const handleOnPress = useCallback(
        (hour, daysToChange) => {
            const correctDate = editDate(date, daysToChange);
            const dayData = splitDate(correctDate);
            const value = checkAvailability(hour, correctDate);

            newInfo = { ...availabilityInfo };

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
        },
        [date, availabilityInfo]
    );

    const checkAvailability = useCallback(
        (hour, date) => {
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
        },
        [availabilityInfo]
    );

    // Work out date line
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();

    const heightNeeded = Math.floor(80 * currentHour + (currentMinute / 60) * 80) - 2;
    const thirtySixesNeeded = Math.floor(heightNeeded / (36 * 4));
    const remainder = heightNeeded % (36 * 4);

    const fivesNeeded = Math.floor(remainder / (5 * 4));
    const remainder2 = remainder % (5 * 4);

    const onesNeeded = Math.floor(remainder2 / 4);
    const remainder3 = remainder2 % 4;

    console.log(remainder3);

    return (
        <View className="flex-1">
            <View className="flex-row items-center justify-around">
                <TouchableOpacity
                    className="w-10 h-10 justify-center items-center"
                    onPress={() => {
                        setDate(editDate(date, -7));
                    }}
                >
                    <Icon name="arrow-circle-left" size={25} />
                </TouchableOpacity>
                <Text className="flex-1 text-center font-semibold text-xl">
                    {dateString(getWeekStartDate(date))} -{" "}
                    {dateString(editDate(getWeekStartDate(date), 6))}
                </Text>
                <TouchableOpacity
                    className="w-10 h-10 justify-center items-center"
                    onPress={() => {
                        setDate(editDate(date, 7));
                    }}
                >
                    <Icon name="arrow-circle-right" size={25} />
                </TouchableOpacity>
            </View>

            <View className="flex-row w-full h-14 justify-around ">
                <View className="w-16 border-r border-l border-t bg-slate-100" />
                <View className="flex-row flex-1 border-t border-r bg-slate-100">
                    {[...Array(7).keys()].map((day) => {
                        const newDate = editDate(getWeekStartDate(date), day);
                        return (
                            <View
                                className={`justify-center items-center ${
                                    day != 0 && "border-l"
                                } flex-1`}
                                key={day}
                            >
                                <DateCircles
                                    number={splitDate(newDate)[2]}
                                    letter={["M", "T", "W", "T", "F", "S", "S"][day]}
                                />
                            </View>
                        );
                    })}
                </View>
            </View>
            <ScrollView
                ref={scrollRef}
                className="flex-1"
                bounces={false}
                onLayout={() => {
                    const amountToScroll = 4 * currentHour * 20 - 90; // 4 is for unit conversion, 90 so it's not at the very top
                    if (amountToScroll > 0) {
                        scrollRef.current.scrollTo({ x: 0, y: amountToScroll, animated: false });
                    }
                }}
            >
                <View className="flex-row flex">
                    <View className="w-16 bg-slate-100 border-l border-t border-r">
                        {[...Array(24).keys()].map((hour) => {
                            return (
                                <View className={`h-20 ${hour != 0 && "border-t"}`} key={hour}>
                                    <Text className="font-semibold">{`${hour}:00`}</Text>
                                </View>
                            );
                        })}
                    </View>
                    <View className="flex-1 flex-row border-t border-r">
                        {[...Array(7).keys()].map((day) => {
                            const newDate = editDate(getWeekStartDate(date), day);
                            return (
                                <View className="flex-col flex-1" key={day}>
                                    {[...Array(48).keys()].map((hour) => {
                                        return (
                                            <Pressable
                                                key={hour}
                                                className={`h-10 ${hour != 0 && "border-t"} ${
                                                    day != 0 && "border-l"
                                                } flex-1 ${findColour(
                                                    checkAvailability(hour, newDate)
                                                )} `}
                                                onPress={() => {
                                                    handleOnPress(hour, day);
                                                }}
                                            >
                                                <Text className="text-center font-semibold">
                                                    {checkAvailability(hour, newDate) ===
                                                    "green" ? (
                                                        <Icon name="check" size={10} />
                                                    ) : checkAvailability(hour, newDate) ===
                                                      "red" ? (
                                                        <Icon name="times" size={10} />
                                                    ) : (
                                                        ""
                                                    )}
                                                </Text>
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            );
                        })}
                    </View>
                </View>
                <View className="absolute w-full bg-orange-300">
                    {/* Working Out Date Line */}
                    <View className="h-[1]" pointerEvents="none"/>
                    {[...Array(thirtySixesNeeded).keys()].map((i) => {
                        return <View className="h-36" key={i} pointerEvents="none"/>;
                    })}
                    {[...Array(fivesNeeded).keys()].map((i) => {
                        return <View className="h-5" key={i} pointerEvents="none"/>;
                    })}
                    {[...Array(onesNeeded).keys()].map((i) => {
                        return <View className="h-1" key={i} pointerEvents="none"/>;
                    })}
                    <View style={{height: remainder3}} className="" pointerEvents="none"/>
                    <View className="h-[2] bg-red-500"/>
                    
                </View>
            </ScrollView>
        </View>
    );
}
