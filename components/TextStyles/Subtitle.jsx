import { Text } from "react-native";

export default function Subtitle({ children, extraClassName, oneLine = false }) {
    return (
        <Text
            className={`text-xl font-semibold ${extraClassName} text-ellipsis`}
            numberOfLines={oneLine ? 1 : null}
        >
            {children}
        </Text>
    );
}
