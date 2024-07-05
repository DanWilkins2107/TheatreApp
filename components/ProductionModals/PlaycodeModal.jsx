import { View } from "react-native";

// TODO:
// - Check admin + change playcode option
// - QR code for joining
// - Big Letters

export default function PlayCodeModal({ playcode }) {
	return (
		<View className="flex-col p-3">
			<View className="bg-slate-400 h-96 w-96" />
			<Text className="text-6xl">{playcode}</Text>
		</View>
	);
}