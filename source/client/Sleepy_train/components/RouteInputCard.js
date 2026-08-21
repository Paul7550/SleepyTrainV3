import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    StyleSheet, Modal, FlatList, SafeAreaView
} from 'react-native';
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';
import {MaterialIcons} from "@expo/vector-icons";
const LOCATIONS_API_URL = 'http://172.20.10.2:3000/api/locations?location=';
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
                    <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Text style={styles.modalCancel}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Search station</Text>
                    <View style={styles.modalCancelSpacer} />
                </View>

                <View style={styles.modalSearchBox}>
                    <TextInput
                        style={styles.modalSearchInput}
                        placeholder="Search"
                        placeholderTextColor="#9A9A9E"
                        value={query}
                        onChangeText={setQuery}
                        autoFocus
                    />
                </View>

                {loading && <Text style={styles.modalStatusText}>Loading…</Text>}
                {error && <Text style={styles.modalStatusText}>Error: {error}</Text>}

                <FlatList
                    data={stationsByDistance}
                    keyExtractor={(item) => item.id}
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
                        <MaterialIcons name={"arrow-downward"} size={20} color={TEXT_DARK} />
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
                >
                    <MaterialIcons name={"swap-vert"} size={28} color={GRAY} />
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
                    value={date || new Date()}
                    mode="datetime"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onValueChange={handleDateChange}
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
const RED = '#E8352B';
const BLUE = '#2F6FED';
const LINE_BLUE = '#2F5FC7';
const GREEN = '#2E9B4F';
const GRAY = '#9A9A9E';
const BORDER = '#E4E4E7';
const TEXT_DARK = '#1A1A1A';
const TEXT_GRAY = '#8A8A8E';

const styles = StyleSheet.create({
    modalStatusText: {
        fontSize: 14,
        color: TEXT_GRAY,
        paddingHorizontal: 18,
        paddingTop: 14,
    },
    inputPlaceholder: {
        fontSize: 16,
        color: '#9A9A9E',
        padding: 0,
    },

    /* Station search modal */
    modalContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    modalHeader: {
        backgroundColor:RED,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
    },
    modalCancel: {
        fontSize: 16,
        color: BLUE,
    },
    modalCancelSpacer: {
        width: 50,
    },
    modalTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    modalSearchBox: {
        marginHorizontal: 18,
        marginTop: 14,
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    modalSearchInput: {
        fontSize: 16,
        color: TEXT_DARK,
        padding: 0,
    },
    modalResultRow: {
        paddingHorizontal: 18,
        paddingVertical: 16,
    },
    modalResultText: {
        fontSize: 16,
        color: TEXT_DARK,
    },
    modalSeparator: {
        height: 1,
        backgroundColor: BORDER,
        marginLeft: 18,
    },
    /* Route input */
    inputContainer: {
        paddingHorizontal: 18,
        paddingTop: 9,
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
        marginRight: 10,
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
    inputBox: {
        flex: 1,
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    input: {
        fontSize: 16,
        color: TEXT_DARK,
        padding: 0,
    },
    connectorRow: {
        flexDirection: 'row',
        height: 16,
    },
    connectorSpacer: {
        width: 13,
        alignItems: 'center',
    },
    arrow: {
        fontSize: 16,
        color: TEXT_DARK,
        marginLeft: 6,
    },
    swapButton: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    swapIcon: {
        fontSize: 22,
        color: GRAY,
        fontWeight: '600',
    },
    valueBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        maxWidth: 200,
    },
    valueText: {
        fontSize: 16,
        color: TEXT_DARK,
    },
    valuePlaceholder: {
        fontSize: 16,
        color: '#9A9A9E',
    },
    calendarIcon: {
        fontSize: 16,
        marginLeft: 12,
    },
    doneButton: {
        alignSelf: 'flex-end',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    doneButtonText: {
        color: BLUE,
        fontWeight: '600',
        fontSize: 15,
    },
});
