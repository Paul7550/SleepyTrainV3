import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";
import { card, colors, space, type, weight } from '../theme';

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
                    trackColor={{ false: colors.borderStrong, true: colors.brandTintFg }}
                    thumbColor={colors.surface}
                    ios_backgroundColor={colors.borderStrong}
                    accessibilityLabel={`Alarm for ${station}`}
                />
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={onDelete}
                    hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
                    accessibilityRole="button"
                    accessibilityLabel={`Remove alarm for ${station}`}
                >
                    <Text style={styles.deleteText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        ...card,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardInactive: {
        opacity: 0.55,
    },
    leftColumn: {
        flex: 1,
        marginRight: space.md,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    time: {
        fontSize: type.display,
        fontWeight: weight.bold,
        color: colors.textPrimary,
    },
    date: {
        fontSize: type.small,
        color: colors.textSecondary,
        marginLeft: space.sm,
    },
    stationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: space.sm,
    },
    bellIconWrap: {
        marginRight: space.sm,
    },
    station: {
        fontSize: type.body,
        color: colors.textPrimary,
        flexShrink: 1,
    },
    sound: {
        fontSize: type.small,
        color: colors.textSecondary,
        marginTop: space.xs,
    },
    dimmedText: {
        color: colors.textSecondary,
    },
    rightColumn: {
        alignItems: 'center',
    },
    deleteButton: {
        marginTop: space.md,
    },
    deleteText: {
        fontSize: type.caption,
        color: colors.brand,
        fontWeight: weight.semibold,
    },
});
