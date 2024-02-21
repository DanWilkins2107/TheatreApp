import { View, Text, Image } from "react-native";

export default function ReceiptViewer({ recieptURL }) {
    console.log(recieptURL);
    return (
        <>
            {recieptURL ? (
                <Image
                    className="bg-slate-100 h-full rounded-lg border-2"
                    source={{
                        uri: recieptURL,
                    }}
                    resizeMode="cover"
                />
            ) : (
                <View className="bg-slate-100 h-full rounded-lg border-2 border-black flex items-center justify-around">
                    <Text className="text-lg">No Reciept Found</Text>
                </View>
            )}
        </>
    );
}
