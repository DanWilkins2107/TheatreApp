import { View, Image, TouchableOpacity, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFA5 from "react-native-vector-icons/FontAwesome5";

export default function Header({ navigation, firstScreen, profileScreen }) {
    return (
        <SafeAreaView>
            <View className="flex-row justify-between px-4 h-11">
                <View className="flex-1 basis-0 justify-start flex-row">
                    {firstScreen || (
                        <TouchableOpacity
                            className="w-10 h-10 rounded-full flex-row align-middle justify-center pt-[7]"
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <Icon name="chevron-left" size={23} />
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
                    {profileScreen || (
                        <TouchableOpacity
                            className="w-10 h-10 rounded-full flex-row align-middle justify-center pt-2"
                            onPress={() => navigation.navigate("UserProfile")}
                        >
                            <IconFA5 name="user-alt" size={23} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}
