import { useContext } from "react";
import { View, Text } from "react-native";
import { AlertContext } from "./AlertProvider";

export default function Alert() {
    const { text, color, icon } = useContext(AlertContext);

    if (text && color && icon) {
        return <View className="bg-blue-200 w-full h-28 absolute"></View>;
    } else {
        return <></>;
    }
}
