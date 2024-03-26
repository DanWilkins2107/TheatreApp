import { Text } from "react-native";

export default function Title({ children, extraClassName }) {
    return <Text className={`text-3xl font-extrabold ${extraClassName}`}>{children}</Text>;
}