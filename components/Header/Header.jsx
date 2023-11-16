import { View, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    return (
        <View className="flex-row justify-between w-[90%] mt-[-20] mr-10">
            <View className="flex-1 basis-0 justify-start flex-row">
                <TouchableOpacity className=" w-10 h-10 rounded-full flex-row align-middle justify-center pt-[7]">
                    <FontAwesomeIcon icon={faHouse} size={25} />
                </TouchableOpacity>
            </View>
            <View className="flex-1 basis-0 justify-center flex-row">
                <Image className="self-center w-10 h-10 mt-111" source={require("../../assets/logo.png")} />
            </View>
            <View className="flex-1 basis-0 justify-end flex-row">
                <TouchableOpacity className="w-10 h-10 rounded-full flex-row align-middle justify-center pt-2">
                    <FontAwesomeIcon icon={faUser} size={23} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
