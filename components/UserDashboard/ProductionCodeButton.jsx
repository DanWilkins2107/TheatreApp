import { Pressable, Text, View } from "react-native";

export default function ProductionCodeButton({ productionCode, onPress }) {
	console.log(productionCode);

	return (
		<Pressable className="flex-row" onPress={onPress}>
			{productionCode.split("").map((char, i) => {
				return (
					<View key={i} className="flex items-center border-2 rounded-lg w-8 mr-1">
						<Text className="text-2xl font-bold">
							{char}
						</Text>
					</View>
				);
			})}
		</Pressable>
	);
}