import { View, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header({ navigation, firstScreen, profileScreen }) {
    return (
        <View className="flex-row justify-between w-[90%] mr-10">
            <View className="flex-1 basis-0 justify-start flex-row">
                {firstScreen || (
                    <TouchableOpacity
                        className="w-10 h-10rounded-full flex-row align-middle justify-center pt-[7]"
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} size={25} />
                    </TouchableOpacity>
                )}
            </View>
            <TouchableOpacity
                className="w-16 h-16 flex items-center pt-1"
                onPress={() => navigation.navigate("UserDashboard")}
            >
                <Image className="w-8 h-8" source={require("../../assets/logo.png")} />
            </TouchableOpacity>
            <View className="flex-1 basis-0 justify-end flex-row">
                {profileScreen || <TouchableOpacity
                    className="w-10 h-10 rounded-full flex-row align-middle justify-center pt-2"
                    onPress={() => navigation.navigate("UserProfile")}
                >
                    <FontAwesomeIcon icon={faUser} size={23} />
                </TouchableOpacity>}
            </View>
        </View>
    );
}
