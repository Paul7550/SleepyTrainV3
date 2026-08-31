import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    StyleSheet, Modal, FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';
import {MaterialIcons} from "@expo/vector-icons";
import { LoadingState, EmptyState, ErrorState } from './StateViews';
import { colors, radius, screenPadding, space, type, weight } from '../theme';
const LOCATIONS_API_URL = `${process.env.EXPO_PUBLIC_API_URL}/locations?location=`;
function StationSearchModal({ visible, onClose, onSelect, initialValue }) {
    const [query, setQuery] = useState('');
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (!visible) return;
        let isCancelled = false;
        const searchValue = query.trim();
        const locationParam = searchValue ? encodeURIComponent(searchValue) : '%20';
        setLoading(true);
        setError(null);
        fetch(`${LOCATIONS_API_URL}${locationParam}`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                if (isCancelled) return;
                setStations(data.locs || []);
            })
            .catch((err) => {
                if (isCancelled || err.name === 'AbortError') return;
                setError(err.message);
            })
            .finally(() => {
                if (!isCancelled) setLoading(false);
            });
        async function getCurrentLocation() {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        }

        getCurrentLocation();

        return () => {
            isCancelled = true;
        };

    }, [visible, query]);

    const filtered = stations.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase())
    );
    const getDistance = (stationLocation) => {
        if (!location?.coords || !stationLocation) {
            return null;
        }
        const R = 6371;
        const dLat = (stationLocation.latitude - location.coords.latitude) * Math.PI / 180;
        const dLon = (stationLocation.longitude - location.coords.longitude) * Math.PI / 180;

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(location.coords.latitude * Math.PI / 180) * Math.cos(stationLocation.latitude * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return (R * c).toFixed(2);
    };
    const stationsByDistance = [...filtered].sort((a, b) => {
        const distanceA = getDistance(a.location);
        const distanceB = getDistance(b.location);

        if (distanceA === null && distanceB === null) return 0;
        if (distanceA === null) return 1;
        if (distanceB === null) return -1;

        return (distanceA - distanceB).toFixed(2);
    });

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <TouchableOpacity
                        onPress={onClose}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        accessibilityRole="button"
                        accessibilityLabel="Cancel"
                    >
                        <Text style={styles.modalCancel}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Search station</Text>
                    <View style={styles.modalCancelSpacer} />
                </View>

                <View style={styles.modalSearchBox}>
                    <TextInput
                        style={styles.modalSearchInput}
                        placeholder="Search"
                        placeholderTextColor={colors.textSecondary}
                        value={query}
                        onChangeText={setQuery}
                        autoFocus
                    />
                </View>

                <FlatList
                    data={loading || error ? [] : stationsByDistance}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.modalListContent}
                    ListEmptyComponent={
                        loading ? (
                            <LoadingState />
                        ) : error ? (
                            <ErrorState title="Couldn't load stations" />
                        ) : (
                            <EmptyState
                                icon="search-off"
                                title="No stations found"
                                subtitle="Try a different search term."
                            />
                        )
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.modalResultRow}
                            onPress={() => {
                                onSelect(item);
                                setQuery('');
                                onClose();
                            }}
                        >
                            <Text style={styles.modalResultText}>{item.name}</Text>
                            <Text style={styles.modalResultLocation}>
                                {item.location ?  getDistance(item.location)+ " km" : 'No location available'}
                            </Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.modalSeparator} />}
                />
            </SafeAreaView>
        </Modal>
    );
}
export default function RouteInputCard({setOrigin,setDestination,destination,origin, fromValue, setFromValue, toValue, setToValue, date, setDate }) {
    const [showPicker, setShowPicker] = useState(false);
    const [activeField, setActiveField] = useState(null);

    const handleSwap = () => {
        setFromValue(toValue);
        setToValue(fromValue);
        setOrigin(destination);
        setDestination(origin);
    };

    const handleDateChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShowPicker(false);
        }
        console.log(selectedDate);
        setDate(new Date(selectedDate));
    };

    const formattedValue = date
        ? date.toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        : 'Value';

    return (
        <View style={styles.inputContainer}>
            <View style={styles.row}>
                <View style={styles.fieldsColumn}>
                    <View style={styles.fieldRow}>
                        <View style={[styles.badge, styles.badgeRed]}>
                            <Text style={styles.badgeText}>A</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.inputBox}
                            activeOpacity={0.7}
                            onPress={() => setActiveField('from')}
                        >
                            <Text style={fromValue ? styles.input : styles.inputPlaceholder}>
                                {fromValue || 'From'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.connectorRow}>
                        <MaterialIcons name={"arrow-downward"} size={20} color={colors.textPrimary} />
                    </View>

                    <View style={styles.fieldRow}>
                        <View style={[styles.badge, styles.badgeGray]}>
                            <Text style={styles.badgeText}>B</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.inputBox}
                            activeOpacity={0.7}
                            onPress={() => setActiveField('to')}
                        >
                            <Text style={toValue ? styles.input : styles.inputPlaceholder}>
                                {toValue || 'To'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.swapButton}
                    onPress={handleSwap}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    accessibilityRole="button"
                    accessibilityLabel="Swap origin and destination"
                >
                    <MaterialIcons name={"swap-vert"} size={28} color={colors.textSecondary} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.valueBox}
                activeOpacity={0.7}
                onPress={() => setShowPicker(true)}
            >
                <Text style={date ? styles.valueText : styles.valuePlaceholder}>Dep. {formattedValue}</Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="datetime"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                />
            )}

            {Platform.OS === 'ios' && showPicker && (
                <TouchableOpacity style={styles.doneButton} onPress={() => setShowPicker(false)}>
                    <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
            )}
            <StationSearchModal
                visible={activeField !== null}
                onClose={() => setActiveField(null)}
                onSelect={(value) => {
                    if (activeField === 'from'){setFromValue(value.name);setOrigin(value.id);}
                    if (activeField === 'to') {setToValue(value.name);setDestination(value.id);}
                }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    inputPlaceholder: {
        fontSize: type.body,
        color: colors.textSecondary,
        padding: 0,
    },

    /* Station search modal -- chrome matches the option pickers in Alarmmodal */
    modalContainer: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: screenPadding,
        paddingVertical: space.base,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    modalCancel: {
        fontSize: type.body,
        color: colors.brand,
    },
    modalCancelSpacer: {
        width: 50,
    },
    modalTitle: {
        fontSize: type.body,
        fontWeight: weight.bold,
        color: colors.textPrimary,
    },
    modalSearchBox: {
        marginHorizontal: screenPadding,
        marginTop: space.base,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.md,
        paddingHorizontal: space.lg,
        paddingVertical: space.md,
    },
    modalSearchInput: {
        fontSize: type.body,
        color: colors.textPrimary,
        padding: 0,
    },
    modalListContent: {
        flexGrow: 1,
    },
    modalResultRow: {
        paddingHorizontal: screenPadding,
        paddingVertical: space.lg,
    },
    modalResultText: {
        fontSize: type.body,
        color: colors.textPrimary,
    },
    modalResultLocation: {
        fontSize: type.small,
        color: colors.textSecondary,
        marginTop: space.xs,
    },
    modalSeparator: {
        height: 1,
        backgroundColor: colors.border,
        marginLeft: screenPadding,
    },

    /* Route input */
    inputContainer: {
        paddingHorizontal: screenPadding,
        paddingTop: space.sm,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fieldsColumn: {
        flex: 1,
    },
    fieldRow: {
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
    inputBox: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.md,
        paddingHorizontal: space.lg,
        paddingVertical: space.md,
    },
    input: {
        fontSize: type.body,
        color: colors.textPrimary,
        padding: 0,
    },
    connectorRow: {
        flexDirection: 'row',
        height: space.lg,
    },
    swapButton: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: space.md,
    },
    valueBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: space.md,
        maxWidth: 200,
    },
    valueText: {
        fontSize: type.body,
        color: colors.textPrimary,
    },
    valuePlaceholder: {
        fontSize: type.body,
        color: colors.textSecondary,
    },
    doneButton: {
        alignSelf: 'flex-end',
        paddingVertical: space.sm,
        paddingHorizontal: space.lg,
    },
    doneButtonText: {
        color: colors.brand,
        fontWeight: weight.semibold,
        fontSize: type.body,
    },
});
