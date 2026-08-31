import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {MaterialIcons} from '@expo/vector-icons';
import AlarmModal from "../components/Alarmmodal";
import {checkJourneys, saveAlarm, saveJourneys} from "../Saver";
import { EmptyState } from '../components/StateViews';
import { colors, radius, screenPadding, space, type, weight } from '../theme';


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

function setAlarm(config,token) {
    const time = `${config.hours}:${config.minutes}:${config.seconds}`;
    saveAlarm(token,config.station.tripStationId,time,config.sound)
}

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
                    <MaterialIcons name="arrow-forward" size={24} color={colors.textPrimary}/>
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
    const [saved, setSaved] = useState(false);

    const savedIcon = saved ? 'bookmark-added' : 'bookmark-add';

    useEffect(() => {
        let isMounted = true;
        checkJourneys(token).then((isSaved) => {
            if (isMounted) setSaved(isSaved);
        });
        return () => { isMounted = false; };
    }, [token]);

    const save = async () => {
        await saveJourneys(token);
        setSaved((prev) => !prev);
    };

    return (
        <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionButton} onPress={()=>setShownAlarm(true)} activeOpacity={0.75} accessibilityRole="button" accessibilityLabel="Set an alarm for this trip">
                <View style={styles.actionCircle}>
                    <Text style={styles.actionIcon}><MaterialIcons name="alarm" size={24} color={colors.textOnBrand}/></Text>
                </View>
                <Text style={styles.actionLabel}>Alarm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={()=>save()} activeOpacity={0.75} accessibilityRole="button" accessibilityLabel={saved ? 'Remove trip from saved' : 'Save this trip'}>
                <View style={styles.actionCircle}>
                    <Text style={styles.actionIcon}><MaterialIcons name={savedIcon} size={24} color={colors.textOnBrand}/></Text>
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

                            <MaterialIcons name="arrow-forward" size={24} color={colors.textSecondary}/>
                            <Text style={styles.legDirectionText} numberOfLines={1}>
                                {leg.direction}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.legDuration}>{formatDuration(leg.plannedDeparture, leg.plannedArrival)}</Text>
                    <Text style={styles.legChevron}>{expanded ?
                        <MaterialIcons name="expand-less" size={24} color={colors.textSecondary}/> :
                        <MaterialIcons name="expand-more" size={24} color={colors.textSecondary}/>}</Text>
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
            <EmptyState
                icon="train"
                title="No trip data"
                subtitle="This connection could not be loaded."
            />
        );
    }
    const result = [];
    legs.forEach(leg => {
        result.push({
            tripStation: leg.originName,
            tripStationId: leg.originId
        });

        leg.stops.forEach(stop => {
            result.push({
                tripStation: stop.name,
                tripStationId: stop.id
            });
        });
    });

    const lastLeg = legs[legs.length - 1];
    result.push({
        tripStation: lastLeg.direction,
        tripStationId: lastLeg.destinationId
    });
    return (
        <SafeAreaView style={styles.screen} edges={['bottom']}>
            <TripSummary legs={legs}/>
            <LineOverview legs={legs}/>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ActionButtons setShownAlarm={setShowAlarm} token={token}/>
                <TripTimeline legs={legs}/>
            </ScrollView>
            <AlarmModal
                visible={showAlarm}
                onClose={() => setShowAlarm(false)}
                onConfirm={(config) => {setAlarm(config,token)}}
                stations={result}
                initialStation={legs[legs.length - 1].destinationName}
            />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    scrollContent: {
        paddingBottom: space.max,
    },

    /* Summary */
    summaryRow: {
        paddingHorizontal: screenPadding,
        paddingTop: space.xl,
    },
    summaryTimeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    summaryTime: {
        fontSize: type.subdisplay,
        fontWeight: weight.bold,
        color: colors.textPrimary,
    },
    summarySubTimeRow: {
        flexDirection: 'row',
        marginTop: 2,
    },
    summarySubTime: {
        fontSize: type.small,
        fontWeight: weight.semibold,
        color: colors.success,
        width: 56,
    },
    summarySubTimeSpacer: {
        width: space.xxxl,
    },

    /* Line overview */
    overviewContainer: {
        paddingHorizontal: screenPadding,
        borderColor: colors.border,
        paddingTop: space.xxl,
        paddingBottom: space.sm,
        borderBottomWidth: 1,
    },
    overviewLineRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    overviewBadge: {
        backgroundColor: colors.routeLine,
        borderRadius: radius.sm,
        paddingHorizontal: space.sm,
        paddingVertical: space.xs,
        zIndex: 2,
    },
    overviewBadgeText: {
        color: colors.textOnBrand,
        fontWeight: weight.bold,
        fontSize: type.small,
    },
    overviewConnector: {
        height: 3,
        backgroundColor: colors.routeLine,
        flex: 1,
        marginHorizontal: -2,
    },
    overviewEndDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.routeLine,
        marginLeft: -2,
    },

    /* Action buttons */
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: space.xs,
        marginTop: space.xs,
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    actionButton: {
        alignItems: 'center',
    },
    actionCircle: {
        width: 32,
        height: 32,
        borderRadius: radius.lg,
        backgroundColor: colors.brand,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionIcon: {
        fontSize: type.heading,
    },
    actionLabel: {
        fontSize: type.small,
        color: colors.textPrimary,
        marginTop: space.sm,
    },

    /* Timeline */
    timelineContainer: {
        paddingHorizontal: screenPadding,
        marginTop: space.sm,
    },
    timelineLine: {
        position: 'absolute',
        left: 24,
        top: 6,
        bottom: 6,
        width: 3,
        backgroundColor: colors.routeLine,
    },
    stopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: space.base,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    stopDotColumn: {
        width: 14,
        alignItems: 'center',
    },
    stopDotBlue: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.routeLine,
    },
    stopDotBlack: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.textPrimary,
    },
    stopTimeColumn: {
        width: 56,
        marginLeft: space.base,
    },
    stopTime: {
        fontSize: type.small,
        color: colors.textPrimary,
    },
    stopTimeBold: {
        fontSize: type.body,
        fontWeight: weight.bold,
        color: colors.textPrimary,
    },
    stopRealTime: {
        fontSize: type.caption,
        fontWeight: weight.semibold,
        color: colors.success,
        marginTop: 1,
    },
    stopName: {
        flex: 1,
        fontSize: type.small,
        color: colors.textPrimary,
    },
    stopNameBold: {
        flex: 1,
        fontSize: type.body,
        fontWeight: weight.bold,
        color: colors.textPrimary,
    },
    stopNameMinor: {
        flex: 1,
        fontSize: type.small,
        color: colors.textSecondary,
    },
    // Secondary datum, so it must not outrank the stop name beside it.
    stopPlatform: {
        fontSize: type.small,
        color: colors.textSecondary,
        marginLeft: space.sm,
    },

    /* Expandable leg row */
    legRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: space.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    legBadge: {
        backgroundColor: colors.routeLine,
        borderRadius: radius.sm,
        paddingHorizontal: space.sm,
        paddingVertical: space.xs,
        marginLeft: space.base,
    },
    legBadgeText: {
        color: colors.textOnBrand,
        fontWeight: weight.bold,
        fontSize: type.small,
    },
    legDirectionColumn: {
        flex: 1,
        marginLeft: space.md,
    },
    legDirectionRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legDirectionText: {
        fontSize: type.small,
        color: colors.textSecondary,
        flexShrink: 1,
    },
    legDuration: {
        fontSize: type.small,
        color: colors.textSecondary,
    },
    legChevron: {
        fontSize: type.body,
        color: colors.textSecondary,
        marginLeft: space.sm,
    },

    /* Intermediate stop */
    intermediateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: space.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
});
