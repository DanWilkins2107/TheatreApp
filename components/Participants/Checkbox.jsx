import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableOpacity } from "react-native";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Checkbox({ checked, setChecked }) {
    return (
        <TouchableOpacity
            className={`w-10 h-10 border-2 border-black ${checked ? "bg-green-400" : "bg-white"} flex items-center justify-around rounded-md`}
            onPress={setChecked}
        >
            <FontAwesomeIcon icon={faCheck} size={24} />
        </TouchableOpacity>
    );
}
