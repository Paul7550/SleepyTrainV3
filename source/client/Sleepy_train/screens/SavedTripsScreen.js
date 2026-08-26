import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SavedTripCard from '../components/SavedTripCard';
import {getJourneys} from "../Saver";
import {MaterialIcons,MaterialCommunityIcons} from "@expo/vector-icons";

const API_BASE_URL = 'http://172.20.10.2:3000';


export default function SavedTripsScreen() {
    const navigation = useNavigation();

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const fetchTrips = async () => {
        try {
            setError(null);
            const tokens = await getJourneys()
            if (tokens.length === 0) {
                setTrips([]);
                return;
            }
            const query = tokens
                .map((token) => `refreshTokens=${encodeURIComponent(token)}`)
                .join('&');
            const response = await fetch(`${API_BASE_URL}/api/savedConnection/?${query}`, {
                method: 'GET',
            });
            if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
            const data = await response.json();
            setTrips(data.journeys || []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchTrips();
    };

    const handleSelectTrip = (trip,token) => {
        navigation.navigate('TripDetail', { trip,token });
    };

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.titleRow}>
                <Text style={styles.title}>Saved Trips</Text>
                {trips.length > 0 && (
                    <Text style={styles.subtitle}>
                        {trips.length} {trips.length === 1 ? 'trip' : 'trips'}
                    </Text>
                )}
            </View>

            {loading ? (
                <View style={styles.centerContent}>
                    <ActivityIndicator size="large" color="#E8352B" />
                </View>
            ) : error ? (
                <View style={styles.centerContent}>
                    <Text style={styles.errorIcon}>⚠️</Text>
                    <Text style={styles.errorTitle}>Couldn't load your trips</Text>
                    <Text style={styles.errorSubtitle}>{error}</Text>
                </View>
            ) : trips.length === 0 ? (
                <View style={styles.centerContent}>
                    <MaterialCommunityIcons name={"train-bus"} size={60}></MaterialCommunityIcons>
                    <Text style={styles.emptyTitle}>No saved trips yet</Text>
                    <Text style={styles.emptySubtitle}>
                        Trips you save from your search results will show up here.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={trips}
                    keyExtractor={(item, index) => item.token ?? item.refreshToken ?? String(index)}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <SavedTripCard
                            {...item}
                            handleSelectTrip={handleSelectTrip}
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#E8352B" />
                    }
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
    errorIcon: {
        fontSize: 32,
        marginBottom: 12,
    },
    errorTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: TEXT_DARK,
        marginBottom: 6,
    },
    errorSubtitle: {
        fontSize: 14,
        color: TEXT_GRAY,
        textAlign: 'center',
    },
});