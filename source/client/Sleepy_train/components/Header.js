import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import NavMenu from './Navmenu';
import {MaterialIcons} from "@expo/vector-icons";

const RED = '#E8352B';
const BORDER = '#E4E4E7';

export default function Header() {
    const navigation = useNavigation();
    const [showMenu, setShowMenu] = useState(false);

    const activeRouteName = useNavigationState((state) => {
        if (!state) return 'Search';
        return state.routes[state.index].name;
    });

    const activeTab = activeRouteName === 'Saved' ? 'saved' : 'search';

    const handleSelectTab = (tab) => {
        navigation.navigate(tab === 'saved' ? 'Saved' : 'Search');
    };

    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => setShowMenu(true)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <MaterialIcons name={"menu"} size={24} color={BORDER}></MaterialIcons>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Sleepy Train</Text>
            <View style={styles.menuButtonSpacer} />

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
        backgroundColor: RED,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingTop: Platform.OS === 'android' ? 18 : 40,
        paddingBottom: 18,
    },
    menuButton: {
        width: 28,
        justifyContent: 'space-between',
        height: 18,
    },
    menuButtonSpacer: {
        width: 28,
    },
    menuLine: {
        height: 3,
        borderRadius: 2,
        backgroundColor: '#FFFFFF',
        width: '100%',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '700',
    },
});