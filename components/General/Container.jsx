import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";

export default function Container({ children }) {
    const headerHeight = useHeaderHeight();
    return (
        <LinearGradient
            colors={["#FFFFFF", "#EEEEEE"]}
            className={`h-full w-full`}
            style={{ paddingTop: headerHeight }}
        >
            {children}
        </LinearGradient>
    );
}
