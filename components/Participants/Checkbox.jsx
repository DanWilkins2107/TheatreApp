import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";

export default function Checkbox({ checked, setChecked, size=20 }) {
    return (
        <TouchableOpacity
            className={`border-2 border-black ${checked ? "bg-green-400" : "bg-slate-100"} flex items-center justify-around rounded-md`}
            onPress={setChecked}
            style={{ width: size * 2, height: size * 2 }}
        >
            <Icon name="check" size={size} color="black" />
        </TouchableOpacity>
    );
}
