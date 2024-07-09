import { TouchableOpacity, Text } from "react-native";

export default function FormButton(props) {
    return (
        <TouchableOpacity
            className={`bg-slate-600 justify-center w-40 h-10 self-center border-2 mt-2 mb-4 rounded-xl ${
                props.blockClassName || ""
            }`}
            onPress={props.onPress}
        >
            <Text
                className={`text-white text-center text-lg font-extrabold ${
                    props.textClassName || ""
                }`}
            >
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}
