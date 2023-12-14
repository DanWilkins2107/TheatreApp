import { View, ActivityIndicator } from "react-native";

export default function LoadingWheel({size}) {
    return (
        <View className="flex flex-row flex-1 justify-center">
            <ActivityIndicator size={size} color="black" />
        </View>
    );
}   