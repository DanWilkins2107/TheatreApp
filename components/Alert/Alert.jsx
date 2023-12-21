import { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AlertContext } from "./AlertProvider";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Alert() {
    const { text, color, icon, resetAlert } = useContext(AlertContext);

    if (text !== "") {
        return (
            <View className={`${color} self-center w-5/6 h-20 mt-10 border-2 flex flex-row items-center p-2 rounded-md`}>
                <FontAwesomeIcon icon={icon} size={30} className="ml-2" />
                <Text className="flex-1 text-center self-center ml-2">{text}</Text>
                <TouchableOpacity onPress={resetAlert}>
                    <FontAwesomeIcon icon={faTimes} size={30} className="mr-2" />
                </TouchableOpacity>
            </View>
        );
    
    } else {
        return <></>;
    }
}
