import { View, ActivityIndicator } from "react-native";

export default function LoadingWheel() {
    return (
        <View className="flex flex-row h-5/6 justify-center">
            <ActivityIndicator size="large" color="black" />
        </View>
    );
}   