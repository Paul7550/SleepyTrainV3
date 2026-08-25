import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlarmModal from "../components/Alarmmodal";


function formatTime(isoString) {
    const d = new Date(isoString);
    return d.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: false});
}

function formatRealTime(isoString, delayMinutes = 0) {
    const d = new Date(isoString);
    d.setMinutes(d.getMinutes() + (delayMinutes || 0));
    return d.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: false});
}

function formatDuration(startIso, endIso) {
    const ms = new Date(endIso) - new Date(startIso);
    const totalMinutes = Math.round(ms / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
}
const getJourneys = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('journeys');
        console.log(jsonValue)
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
       return []
    }
};
const addJourneys = async (newToken) => {
    try {
        const existing = await getJourneys();
        if (existing.includes(newToken)){
            return
        }
        const updated = [...existing, newToken];
        await AsyncStorage.setItem('journeys', JSON.stringify(updated));
        console.log(newToken)
    } catch (e) {
        console.error('Error adding token', e);
    }
};

const RED = '#E8352B';
const LINE_BLUE = '#2F5FC7';
const GREEN = '#2E9B4F';
const BORDER = '#E4E4E7';
const TEXT_DARK = '#1A1A1A';
const TEXT_GRAY = '#8A8A8E';
const TEXT_MID_GRAY = '#6E6E73';

/* -------------------------------------------------------------------------- */
/*  Trip summary (top time range)                                            */

/* -------------------------------------------------------------------------- */

function TripSummary({legs}) {
    const firstLeg = legs[0];
    const lastLeg = legs[legs.length - 1];

    return (
        <View style={styles.summaryRow}>
            <View>
                <View style={styles.summaryTimeRow}>
                    <Text style={styles.summaryTime}>{formatTime(firstLeg.plannedDeparture)}</Text>
                    <MaterialIcons name="arrow-forward" size={24} color={TEXT_DARK}/>
                    <Text style={styles.summaryTime}>{formatTime(lastLeg.plannedArrival)}</Text>
                </View>
                <View style={styles.summarySubTimeRow}>
                    <Text style={styles.summarySubTime}>
                        {formatRealTime(firstLeg.plannedDeparture, firstLeg.departureDelay)}
                    </Text>
                    <View style={styles.summarySubTimeSpacer}/>
                    <Text style={styles.summarySubTime}>
                        {formatRealTime(lastLeg.plannedArrival, lastLeg.arrivalDelay)}
                    </Text>
                </View>
            </View>
        </View>
    );
}

/* -------------------------------------------------------------------------- */
/*  Line overview (badges + connecting line + station labels)                */

/* -------------------------------------------------------------------------- */

function LineOverview({legs}) {
    const lastLeg = legs[legs.length - 1];
    return (
        <View style={styles.overviewContainer}>
            <View style={styles.overviewLineRow}>
                {legs.map((leg, index) => (
                    <React.Fragment key={index}>
                        {leg.name !== "Walk" ? (
                            <View style={styles.overviewBadge}>
                                <Text style={styles.overviewBadgeText}>{leg.name}</Text>
                            </View>
                        ) : null}
                        <View style={styles.overviewConnector}/>
                    </React.Fragment>
                ))}
                <View style={styles.overviewEndDot}/>
            </View>
        </View>
    );
}

/* -------------------------------------------------------------------------- */
/*  Action buttons (Alarm / Save)                                            */

/* -------------------------------------------------------------------------- */

function ActionButtons({setShownAlarm, onSave,token}) {
    return (
        <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionButton} onPress={()=>setShownAlarm(true)} activeOpacity={0.75}>
                <View style={styles.actionCircle}>
                    <Text style={styles.actionIcon}><MaterialIcons name="alarm" size={24} color={"#FFFFFF"}/></Text>
                </View>
                <Text style={styles.actionLabel}>Alarm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={()=>addJourneys(token)} activeOpacity={0.75}>
                <View style={styles.actionCircle}>
                    <Text style={styles.actionIcon}><MaterialIcons name="bookmark" size={24} color={"#FFFFFF"}/></Text>
                </View>
                <Text style={styles.actionLabel}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

/* -------------------------------------------------------------------------- */
/*  Timeline: one big stop row (blue dot, bold)                              */

/* -------------------------------------------------------------------------- */

function TimelineStopRow({time, realTime, name, platform, bold = true}) {
    return (
        <View style={styles.stopRow}>
            <View style={styles.stopDotColumn}>
                <View style={styles.stopDotBlue}/>
            </View>
            <View style={styles.stopTimeColumn}>
                <Text style={bold ? styles.stopTimeBold : styles.stopTime}>{time}</Text>
                <Text style={styles.stopRealTime}>{realTime}</Text>
            </View>
            <Text style={bold ? styles.stopNameBold : styles.stopName} numberOfLines={1}>
                {name}
            </Text>
            {platform != null && <Text style={styles.stopPlatform}>{platform}</Text>}
        </View>
    );
}

/* -------------------------------------------------------------------------- */
/*  Timeline: intermediate stop row (small black dot)                        */

/* -------------------------------------------------------------------------- */

function TimelineIntermediateStop({stop}) {
    return (
        <View style={styles.intermediateRow}>
            <View style={styles.stopDotColumn}>
                <View style={styles.stopDotBlack}/>
            </View>
            <View style={styles.stopTimeColumn}>
                <Text style={styles.stopTime}>{formatTime(stop.plannedArrival)}</Text>
                <Text style={styles.stopRealTime}>{formatRealTime(stop.plannedArrival, stop.arrivalDelay)}</Text>
            </View>
            <Text style={styles.stopNameMinor} numberOfLines={1}>
                {stop.name}
            </Text>
        </View>
    );
}

/* -------------------------------------------------------------------------- */
/*  Timeline: expandable leg row (line badge, direction, duration, chevron)  */

/* -------------------------------------------------------------------------- */

function TimelineLegRow({leg, expanded, onToggle}) {
    return (
        <View>
            {leg.name == "Walk" ?
                <View style={styles.legRow} onPress={onToggle} activeOpacity={0.7}>
                    <View style={styles.stopDotColumn}/>
                    <View style={styles.legBadge}>
                        <Text style={styles.legBadgeText}>{leg.name}</Text>
                    </View>
                    <View style={styles.legDirectionColumn}>
                        <View style={styles.legDirectionRow}>
                        </View>
                    </View>
                    <Text style={styles.legDuration}>{formatDuration(leg.plannedDeparture, leg.plannedArrival)}</Text>
                </View> : <TouchableOpacity style={styles.legRow} onPress={onToggle} activeOpacity={0.7}>
                    <View style={styles.stopDotColumn}/>
                    <View style={styles.legBadge}>
                        <Text style={styles.legBadgeText}>{leg.name}</Text>
                    </View>
                    <View style={styles.legDirectionColumn}>
                        <View style={styles.legDirectionRow}>

                            <MaterialIcons name="arrow-forward" size={24} color={TEXT_GRAY}/>
                            <Text style={styles.legDirectionText} numberOfLines={1}>
                                {leg.direction}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.legDuration}>{formatDuration(leg.plannedDeparture, leg.plannedArrival)}</Text>
                    <Text style={styles.legChevron}>{expanded ?
                        <MaterialIcons name="expand-less" size={24} color={TEXT_GRAY}/> :
                        <MaterialIcons name="expand-more" size={24} color={TEXT_GRAY}/>}</Text>
                </TouchableOpacity>
            }
            {expanded && leg.stops && leg.stops.length > 0 && (
                <View>
                    {leg.stops.map((stop, index) => (
                        <TimelineIntermediateStop key={index} stop={stop}/>
                    ))}
                </View>
            )}
        </View>
    );
}

/* -------------------------------------------------------------------------- */
/*  Timeline: full vertical timeline for all legs                            */

/* -------------------------------------------------------------------------- */

function TripTimeline({legs}) {
    const [expandedLegs, setExpandedLegs] = useState({});
    const toggleLeg = (index) => {
        setExpandedLegs((prev) => ({...prev, [index]: !prev[index]}));
    };
    return (
        <View style={styles.timelineContainer}>
            <View style={styles.timelineLine}/>

            {legs.map((leg, index) => {
                const isLast = index === legs.length - 1;
                return (
                    <React.Fragment key={index}>
                        <TimelineStopRow
                            time={formatTime(leg.plannedDeparture)}
                            realTime={formatRealTime(leg.plannedDeparture, leg.departureDelay)}
                            name={leg.originName}
                            platform={leg.plannedDeparturePlatform}
                        />
                        <TimelineLegRow
                            leg={leg}
                            expanded={!!expandedLegs[index]}
                            onToggle={() => toggleLeg(index)}
                        />

                        {isLast && (
                            <TimelineStopRow
                                time={formatTime(leg.plannedArrival)}
                                realTime={formatRealTime(leg.plannedArrival, leg.arrivalDelay)}
                                name={leg.destinationName}
                                platform={leg.plannedArrivalPlatform}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </View>
    );
}

/* -------------------------------------------------------------------------- */
/*  Main screen                                                              */
/* -------------------------------------------------------------------------- */

export default function TripDetailScreen({route},onAlarm) {
    const [showAlarm, setShowAlarm] = useState(false);
    const {trip,token} = route.params;
    const legs = trip?.legs || [];
    if (legs.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No trip data</Text>
            </View>
        );
    }
    const tripStations = [
        ...legs.map((leg) => leg.originName),
        legs[legs.length - 1].destinationName,
    ];

    return (
        <View style={styles.screen}>
            <TripSummary legs={legs}/>
            <LineOverview legs={legs}/>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ActionButtons setShownAlarm={setShowAlarm} token={token}/>
                <TripTimeline legs={legs}/>
            </ScrollView>
            <AlarmModal
                visible={showAlarm}
                onClose={() => setShowAlarm(false)}
                onConfirm={(alarmConfig) => {
                    onAlarm?.(alarmConfig);
                }}
                stations={tripStations}
                initialStation={legs[legs.length - 1].destinationName}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: TEXT_GRAY,
    },

    /* Header */
    header: {
        backgroundColor: RED,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingTop: Platform.OS === 'android' ? 18 : 8,
        paddingBottom: 18,
    },
    headerAction: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerActionIcon: {
        color: '#FFFFFF',
        fontSize: 18,
        marginRight: 6,
    },
    headerActionLabel: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
    },
    headerRefreshIcon: {
        color: '#FFFFFF',
        fontSize: 22,
    },

    /* Summary */
    summaryRow: {
        paddingHorizontal: 18,
        paddingTop: 18,
    },
    summaryTimeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    summaryTime: {
        fontSize: 22,
        fontWeight: '700',
        color: TEXT_DARK,
    },
    summaryArrow: {
        fontSize: 20,
        fontWeight: '600',
        color: TEXT_DARK,
    },
    summarySubTimeRow: {
        flexDirection: 'row',
        marginTop: 2,
    },
    summarySubTime: {
        fontSize: 13,
        fontWeight: '600',
        color: GREEN,
        width: 56,
    },
    summarySubTimeSpacer: {
        width: 24,
    },

    /* Line overview */
    overviewContainer: {
        paddingHorizontal: 18,
        borderColor: BORDER,
        paddingTop: 22,
        paddingBottom: 7,
        borderBottomWidth: 1,
    },
    overviewLineRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    overviewBadge: {
        backgroundColor: LINE_BLUE,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        zIndex: 2,
    },
    overviewBadgeText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 13,
    },
    overviewConnector: {
        height: 3,
        backgroundColor: LINE_BLUE,
        flex: 1,
        marginHorizontal: -2,
    },
    overviewEndDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: LINE_BLUE,
        marginLeft: -2,
    },
    overviewLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    overviewLabel: {
        fontSize: 12,
        color: TEXT_MID_GRAY,
        flex: 1,
        marginRight: 6,
    },

    /* Action buttons */
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 5,
        marginTop: 5,
        borderBottomWidth: 1,
        borderColor: BORDER,
    },
    actionButton: {
        alignItems: 'center',
    },
    actionCircle: {
        width: 32,
        height: 32,
        borderRadius: 23,
        backgroundColor: RED,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionIcon: {
        fontSize: 20,
    },
    actionLabel: {
        fontSize: 13,
        color: TEXT_DARK,
        marginTop: 6,
    },

    /* Timeline */
    timelineContainer: {
        paddingHorizontal: 18,
        marginTop: 8,
    },
    timelineLine: {
        position: 'absolute',
        left: 24,
        top: 6,
        bottom: 6,
        width: 3,
        backgroundColor: LINE_BLUE,
    },
    stopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
    },
    stopDotColumn: {
        width: 14,
        alignItems: 'center',
    },
    stopDotBlue: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: LINE_BLUE,
    },
    stopDotBlack: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: TEXT_DARK,
    },
    stopTimeColumn: {
        width: 56,
        marginLeft: 14,
    },
    stopTime: {
        fontSize: 14,
        color: TEXT_DARK,
    },
    stopTimeBold: {
        fontSize: 16,
        fontWeight: '700',
        color: TEXT_DARK,
    },
    stopRealTime: {
        fontSize: 12,
        fontWeight: '600',
        color: GREEN,
        marginTop: 1,
    },
    stopName: {
        flex: 1,
        fontSize: 14,
        color: TEXT_DARK,
    },
    stopNameBold: {
        flex: 1,
        fontSize: 16,
        fontWeight: '700',
        color: TEXT_DARK,
    },
    stopNameMinor: {
        flex: 1,
        fontSize: 14,
        color: TEXT_GRAY,
    },
    stopPlatform: {
        fontSize: 16,
        color: TEXT_GRAY,
        marginLeft: 8,
    },

    /* Expandable leg row */
    legRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
    },
    legBadge: {
        backgroundColor: LINE_BLUE,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginLeft: 14,
    },
    legBadgeText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 13,
    },
    legDirectionColumn: {
        flex: 1,
        marginLeft: 10,
    },
    legDirectionRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legArrow: {
        fontSize: 14,
        color: TEXT_GRAY,
        marginRight: 4,
    },
    legDirectionText: {
        fontSize: 14,
        color: TEXT_GRAY,
        flexShrink: 1,
    },
    legDuration: {
        fontSize: 13,
        color: TEXT_GRAY,
    },
    legChevron: {
        fontSize: 16,
        color: TEXT_GRAY,
        marginLeft: 8,
    },

    /* Intermediate stop */
    intermediateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
    },
});