import { View, Text } from "react-native";

export default function BudgetHomeScreen({ route }) {
    // const CreateProduction = () => {
    //     setErrorText("");
    //     const dbRef = ref(db);
    //     const playCode = generatePlayCode();
    //     get(child(dbRef, `/productions/${playCode}`))
    //         .then((snapshot) => {
    //             const data = snapshot.val();
    //             if (!data) {
    //                 set(ref(db, "productions/" + playCode), {
    //                     playName: name,
    //                     admins: {
    //                         [auth.currentUser.uid]: Date.now(),
    //                     },
    //                     participants: {
    //                         [auth.currentUser.uid]: Date.now(),
    //                     },
    //                     teams: [],
    //                     budgets: [],
    //                 });
    //                 set(
    //                     ref(db, "users/" + auth.currentUser.uid + "/productions/" + playCode),
    //                     Date.now()
    //                 );
    //                 closeModal();
    //             } else {
    //                 CreateProduction();
    //             }
    //         })
    //         .catch((error) => {
    //             setErrorText("Error getting data: " + error);
    //         });
    // };

    const createBudget = () => {
        
    };
    return (
        <View className="flex-col">
            <Text>Budget Selection Screen</Text>
        </View>
    );
}
