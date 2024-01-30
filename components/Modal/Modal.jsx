import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { ModalContext } from "./ModalProvider";
import { useContext } from "react";

export default function Modal() {
    const { modal, setModal } = useContext(ModalContext);
    if (modal != null) {
        return (
            <TouchableWithoutFeedback onPress={() => setModal(null)}>
                <View className="h-screen justify-center items-center bg-[#FFFFFF90]">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View className="h-1/2 w-10/12 border-2 rounded-xl bg-white">
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        setModal(null);
                                    }}
                                    className="w-12 h-12 justify-center items-center"
                                >
                                    <FontAwesomeIcon icon={faXmark} size={30} />
                                </TouchableOpacity>
                            </View>
                            <View className="flex flex-1">{modal}</View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        );
    } else {
        return <></>;
    }
}
