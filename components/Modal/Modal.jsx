import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity, View, Keyboard, Pressable } from "react-native";
import { ModalContext } from "./ModalProvider";
import { useContext } from "react";

export default function Modal() {
    const { modal, setModal } = useContext(ModalContext);
    if (modal != null) {
        return (
            <Pressable
                className="h-screen justify-center items-center bg-[#FFFFFF90]"
                onPress={() => setModal(null)}
            >
                <Pressable
                    className="flex w-10/12 border-2 rounded-xl bg-white"
                    onPress={Keyboard.dismiss}
                >
                    <View classname="flex-none bg-red-500">
                        <TouchableOpacity
                            onPress={() => {
                                setModal(null);
                            }}
                            className="w-12 h-12 justify-center items-center"
                        >
                            <FontAwesomeIcon icon={faXmark} size={30} />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-initial pb-8">{modal}</View>
                </Pressable>
            </Pressable>
        );
    } else {
        return <></>;
    }
}
