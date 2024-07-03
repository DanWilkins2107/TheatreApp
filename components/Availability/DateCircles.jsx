import { Text, View } from "react-native";

export default function DateCircles({ number, letter }) {
    const numberString = (number % 10 === 1) ? "st" : number % 10 === 2 ? "nd" : number % 10 === 3 ? "rd" : "th"
    
    return <View className="rounded-md bg-blue-100 w-11/12 h-5/6 items-center justify-center border-2" >
        <Text className="font-semibold text-center">{letter}</Text>
        <Text className="font-semibold text-center text-sm">{number + numberString}</Text>
    </View>
}