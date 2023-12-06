import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity, View, ScrollView } from "react-native";

export default function GeneralModal({ closeModal, children }) {
    return (
        <View className="flex flex-1 justify-center items-center bg-[#FFFFFF90]">
            <View className={`w-10/12 h-2/5 border-2 rounded-xl  bg-white`}>
                <ScrollView className="flex flex-col" scrollEnabled={false} keyboardShouldPersistTaps="handled">
                    <View className="flex-row">
                        <TouchableOpacity
                            onPress={closeModal}
                            className="w-12 h-12 flex justify-center items-center"
                        >
                            <FontAwesomeIcon icon={faXmark} size={30} />
                        </TouchableOpacity>
                    </View>
                    <View className="flex flex-1 flex-col">{children}</View>
                </ScrollView>
            </View>
        </View>
    );
}
