import { View, Text, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { useState, useRef, useCallback } from "react";
import DateCircles from "./DateCircles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

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

const findColour = (colour) => {
    if (colour != "none") {
        return "bg-" + colour + "-400";
    } else return "bg-white";
};

const dateString = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export default function AvailabilityCalendar({ availabilityInfo, setAvailabilityInfo }) {
    const [date, setDate] = useState(new Date());
    const dateBarRef = useRef(null);
    const timeBarRef = useRef(null);
    const mainAreaRefHorizontal = useRef(null);
    const mainAreaRefVertical = useRef(null);

    const handleDateScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        mainAreaRefHorizontal.current.scrollTo({ x: offsetX, animated: false });
    };

    const handleTimeScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        mainAreaRefVertical.current.scrollTo({ y: offsetY, animated: false });
    };

    const handleHorizontalMainScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        dateBarRef.current.scrollTo({ x: offsetX, animated: false });
    };

    const handleVerticalMainScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        timeBarRef.current.scrollTo({ y: offsetY, animated: false });
    };

    const handleOnPress = useCallback((hour, daysToChange) => {
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
    }, [date, availabilityInfo]);

    const checkAvailability = useCallback((hour, date) => {
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
    }, [availabilityInfo]);

    return (
        <View className="flex-1">
            <View className="flex-row items-center justify-around">
                <TouchableOpacity
                    className="w-10 h-10 justify-center items-center"
                    onPress={() => {
                        setDate(editDate(date, -7));
                    }}
                >
                    <FontAwesomeIcon icon={faCircleChevronLeft} size={25}/>
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
                    <FontAwesomeIcon icon={faCircleChevronRight} size={25}/>
                </TouchableOpacity>
            </View>
            <View className="flex-1 border-r">
                <ScrollView
                    ref={dateBarRef}
                    horizontal
                    onScroll={handleDateScroll}
                    scrollEventThrottle={16}
                    bounces={false}
                    className="absolute top-0 h-14 z-10 left-[63] right-0 border-l bg-slate-100 border-y"
                >
                    <View className="flex-row h-14">
                        {[...Array(7).keys()].map((day) => {
                            const newDate = editDate(getWeekStartDate(date), day);
                            return (
                                <View className="h-14 w-16 justify-center items-center" key={day}>
                                    <DateCircles number={splitDate(newDate)[2]} />
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
                <ScrollView
                    ref={timeBarRef}
                    vertical
                    onScroll={handleTimeScroll}
                    scrollEventThrottle={16}
                    bounces={false}
                    className="absolute top-[55] left-0 bottom-0 w-16 bg-slate-100 z-10 border-x border-t"
                >
                    <View className="flex-col">
                        {[...Array(24).keys()].map((hour) => {
                            return (
                                <View className={`h-20 ${hour != 0 && "border-t"}`} key={hour}>
                                    <Text className="font-semibold">{`${hour}:00`}</Text>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
                <ScrollView
                    ref={mainAreaRefHorizontal}
                    horizontal
                    onScroll={handleHorizontalMainScroll}
                    scrollEventThrottle={16}
                    className="flex-1 bg-blue-500 z-0 absolute top-14 left-16 right-0 bottom-0 "
                    bounces={false}
                    contentContainerStyle="flex-row"
                >
                    <ScrollView
                        ref={mainAreaRefVertical}
                        onScroll={handleVerticalMainScroll}
                        scrollEventThrottle={16}
                        bounces={false}
                    >
                        <View className="flex-row flex">
                            {[...Array(7).keys()].map((day) => {
                                const newDate = editDate(getWeekStartDate(date), day);
                                return (
                                    <View className="flex-col" key={day}>
                                        {[...Array(48).keys()].map((hour) => {
                                            return (
                                                <Pressable
                                                    key={hour}
                                                    className={`h-10 ${hour != 0 && "border-t"} ${
                                                        day != 0 && "border-l"
                                                    } w-16 ${findColour(
                                                        checkAvailability(hour, newDate)
                                                    )}`}
                                                    onPress={() => {
                                                        handleOnPress(hour, day);
                                                    }}
                                                />
                                            );
                                        })}
                                    </View>
                                );
                            })}
                        </View>
                    </ScrollView>
                </ScrollView>
            </View>
        </View>
    );
}
