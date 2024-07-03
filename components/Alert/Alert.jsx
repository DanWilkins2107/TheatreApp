import { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AlertContext } from "./AlertProvider";
import IconFA5 from "react-native-vector-icons/FontAwesome";

export default function Alert() {
    const { text, color, name, resetAlert } = useContext(AlertContext);

    if (name !== "") {
        return (
            <View className={`${color} self-center w-5/6 h-20 mt-10 border-2 flex flex-row items-center p-2 rounded-md`}>
                <IconFA5 name={name} size={30} className="ml-2" />
                <Text className="flex-1 text-center self-center ml-2">{text}</Text>
                <TouchableOpacity onPress={resetAlert}>
                    <IconFA5 name="times" size={30} className="mr-2" />
                </TouchableOpacity>
            </View>
        );
    
    } else {
        return <></>;
    }
}
