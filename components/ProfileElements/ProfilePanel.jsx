import { TouchableOpacity, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";


export default function ProfilePanel(props) {
    return (
        <TouchableOpacity
            className={`w-max flex flex-row ${props.backgroundColor || "bg-white"} rounded-3xl px-4 m-2 h-32 border-2 justify-around items-center`}
            onPress={props.onClick}
        >   
            <Icon name={props.icon} size={30} color={props.iconColor} />
            <View className="w-[70%] flex-col">
                <Text className="ml-4 text-xl font-extrabold text-ellipsis" numberOfLines={1}>
                    {props.text}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
