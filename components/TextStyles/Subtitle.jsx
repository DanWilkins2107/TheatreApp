import { Text } from "react-native";

export default function Subtitle({ children, extraClassName }) {
    return <Text className={`text-xl font-semibold ${extraClassName}`}>{children}</Text>;
}