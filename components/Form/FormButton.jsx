import { TouchableOpacity, Text } from "react-native";

export default function FormButton(props) {
    return (
        <TouchableOpacity
            className={`bg-slate-700 justify-center w-40 h-10 self-center border-2 border-black rounded-full ${
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
