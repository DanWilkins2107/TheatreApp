import { Text } from "react-native";

export default function Title({ children, extraClassName, oneLine = false }) {
    return (
        <Text
            className={`text-3xl font-extrabold ${extraClassName} text-ellipsis`}
            numberOfLines={oneLine ? 1 : null}
        >
            {children}
        </Text>
    );
}
