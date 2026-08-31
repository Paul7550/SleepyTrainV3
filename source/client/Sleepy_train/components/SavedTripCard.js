import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";
import { card, colors, space, type, weight } from '../theme';

export default function SavedTripCard({
                                          refreshToken,
                                          originName,
                                          destinationName ,
                                          plannedDeparturePlatform,
                                          date = 'Thu 13.Aug 2026',
                                          plannedDeparture,
                                          plannedArrival,
                                          handleSelectTrip
                                      }) {
    const Departure = new Date(plannedDeparture)
    const Arrival = new Date(plannedArrival)
    const loadConnectionDetails = async (key) => {
        const url = `${process.env.EXPO_PUBLIC_API_URL}/refreshJourney/?refreshToken=${encodeURIComponent(key)}`;
        const response = await fetch(url, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        let res = await response.json();
        handleSelectTrip(res,refreshToken);
    }
    return (
        <TouchableOpacity style={styles.card} onPress={()=>loadConnectionDetails(refreshToken)}>
            {/* Top row: From / To with badges + platform */}
            <View style={styles.topRow}>
                <View style={styles.stationsColumn}>
                    <View style={styles.stationRow}>
                        <View style={[styles.badge, styles.badgeRed]}>
                            <Text style={styles.badgeText}>A</Text>
                        </View>
                        <Text style={styles.stationText} numberOfLines={1}>
                            {originName}
                        </Text>
                    </View>

                    <View style={styles.connectorRow}>
                        <View style={styles.connectorSpacer} />
                        <MaterialIcons name={"arrow-downward"} size={20} color={colors.textPrimary} />
                    </View>

                    <View style={styles.stationRow}>
                        <View style={[styles.badge, styles.badgeGray]}>
                            <Text style={styles.badgeText}>B</Text>
                        </View>
                        <Text style={styles.stationText} numberOfLines={1}>
                            {destinationName}
                        </Text>
                    </View>
                </View>

                <Text style={styles.platformText}>{plannedDeparturePlatform}</Text>
            </View>

            {/* Date row */}
            <View style={styles.dateRow}>
                <CalendarIcon />
                <Text style={styles.dateText}>{date}</Text>
            </View>

            {/* Time row */}
            <View style={styles.timeRow}>
                <Text style={styles.timeText}>{Departure.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</Text>
                <MaterialIcons name={"arrow-forward"} size={20} color={colors.textPrimary}></MaterialIcons>
                <Text style={styles.timeText}>{Arrival.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</Text>
            </View>
        </TouchableOpacity>
    );
}

function CalendarIcon() {
    return (
        <View style={styles.calendar}>
            <View style={styles.calendarLeg1} />
            <View style={styles.calendarLeg2} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        ...card,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    stationsColumn: {
        flex: 1,
    },
    stationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        width: 26,
        height: 26,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: space.md,
    },
    badgeRed: {
        backgroundColor: colors.brand,
    },
    badgeGray: {
        backgroundColor: colors.textSecondary,
    },
    badgeText: {
        color: colors.textOnBrand,
        fontWeight: weight.bold,
        fontSize: type.caption,
    },
    stationText: {
        fontSize: type.body,
        color: colors.textPrimary,
        flexShrink: 1,
    },
    connectorRow: {
        flexDirection: 'row',
        height: space.xxl,
    },
    connectorSpacer: {
        width: 26,
        alignItems: 'center',
        marginRight: space.md,
    },
    platformText: {
        fontSize: type.body,
        color: colors.textSecondary,
        marginLeft: space.sm,
    },

    /* Date row */
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: space.xl,
    },
    dateText: {
        fontSize: type.body,
        color: colors.textSecondary,
        marginLeft: space.md,
    },
    calendar: {
        width: 18,
        height: 17,
        borderWidth: 1.6,
        borderColor: colors.textSecondary,
        borderRadius: 3,
        marginTop: 2,
    },
    calendarLeg1: {
        position: 'absolute',
        top: -5,
        left: 2,
        width: 2,
        height: 6,
        backgroundColor: colors.textSecondary,
        borderRadius: 1,
    },
    calendarLeg2: {
        position: 'absolute',
        top: -5,
        right: 2,
        width: 2,
        height: 6,
        backgroundColor: colors.textSecondary,
        borderRadius: 1,
    },

    /* Time row */
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: space.sm,
        marginLeft: space.xxxl,
    },
    timeText: {
        fontSize: type.body,
        fontWeight: weight.semibold,
        color: colors.textPrimary,
    },
});
