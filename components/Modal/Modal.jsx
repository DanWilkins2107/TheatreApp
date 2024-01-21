import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity, View, ScrollView } from "react-native";
import { ModalContext } from "./ModalProvider";
import { useContext } from "react";

export default function Modal() {
    const { modal, setModal } = useContext(ModalContext);
    if (modal != null) {
        return (
            <View className="flex flex-1 h-screen justify-center items-center bg-[#FFFFFF90]">
                <View className={`w-10/12 h-fit pb-4 border-2 rounded-xl  bg-white`}>
                    <ScrollView
                        className="flex flex-col"
                        scrollEnabled={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View className="flex-row">
                            <TouchableOpacity
                                onPress={() => {
                                    setModal(null);
                                }}
                                className="w-12 h-12 flex justify-center items-center"
                            >
                                <FontAwesomeIcon icon={faXmark} size={30} />
                            </TouchableOpacity>
                        </View>
                        <View className="flex flex-1 flex-col">{modal}</View>
                    </ScrollView>
                </View>
            </View>
        );
    } else {
        return <></>;
    }
}
