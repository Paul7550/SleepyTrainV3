import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Animated,
    Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import { colors, radius, space, type, weight } from '../theme';

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
    const insets = useSafeAreaInsets();
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
                <TouchableOpacity
                    style={StyleSheet.absoluteFill}
                    activeOpacity={1}
                    onPress={handleClose}
                    accessibilityRole="button"
                    accessibilityLabel="Close menu"
                />
            </Animated.View>

            <Animated.View
                style={[
                    styles.menu,
                    { width: menuWidth, paddingTop: insets.top + space.xxl, transform: [{ translateX: menuTranslateX }] },
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
                <TouchableOpacity
                    style={[styles.menuItem, activeTab === 'alarm' && styles.menuItemActive]}
                    onPress={() => handleSelect('alarm')}
                    activeOpacity={0.7}
                >
                    <MaterialIcons name={"alarm"} size={24} style={styles.menuItemIcon}/>
                    <Text style={[styles.menuItemText, activeTab === 'alarm' && styles.menuItemTextActive]}>
                        Alarm
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    connectorRow: {
        flexDirection: 'row',
        marginBottom: space.sm,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.scrim,
    },
    menu: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: colors.surface,
        paddingHorizontal: space.xxl,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
    },
    menuTitle: {
        fontSize: type.heading,
        fontWeight: weight.bold,
        color: colors.textPrimary,
        marginBottom: space.xxxl,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: space.base,
        paddingHorizontal: space.md,
        borderRadius: radius.md,
        marginBottom: space.xs,
    },
    menuItemActive: {
        backgroundColor: colors.brandTintBg,
    },
    menuItemIcon: {
        fontSize: type.title,
        marginRight: space.base,
    },
    menuItemText: {
        fontSize: type.body,
        color: colors.textSecondary,
        fontWeight: weight.medium,
    },
    menuItemTextActive: {
        color: colors.brand,
        fontWeight: weight.bold,
    },
});
