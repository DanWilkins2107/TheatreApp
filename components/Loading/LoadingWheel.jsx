import { View, ActivityIndicator } from "react-native";

export default function LoadingWheel() {
    return (
        <View className="flex flex-row flex-1 justify-center bg-blue-500">
            <ActivityIndicator size="large" color="black" />
        </View>
    );
}   