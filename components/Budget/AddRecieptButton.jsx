import { TouchableOpacity } from "react-native";

export default function AddRecieptButton({ onPress, children}) {
    return <TouchableOpacity onPress={onPress} className="w-24 h-24 p-3 bg-red-400 mb-2 border-2 border-black rounded-full items-center flex justify-around">
        {children}
    </TouchableOpacity>
}