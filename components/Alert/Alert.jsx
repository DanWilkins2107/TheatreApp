import { useContext } from "react";
import { View, Text } from "react-native";
import { AlertContext } from "./AlertProvider";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function Alert() {
    const { text, color, icon } = useContext(AlertContext);

    if (text !== "") {
        return (
            <View className={`${color} self-center w-5/6 h-20 mt-10 border-2 flex flex-row items-center p-2 rounded-md`}>
                <FontAwesomeIcon icon={icon} size={30} className="ml-2" />
                <Text className="flex-1 text-center self-center ml-2">{text}</Text>
            </View>
        );
    
    } else {
        return <></>;
    }
}
