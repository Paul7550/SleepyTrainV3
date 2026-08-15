import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native';
export default function Header() {
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.menuButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <View style={styles.menuLine} />
                <View style={styles.menuLine} />
                <View style={styles.menuLine} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Sleepy Train</Text>
            <View style={styles.menuButtonSpacer} />
        </View>
    );
}
const RED = '#E8352B';
const BLUE = '#2F6FED';
const LINE_BLUE = '#2F5FC7';
const GREEN = '#2E9B4F';
const GRAY = '#9A9A9E';
const BORDER = '#E4E4E7';
const TEXT_DARK = '#1A1A1A';
const TEXT_GRAY = '#8A8A8E';

const styles = StyleSheet.create({
    /* Header */
    header: {
        backgroundColor: RED,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingTop: Platform.OS === 'android' ? 18 : 15,
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