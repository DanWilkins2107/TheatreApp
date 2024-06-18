import { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AlertContext } from "./AlertProvider";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Alert() {
    const { text, color, name, resetAlert } = useContext(AlertContext);

    if (text !== "") {
        return (
            <View className={`${color} self-center w-5/6 h-20 mt-10 border-2 flex flex-row items-center p-2 rounded-md`}>
                <Icon name={name} size={30} className="ml-2" />
                <Text className="flex-1 text-center self-center ml-2">{text}</Text>
                <TouchableOpacity onPress={resetAlert}>
                    <Icon name="times" size={30} className="mr-2" />
                </TouchableOpacity>
            </View>
        );
    
    } else {
        return <></>;
    }
}
