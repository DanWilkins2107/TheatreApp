import { TextInput } from "react-native";

export default function FormField(props) {
    return (
        <TextInput
            className={`px-5 py-2 my-1 bg-slate-100 rounded-xl border-2 ${props.extraClassName || ""}`}
            value={props.value}
            placeholder={props.placeholder}
            autoCapitalize={props.autoCapitalize || "words"}
            secureTextEntry={props.secureTextEntry || false}
            onChangeText={props.onChangeText}
        />
    );
}
