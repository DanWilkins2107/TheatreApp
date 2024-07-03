import { View, Text, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { useState, useRef, useCallback } from "react";
import DateCircles from "./DateCircles";
import Icon from "react-native-vector-icons/FontAwesome5";
import { set } from "firebase/database";

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

const hasTimePassed = (date, day, hour) => {
    const current = new Date();
    let copyDate = new Date(date);
    let newDate = editDate(getWeekStartDate(copyDate), day);
    newDate.setHours(hour / 2);
    newDate.setMinutes((hour % 2) * 30 + 30);
    return newDate < current;
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

    const heightNeeded = Math.floor(80 * currentHour + (currentMinute / 60) * 80) + 1; // 80 is the height of each hour, 1 is for the border
    let dateOffset = 8;

    if (heightNeeded < 8) {
        dateOffset = heightNeeded;
    }

    if (heightNeeded > 80 * 24 - 8) {
        console.log("heightNeeded", heightNeeded);
        dateOffset = heightNeeded - 1912 + 8;
    }

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

            <View className="flex-row w-full h-14 justify-around border-b ">
                <View className="w-16 border-r" />
                <View className="flex-row flex-1 border-t border-r bg-slate-100">
                    {[...Array(7).keys()].map((day) => {
                        const newDate = editDate(getWeekStartDate(date), day);
                        return (
                            <View className={`justify-center items-center flex-1`} key={day}>
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
                    <View className="w-16 bg-slate-100 border-l border-r">
                        {[...Array(24).keys()].map((hour) => {
                            return (
                                <View className={`h-20 ${hour != 0 && "border-t"}`} key={hour}>
                                    <Text className="font-semibold">{`${hour}:00`}</Text>
                                </View>
                            );
                        })}
                    </View>
                    <View className="flex-1 flex-row border-r">
                        {[...Array(7).keys()].map((day) => {
                            const newDate = editDate(getWeekStartDate(date), day);
                            return (
                                <View className="flex-col flex-1" key={day}>
                                    {[...Array(48).keys()].map((hour) => {
                                        const availability = checkAvailability(hour, newDate);
                                        const timePassed = hasTimePassed(newDate, day, hour);
                                        return (
                                            <Pressable
                                                key={hour}
                                                className={`h-10 justify-center items-center ${
                                                    hour != 0 && "border-t"
                                                } ${day != 0 && "border-l"} flex-1 ${findColour(
                                                    availability
                                                )} ${timePassed && "opacity-20"} `}
                                                onPress={() => {
                                                    if (!timePassed) {
                                                        handleOnPress(hour, day);
                                                    }
                                                }}
                                            >
                                                {availability === "green" && (
                                                    <Icon name="check" size={15} />
                                                )}
                                                {availability === "red" && (
                                                    <Icon name="times" size={15} />
                                                )}
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            );
                        })}
                    </View>
                </View>
                {/* Any Thoughts on whether we want this line when the week is not current? */}
                <View className="absolute w-full" pointerEvents="none">
                    <View className="h-[1]" />
                    <View style={{ height: heightNeeded - dateOffset }} className="" />
                    <View className="h-4 w-full flex-row">
                        <View className="w-16">
                            <View style={{ height: dateOffset - 2 }} />
                            <View className="h-1 bg-red-600" />
                        </View>
                        <View className="h-full px-1 text-center justify-center">
                            <Text className="text-center text-red-600 font-semibold">{`${
                                String(currentHour).length === 1 ? "0" : ""
                            }${currentHour}:${
                                String(currentMinute).length === 1 ? "0" : ""
                            }${currentMinute}`}</Text>
                        </View>
                        <View className="flex-1">
                            <View style={{ height: dateOffset - 2 }} />
                            <View className="h-1 bg-red-600" />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
