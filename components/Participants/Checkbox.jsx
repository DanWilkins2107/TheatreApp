import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";

export default function Checkbox({ checked, setChecked }) {
    return (
        <TouchableOpacity
            className={`w-10 h-10 border-2 border-black ${checked ? "bg-green-400" : "bg-white"} flex items-center justify-around rounded-md`}
            onPress={setChecked}
        >
            <Icon name="check" size={20} color="black" />
        </TouchableOpacity>
    );
}
