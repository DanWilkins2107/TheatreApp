import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity, View } from "react-native";

export default function GeneralModal({ closeModal, children, height = "2/5" }) {
    return (
        <View className="flex flex-1 justify-center items-center bg-[#FFFFFF90]">
            <View className={`w-10/12 h-${height} border-2 rounded-xl flex flex-col bg-white`}>
                <View className="flex-row">
                    <TouchableOpacity
                        onPress={closeModal}
                        className="w-12 h-12 flex justify-center items-center"
                    >
                        <FontAwesomeIcon icon={faXmark} size={30} />
                    </TouchableOpacity>
                </View>
                <View className="flex flex-1 flex-col">{children}</View>
            </View>
        </View>
    );
}
