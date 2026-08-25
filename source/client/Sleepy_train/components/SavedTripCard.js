import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";

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
        const url = `http://172.20.10.2:3000/api/refreshJourney/?refreshToken=${encodeURIComponent(key)}`;
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
                        <MaterialIcons name={"arrow-downward"} size={20} color={TEXT_DARK} />
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
                <MaterialIcons name={"arrow-forward"} size={20} color={TEXT_DARK}></MaterialIcons>
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

const RED = '#E8352B';
const GRAY = '#9A9A9E';
const BORDER = '#E4E4E7';
const TEXT_DARK = '#1A1A1A';
const TEXT_GRAY = '#8A8A8E';

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: BORDER,
        paddingVertical: 16,
        paddingHorizontal: 18,
        width: 320,
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
        marginRight: 12,
    },
    badgeRed: {
        backgroundColor: RED,
    },
    badgeGray: {
        backgroundColor: GRAY,
    },
    badgeText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 12,
    },
    stationText: {
        fontSize: 17,
        color: TEXT_DARK,
        flexShrink: 1,
    },
    connectorRow: {
        flexDirection: 'row',
        height: 22,
    },
    connectorSpacer: {
        width: 26,
        alignItems: 'center',
        marginRight: 12,
    },
    arrowDown: {
        fontSize: 15,
        color: TEXT_DARK,
    },
    platformText: {
        fontSize: 15,
        color: TEXT_GRAY,
        marginLeft: 8,
    },

    /* Date row */
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 18,
    },
    dateText: {
        fontSize: 15,
        color: TEXT_GRAY,
        marginLeft: 10,
    },
    calendar: {
        width: 18,
        height: 17,
        borderWidth: 1.6,
        borderColor: TEXT_GRAY,
        borderRadius: 3,
        marginTop: 2,
    },
    calendarLeg1: {
        position: 'absolute',
        top: -5,
        left: 2,
        width: 2,
        height: 6,
        backgroundColor: TEXT_GRAY,
        borderRadius: 1,
    },
    calendarLeg2: {
        position: 'absolute',
        top: -5,
        right: 2,
        width: 2,
        height: 6,
        backgroundColor: TEXT_GRAY,
        borderRadius: 1,
    },

    /* Time row */
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginLeft: 28,
    },
    timeText: {
        fontSize: 17,
        fontWeight: '600',
        color: TEXT_DARK,
    },
    timeArrow: {
        fontSize: 16,
        color: TEXT_DARK,
    },
});