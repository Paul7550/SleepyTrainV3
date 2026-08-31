import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Platform } from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";

/**
 * AlarmCard
 *
 * Props:
 *  - station: string          e.g. "Wien Floridsdorf"
 *  - triggerTime: string      e.g. "17:45" (formatted time the alarm fires)
 *  - triggerDate: string      e.g. "Thu 13.Aug" (optional, omit for "today")
 *  - sound: string            e.g. "Radar"
 *  - active: boolean
 *  - onToggle: (value: boolean) => void
 *  - onDelete: () => void
 */
export default function AlarmCard({
                                      station,
                                      triggerTime,
                                      triggerDate,
                                      sound,
                                      active,
                                      onToggle,
                                      onDelete,
                                  }) {
    return (
        <View style={[styles.card, !active && styles.cardInactive]}>
            <View style={styles.leftColumn}>
                <View style={styles.timeRow}>
                    <Text style={[styles.time, !active && styles.dimmedText]}>{triggerTime}</Text>
                    {triggerDate && <Text style={styles.date}>{triggerDate}</Text>}
                </View>

                <View style={styles.stationRow}>
                    <View style={styles.bellIconWrap}>
                        <MaterialIcons name={"alarm"} size={18} ></MaterialIcons>
                    </View>
                    <Text style={[styles.station, !active && styles.dimmedText]} numberOfLines={1}>
                        {station}
                    </Text>
                </View>

                <Text style={styles.sound}>{sound}</Text>
            </View>

            <View style={styles.rightColumn}>
                <Switch
                    value={active}
                    onValueChange={onToggle}
                    trackColor={{ false: '#D9D9DE', true: '#F3A29D' }}
                    thumbColor={'#FFFFFF'}
                    ios_backgroundColor="#D9D9DE"
                />
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={onDelete}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                    <Text style={styles.deleteText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const RED = '#E8352B';
const BORDER = '#E4E4E7';
const TEXT_DARK = '#1A1A1A';
const TEXT_GRAY = '#8A8A8E';

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: BORDER,
        paddingVertical: 16,
        paddingHorizontal: 18,
    },
    cardInactive: {
        opacity: 0.55,
    },
    leftColumn: {
        flex: 1,
        marginRight: 12,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    time: {
        fontSize: 26,
        fontWeight: '700',
        color: TEXT_DARK,
    },
    date: {
        fontSize: 13,
        color: TEXT_GRAY,
        marginLeft: 8,
    },
    stationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    bellIconWrap: {
        marginRight: 6,
    },
    bellIcon: {
        fontSize: 13,
    },
    station: {
        fontSize: 15,
        color: TEXT_DARK,
        flexShrink: 1,
    },
    sound: {
        fontSize: 13,
        color: TEXT_GRAY,
        marginTop: 4,
    },
    dimmedText: {
        color: TEXT_GRAY,
    },
    rightColumn: {
        alignItems: 'center',
    },
    deleteButton: {
        marginTop: 10,
    },
    deleteText: {
        fontSize: 12,
        color: RED,
        fontWeight: '600',
    },
});