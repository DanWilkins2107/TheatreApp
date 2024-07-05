import { Text, TouchableOpacity } from "react-native";
import LoadingWheel from "../Loading/LoadingWheel";


export default function SmallFormButton({ backgroundColor, title, onPress, loading }) {
    return (
        <TouchableOpacity
            className={`${backgroundColor} border-2 border-black rounded-3xl p-2 flex items-center justify-center w-5/12`}
            onPress={onPress}
        >
            {loading ? (
                <LoadingWheel size={10}/>
            ) : (
                <Text className="text-black font-bold">{title}</Text>
            )}
        </TouchableOpacity>
    );
}
