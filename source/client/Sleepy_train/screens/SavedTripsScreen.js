import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SavedTripCard from '../components/SavedTripCard';
import {getJourneys} from "../Saver";
import { LoadingState, EmptyState, ErrorState } from '../components/StateViews';
import { colors, screenPadding, space, type, weight } from '../theme';

const API_BASE_URL =process.env.EXPO_PUBLIC_API_URL;


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
            const response = await fetch(`${API_BASE_URL}/savedConnection/?${query}`, {
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
                <LoadingState />
            ) : error ? (
                <ErrorState title="Couldn't load your trips" />
            ) : trips.length === 0 ? (
                <EmptyState
                    icon="bookmark-border"
                    title="No saved trips yet"
                    subtitle="Trips you save from your search results will show up here."
                />
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
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={colors.brand} />
                    }
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
