import { View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from "react-native-reanimated";
import { useEffect } from "react";

export default function BudgetLineGraph({ budget, placeholder, nonPlaceholder, isPlaceholder }) {
    const valueToUse = isPlaceholder ? placeholder + nonPlaceholder : nonPlaceholder;
    const placeholderPercentage = (valueToUse / budget) * 100;
    const isOverBudget = placeholderPercentage > 100;
    const budgetPercentage = isOverBudget ? 100 : placeholderPercentage;

    const animatedValue = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            animatedValue.value,
            [0, 33, 75, 100],
            ['#00CC00', '#FFFF33', '#FFBB33', '#FF6666']
        );
        return {
            width: `${animatedValue.value}%`,
            backgroundColor,
        };
        
        
    });

    useEffect(() => {
        animatedValue.value = withTiming(budgetPercentage, { duration: 1000 });
    }, [budgetPercentage]);


    return (
        <>
            <View className="w-full h-8 bg-slate-200"></View>
            <Animated.View
                style={animatedStyle} className={`h-8 absolute`}
            ></Animated.View>
        </>
    );
}
