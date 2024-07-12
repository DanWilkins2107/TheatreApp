import { TouchableOpacity, Image } from "react-native";
import { useState, useContext } from "react";
import LoadingWheel from "../Loading/LoadingWheel.jsx";
import { ModalContext } from "../Modal/ModalProvider.jsx";
import ReceiptViewerModal from "./ReceiptViewerModal.jsx";

export default function ImageViewer({ URL, centered }) {
    const [loading, setLoading] = useState(true);
    const { setModal } = useContext(ModalContext);
    return (
        <TouchableOpacity
            className={`rounded-lg flex ${
                centered && "items-center justify-around"
            }  w-full flex-1`}
            onPress={() => setModal(<ReceiptViewerModal recieptURL={URL} download={true} />)}
        >
            {loading && <LoadingWheel size={"large"} />}
            <Image
                className={`${loading ? "h-1" : "h-full"} w-full`}
                source={{
                    uri: URL,
                }}
                resizeMode="contain"
                onLoadEnd={() => {
                    setLoading(false);
                }}
            />
        </TouchableOpacity>
    );
}
