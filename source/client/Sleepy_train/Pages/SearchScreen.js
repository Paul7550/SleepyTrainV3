import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import JourneyCard from '../components/JourneyCard';
import RouteInputCard from '../components/RouteInputCard';

export default function SearchScreen({
    results,
    destination,
    setDestination,
    origin,
    setOrigin,
    fromValue,
    setFromValue,
    toValue,
    setToValue,
    date,
    setDate,
    handleSearch,
    loadEarlierConnections,
    loadLaterConnections,
}) {
    return (
        <>
            <View style={styles.content}>
                <RouteInputCard
                    setDestination={setDestination}
                    destination={destination}
                    setOrigin={setOrigin}
                    origin={origin}
                    fromValue={fromValue}
                    setFromValue={setFromValue}
                    toValue={toValue}
                    setToValue={setToValue}
                    date={date}
                    setDate={setDate}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch} activeOpacity={0.85}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
                <ScrollView style={styles.resultsList} contentContainerStyle={styles.resultsListContent}>
                    {results.map((result, index) => (
                        <JourneyCard {...result} key={index} />
                    ))}
                </ScrollView>
            </View>

            <View style={styles.pagination}>
                <TouchableOpacity
                    style={styles.pageButton}
                    onPress={() => loadEarlierConnections()}
                >
                    <Text style={styles.pageButtonText}>← Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.pageButton}
                    onPress={() => loadLaterConnections()}
                >
                    <Text style={styles.pageButtonText}>Next →</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const RED = '#E8352B';
const BORDER = '#E4E4E7';
const TEXT_DARK = '#1A1A1A';

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    resultsList: {
        flex: 1,
        paddingHorizontal: 18,
        marginTop: 18,
    },
    resultsListContent: {
        paddingBottom: 24,
    },
    searchButton: {
        backgroundColor: RED,
        marginHorizontal: 18,
        marginTop: 10,
        borderRadius: 14,
        paddingVertical: 12,
        alignItems: 'center',
    },
    searchButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },
    pagination: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: BORDER,
    },
    pageButton: {
        paddingVertical: 6,
    },
    pageButtonText: {
        fontSize: 16,
        color: TEXT_DARK,
        fontWeight: '500',
    },
});
