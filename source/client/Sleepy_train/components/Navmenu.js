import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Animated,
    Dimensions,
    Platform,
} from 'react-native';
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";

/**
 * NavMenu
 *
 * A slide-in side menu (from the left) letting the user switch
 * between "Search" and "Saved".
 *
 * Props:
 *  - visible: boolean
 *  - onClose: () => void
 *  - activeTab: 'search' | 'saved'
 *  - onSelectTab: (tab: 'search' | 'saved') => void
 */
export default function NavMenu({ visible, onClose, activeTab, onSelectTab }) {
    const screenWidth = Dimensions.get('window').width;
    const menuWidth = Math.min(280, screenWidth * 0.75);

    const backdropOpacity = useRef(new Animated.Value(0)).current;
    const menuTranslateX = useRef(new Animated.Value(-menuWidth)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(backdropOpacity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.spring(menuTranslateX, {
                    toValue: 0,
                    useNativeDriver: true,
                    bounciness: 3,
                }),
            ]).start();
        } else {
            backdropOpacity.setValue(0);
            menuTranslateX.setValue(-menuWidth);
        }
    }, [visible]);

    const handleClose = () => {
        Animated.parallel([
            Animated.timing(backdropOpacity, {
                toValue: 0,
                duration: 160,
                useNativeDriver: true,
            }),
            Animated.timing(menuTranslateX, {
                toValue: -menuWidth,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => onClose());
    };

    const handleSelect = (tab) => {
        onSelectTab(tab);
        handleClose();
    };

    return (
        <Modal visible={visible} animationType="none" transparent onRequestClose={handleClose}>
            <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
                <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={handleClose} />
            </Animated.View>

            <Animated.View
                style={[
                    styles.menu,
                    { width: menuWidth, transform: [{ translateX: menuTranslateX }] },
                ]}
            >
                <View style={styles.connectorRow}>
                    <MaterialCommunityIcons name="train-car-passenger" size={26} color="black" />
                    <MaterialCommunityIcons name="train-car-passenger-door" size={26} color="black" />
                    <MaterialCommunityIcons name="train-car-passenger" size={26} color="black" />
                </View>

                <Text style={styles.menuTitle}>Sleepy Train</Text>

                <TouchableOpacity
                    style={[styles.menuItem, activeTab === 'search' && styles.menuItemActive]}
                    onPress={() => handleSelect('search')}
                    activeOpacity={0.7}
                >
                    <MaterialIcons name={"search"} size={24} style={styles.menuItemIcon}/>
                    <Text style={[styles.menuItemText, activeTab === 'search' && styles.menuItemTextActive]}>
                        Search
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.menuItem, activeTab === 'saved' && styles.menuItemActive]}
                    onPress={() => handleSelect('saved')}
                    activeOpacity={0.7}
                >
                    <MaterialIcons name={"bookmarks"} size={24} style={styles.menuItemIcon}/>
                    <Text style={[styles.menuItemText, activeTab === 'saved' && styles.menuItemTextActive]}>
                        Saved
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </Modal>
    );
}

const RED = '#E8352B';
const TEXT_DARK = '#1A1A1A';
const TEXT_GRAY = '#8A8A8E';
const BORDER = '#E4E4E7';

const styles = StyleSheet.create({
    connectorRow: {
        flexDirection: 'row',
        height: 20,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    menu: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
    },
    menuTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: TEXT_DARK,
        marginBottom: 24,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginBottom: 4,
    },
    menuItemActive: {
        backgroundColor: '#FDEAE9',
    },
    menuItemIcon: {
        fontSize: 18,
        marginRight: 14,
    },
    menuItemText: {
        fontSize: 16,
        color: TEXT_GRAY,
        fontWeight: '500',
    },
    menuItemTextActive: {
        color: RED,
        fontWeight: '700',
    },
});