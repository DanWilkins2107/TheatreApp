import { View, Image } from "react-native";
import { useState } from "react";
import LoadingWheel from "../Loading/LoadingWheel.jsx";
import AddRecieptButton from "./AddRecieptButton.jsx";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ReceiptViewerModal({recieptURL, download}) {
    const [loading, setLoading] = useState(true);
    const handleDownload = () => {
        alert("Downloaded!")
    };
    return (
        <View className="mt-8 h-[400] rounded-lg flex items-center justify-around mb-20">
            {loading && <LoadingWheel size={"large"}/>}
            <Image
                className={`${loading? "h-1": "h-full"} w-full`}
                source={{
                    uri: recieptURL,
                }}
                resizeMode="contain"
                onLoadEnd={() => {setLoading(false)}}
            />
            {download && !loading && <AddRecieptButton onPress={handleDownload}>
                <Icon name="download" size={50} color="black"/>
            </AddRecieptButton>}
        </View>
    );
}