import { View, Text, Image, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { ModalContext } from "../Modal/ModalProvider";
import RecieptViewerModal from "./RecieptViewerModal";

export default function ReceiptViewer({ recieptURL }) {
    const { setModal } = useContext(ModalContext);
    return (
        <>
            {recieptURL ? (
                <TouchableOpacity onPress={() => setModal(<RecieptViewerModal recieptURL={recieptURL}/>)}>
                    <Image
                        className="bg-slate-100 h-full rounded-lg border-2"
                        source={{
                            uri: recieptURL,
                        }}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            ) : (
                <View className="bg-slate-100 h-full rounded-lg border-2 border-black flex items-center justify-around">
                    <Text className="text-lg">No Reciept Found</Text>
                </View>
            )}
        </>
    );
}
