import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NavMenu from './Navmenu';
import {MaterialIcons} from "@expo/vector-icons";
import { colors, space, type, weight } from '../theme';

const ICON_SLOT = 28;

export default function Header() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [showMenu, setShowMenu] = useState(false);

    const activeRouteName = useNavigationState((state) => {
        if (!state) return 'Search';
        return state.routes[state.index].name;
    });
    const getActiveTab = (routeName) => {
        switch (routeName) {
            case 'Saved':
                return 'saved';
            case 'Alarm':
                return 'alarm'; // Add new case
            case 'Search':
            default:
                return 'search';
        }
    };
    const activeTab = getActiveTab(activeRouteName);

    const handleSelectTab = (tab) => {
        const routeNames = {
            saved: 'Saved',
            alarm: 'Alarm',
            search: 'Search',
        };

        const targetRoute = routeNames[tab] || 'Search';
        navigation.navigate(targetRoute);
    };

    return (
        <View style={[styles.header, { paddingTop: insets.top + space.sm }]}>
            <TouchableOpacity
                style={styles.iconSlot}
                onPress={() => setShowMenu(true)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                accessibilityRole="button"
                accessibilityLabel="Open menu"
            >
                <MaterialIcons name={"menu"} size={24} color={colors.textOnBrand}></MaterialIcons>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Sleepy Train</Text>
            <TouchableOpacity
                style={styles.iconSlot}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={()=>handleSelectTab('alarm')}
                accessibilityRole="button"
                accessibilityLabel="Alarms"
            >
                <MaterialIcons name={"alarm"} size={24} color={colors.textOnBrand} ></MaterialIcons>
            </TouchableOpacity>

            <NavMenu
                visible={showMenu}
                onClose={() => setShowMenu(false)}
                activeTab={activeTab}
                onSelectTab={handleSelectTab}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.brand,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: space.xl,
        paddingBottom: space.xl,
    },
    // Equal-width slots on both sides keep the title optically centred.
    iconSlot: {
        width: ICON_SLOT,
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        color: colors.textOnBrand,
        fontSize: type.subdisplay,
        fontWeight: weight.bold,
    },
});
