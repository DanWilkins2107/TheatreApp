import { useContext } from "react";
import { View } from "react-native";
import { AlertContext } from "./AlertProvider";

export default function Alert() {
    const { text, color, icon } = useContext(AlertContext);

    if (true) {
        return <View className="bg-blue-200 w-full h-28"></View>;
    } else {
        return <></>;
    }
}
