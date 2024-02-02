import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableOpacity } from "react-native";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Checkbox({ checked, setChecked }) {
    if (checked) {
        return (
            <TouchableOpacity className="w-6 h-6 bg-border-2 border-black bg-green-400" onPress={() => setChecked(!checked)}>
                <FontAwesomeIcon icon={faCheck} size={24} />
            </TouchableOpacity>
        );
    } else 
        return (
            <TouchableOpacity className="w-6 h-6 bg-border-2 border-black bg-[#FFFFFF90]" onPress={() => setChecked(!checked)}>
                <FontAwesomeIcon icon={faCheck} size={24} />
            </TouchableOpacity>
        );
}
