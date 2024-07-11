import { TouchableOpacity, Text, View, Image } from "react-native";
import { useState } from "react";
import Subtitle from "../TextStyles/Subtitle";
import Icon from "react-native-vector-icons/FontAwesome";
import ProfilePicture from "../ProfileElements/ProfilePicture";
import ImageViewer from "./ImageViewer";

export default function ExpenseSummary({ expense, isUser }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const timeString = new Date(expense.time).toLocaleString();
    return (
        <View className="py-1">
            <TouchableOpacity
                className={`justify-between w-full ${
                    expense.placeholder ? "bg-slate-50" : "bg-slate-200"
                } rounded-lg p-2 border-2`}
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <View className="flex-row justify-between">
                    <View className="flex-row items-center flex-1">
                        <ProfilePicture
                            userId={expense.user}
                            dimensions={10}
                            textSize="2xl"
                            loadingSize="small"
                        />
                        <View className="ml-2 flex-1">
                            <Subtitle
                                extraClassName={expense.placeholder && "text-gray-600"}
                                oneLine
                            >
                                {expense.reference}
                            </Subtitle>
                        </View>
                    </View>
                    <View className="flex-row items-center ml-2">
                        <Subtitle extraClassName={expense.placeholder && "text-gray-600"}>
                            £{expense.cost}
                        </Subtitle>
                        <View className="ml-2 w-6 justify-center items-center">
                            <Icon
                                name={isDropdownOpen ? "caret-down" : "caret-right"}
                                size={30}
                                color={expense.placeholder ? "#757575" : "black"}
                            />
                        </View>
                    </View>
                </View>
                {isDropdownOpen && (
                    <>
                        {isUser && (
                            <TouchableOpacity
                                className={`w-full h-10 rounded-md border-2 mt-4 justify-center items-center flex-row bg-slate-100`}
                                onPress={() => {
                                    alert("Implement editing expense");
                                }}
                            >
                                <Subtitle extraClassName="mr-4">Edit Expense</Subtitle>
                                <Icon name="pencil" size={30} color="black" />
                            </TouchableOpacity>
                        )}
                        <View className="justify-between mt-2 flex-row">
                            <View className="flex-1">
                                <Text className="font-semibold text-base">Reference:</Text>
                                <Text>{expense.reference}</Text>
                                <Text className="font-semibold text-base mt-2">Description:</Text>
                                <Text>{expense.description}</Text>
                                <Text className="font-semibold text-base mt-2">Submitted:</Text>
                                <Text>{timeString}</Text>
                            </View>
                            {expense.receipt && (
                                <View className="flex-1 justify-center items-center">
                                    <Text className="font-semibold text-base text-center mb-2">
                                        Receipt:
                                    </Text>
                                    <View className="w-40 h-40">
                                        <ImageViewer URL={expense.receipt} centered />
                                    </View>
                                </View>
                            )}
                        </View>
                    </>
                )}
            </TouchableOpacity>
        </View>
    );
}
