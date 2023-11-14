import { TouchableOpacity, Text } from "react-native";

export default function FormButton(props) {
    return (
        <TouchableOpacity className={props.blockClassName} onPress={props.onPress}>
            <Text className={props.textClassName}>{props.title}</Text>
        </TouchableOpacity>
    );
}
