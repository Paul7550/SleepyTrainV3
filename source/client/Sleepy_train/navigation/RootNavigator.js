import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import TripDetailScreen from '../screens/TripDetailScreen';
import { StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import Header from "../components/Header";
import SavedTripsScreen from "../screens/SavedTripsScreen";
import ActiveAlarmsScreen from "../screens/AlarmScreen";
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <View style={styles.screen}>
            <StatusBar style="light"/>
        <Stack.Navigator screenOptions={{ header:()=> <Header/>}}>
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="TripDetail" component={TripDetailScreen} />
            <Stack.Screen name={"Saved"} component={SavedTripsScreen} />
            <Stack.Screen name={"Alarm"} component={ActiveAlarmsScreen} />
        </Stack.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.surface,
    },
});
