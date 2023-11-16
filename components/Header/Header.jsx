import { View, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    return (
        <View className="flex-row justify-between w-[90%] mr-10">
            <View className="flex-1 basis-0 justify-start flex-row">
                <FontAwesomeIcon icon={faHouse} size={20} />
            </View>
            <View className="flex-1 basis-0 justify-center flex-row">
                <Image
                    className="self-center w-6 h-6"
                    source={require("../../assets/logo.png")}
                />
            </View>
            <View className="flex-1 basis-0 justify-end flex-row">
                <FontAwesomeIcon icon={faUser} size={20} />
            </View>
        </View>
    );
}
