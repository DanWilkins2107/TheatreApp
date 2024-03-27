import { View, Image } from "react-native";
import { useState } from "react";
import LoadingWheel from "../Loading/LoadingWheel.jsx";

export default function RecieptViewerModal({recieptURL}) {
    const [loading, setLoading] = useState(true);
    return (
        <View className=" h-[400] rounded-lg flex items-center justify-around">
            {loading && <LoadingWheel size={"large"}/>}
            <Image
                className={`${loading? "h-1": "h-full"} w-full`}
                source={{
                    uri: recieptURL,
                }}
                resizeMode="contain"
                onLoadEnd={() => {setLoading(false)}}
            />
        </View>
    );
}