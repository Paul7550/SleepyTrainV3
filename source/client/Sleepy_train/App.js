import { NavigationContainer } from '@react-navigation/native';
import {StyleSheet} from "react-native";
import RootNavigator from './navigation/RootNavigator';
import * as BackgroundTask from "expo-background-task";
import * as TaskManager from 'expo-task-manager';

export default function App() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
}
