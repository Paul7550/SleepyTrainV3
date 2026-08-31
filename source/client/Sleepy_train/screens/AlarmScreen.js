import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AlarmCard from '../components/AlarmCard';
import {getAlarm, removeAlarm} from "../Saver";
import { LoadingState, EmptyState, ErrorState } from '../components/StateViews';
import { colors, screenPadding, space, type, weight } from '../theme';


const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;


/* -------------------------------------------------------------------------- */
/*  Example data                                                             */
/*                                                                            */
/*  alarm = {                                                                */
/*    id: string,                                                            */
/*    station: string,                                                       */
/*    triggerAt: string,   // ISO datetime the alarm fires                   */
/*    sound: string,                                                         */
/*    active: boolean,                                                       */
/*  }                                                                        */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*  Formatting helpers                                                       */
/* -------------------------------------------------------------------------- */

function formatTriggerTime(isoString) {
    const d = new Date(isoString);
    return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });
}

function formatTriggerDate(isoString) {
    const d = new Date(isoString);
    const today = new Date();
    const isToday = d.toDateString() === today.toDateString();
    if (isToday) return null; // omit the date badge for "today"
    return d.toLocaleDateString(undefined, { weekday: 'short', day: '2-digit', month: 'short' });
}

/* -------------------------------------------------------------------------- */
/*  Screen                                                                    */
/* -------------------------------------------------------------------------- */

export default function ActiveAlarmsScreen() {
    const [alarms, setAlarms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTrips = async () => {
        try {
            setError(null);
            const savedAlarms = await getAlarm();
            const query = savedAlarms
                .map(alarm => `refreshTokens=${encodeURIComponent(alarm.token)}&stopIds=${alarm.stopId}`)
                .join('&');
            const response = await fetch(`${API_BASE_URL}/checkForDelay/?${query}`, {
                method: 'GET',
            });
            if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
            const data = await response.json();
            let alarm = [];
            for(let i = 0; i < savedAlarms.length; i++) {
                const details = data.alarms[i];
                if (!details) continue;
                alarm.push({
                    "station": details.station,
                    "active": savedAlarms[i].active,
                    "token": savedAlarms[i].token,
                    "sound": savedAlarms[i].ringTone,
                    "triggerAt": details.arrivalTime,
                    "delay": details.delay,
                    "timeBevorStop":savedAlarms[i].timeBevorStop
                })
            }
            setAlarms(alarm);
        } catch (e) {
            console.error(e)
            setError(e.message)
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTrips();
    }, []);


    const handleToggle = (token, value) => {
        setAlarms((prev) => prev.map((a) => (a.token === token ? { ...a, active: value } : a)));
    };

    const handleDelete = (token) => {
        removeAlarm(token)
        setAlarms((prev) => prev.filter((a) => a.token !== token));
    };

    const activeCount = alarms.filter((a) => a.active).length;

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.titleRow}>
                <Text style={styles.title}>Alarms</Text>
                {alarms.length > 0 && (
                    <Text style={styles.subtitle}>
                        {activeCount} active {activeCount === 1 ? 'alarm' : 'alarms'}
                    </Text>
                )}
            </View>

            {loading ? (
                <LoadingState/>
            ) : error ? (
                <ErrorState title="Couldn't load your alarms"/>
            ) : alarms.length === 0 ? (
                <EmptyState
                    icon="alarm"
                    title="No alarms yet"
                    subtitle="Set an alarm from a trip's detail screen and it will show up here."
                />
            ) : (
                <FlatList
                    data={alarms}
                    keyExtractor={(item) => item.token}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <AlarmCard
                            station={item.station}
                            triggerTime={formatTriggerTime(item.triggerAt)}
                            triggerDate={formatTriggerDate(item.triggerAt)}
                            sound={item.sound}
                            active={item.active}
                            onToggle={(value) => handleToggle(item.token, value)}
                            onDelete={() => handleDelete(item.token)}
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        paddingHorizontal: screenPadding,
        paddingTop: space.lg,
        paddingBottom: space.sm,
    },
    title: {
        fontSize: type.display,
        fontWeight: weight.bold,
        color: colors.textPrimary,
    },
    subtitle: {
        fontSize: type.small,
        color: colors.textSecondary,
    },
    listContent: {
        paddingHorizontal: screenPadding,
        paddingTop: space.sm,
        paddingBottom: space.huge,
    },
    separator: {
        height: space.base,
    },
});
