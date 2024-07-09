import { View, Text } from "react-native";

// TODO:
// - Check admin + change playcode option
// - QR code for joining
// - Big Letters

export default function PlayCodeModal({ productionCode }) {
    console.log(productionCode);

    return (
        <View className="flex-col items-center p-3">
            <View className="bg-slate-400 h-44 w-44 mb-8 items-center justify-center rounded-xl">
							<Text className="text-6xl font-black">QR</Text>
						</View>
            <Text className="text-3xl font-extrabold text-black">{productionCode}</Text>
        </View>
    );
}
