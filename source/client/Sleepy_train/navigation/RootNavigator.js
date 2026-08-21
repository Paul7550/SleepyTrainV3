import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import TripDetailScreen from '../screens/TripDetailScreen';
import { StyleSheet, View} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {StatusBar} from "expo-status-bar";
import Header from "../components/Header";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.headerArea}>
            <Header/>
            <StatusBar barStyle="light-content" backgroundColor={RED}/>
        </View>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="TripDetail" component={TripDetailScreen} />
        </Stack.Navigator>
        </SafeAreaView>
    );
}
const RED = '#E8352B';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerArea: {
        backgroundColor: RED,
    },
})