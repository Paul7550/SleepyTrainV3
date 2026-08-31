import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
} from 'react-native';
import AlarmCard from '../components/AlarmCard';
import {MaterialIcons} from "@expo/vector-icons";
import {getAlarm, getJourneys, removeAlarm} from "../Saver";


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

    const fetchTrips = async () => {
        try {
            const savedAlarms = await getAlarm();
            console.log(savedAlarms)
            const query = savedAlarms
                .map(alarm => `refreshTokens=${encodeURIComponent(alarm.token)}&stopIds=${alarm.stopId}`)
                .join('&');
            const response = await fetch(`${API_BASE_URL}/checkForDelay/?${query}`, {
                method: 'GET',
            });
            if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
            const data = await response.json();
            console.log(data);
            let alarm = [];
            for(let i = 0; i < savedAlarms.length; i++) {
                alarm.push({
                    "station": data.alarms[i].station,
                    "active": savedAlarms[i].active,
                    "token": savedAlarms[i].token,
                    "sound": savedAlarms[i].ringTone,
                    "triggerAt": data.alarms[i].arrivalTime,
                    "delay": data.alarms[i].delay,
                    "timeBevorStop":savedAlarms[i].timeBevorStop
                })
            }
            setAlarms(alarm);
        } catch (e) {
            console.error(e)
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

            {alarms.length === 0 ? (
                <View style={styles.centerContent}>
                    <MaterialIcons name={"alarm"} style={styles.emptyIcon}></MaterialIcons>
                    <Text style={styles.emptyTitle}>No alarms yet</Text>
                    <Text style={styles.emptySubtitle}>
                        Set an alarm from a trip's detail screen and it will show up here.
                    </Text>
                </View>
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

const TEXT_DARK = '#1A1A1A';
const TEXT_GRAY = '#8A8A8E';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: TEXT_DARK,
    },
    subtitle: {
        fontSize: 14,
        color: TEXT_GRAY,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 32,
    },
    separator: {
        height: 14,
    },
    centerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    emptyIcon: {
        fontSize: 40,
        marginBottom: 12,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: TEXT_DARK,
        marginBottom: 6,
    },
    emptySubtitle: {
        fontSize: 14,
        color: TEXT_GRAY,
        textAlign: 'center',
        lineHeight: 20,
    },
});