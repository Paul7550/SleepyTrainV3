import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    StyleSheet
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RouteInputCard({ fromValue, setFromValue, toValue, setToValue, date, setDate }) {
    const [showPicker, setShowPicker] = useState(false);

    const handleSwap = () => {
        setFromValue(toValue);
        setToValue(fromValue);
    };

    const handleDateChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShowPicker(false);
        }
        if (selectedDate) {
            setDate(selectedDate);
        }
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
                        <View style={styles.inputBox}>
                            <TextInput
                                style={styles.input}
                                placeholder="From"
                                placeholderTextColor="#9A9A9E"
                                value={fromValue}
                                onChangeText={setFromValue}
                            />
                        </View>
                    </View>

                    <View style={styles.connectorRow}>
                        <Text style={styles.arrow}>↓</Text>
                    </View>

                    <View style={styles.fieldRow}>
                        <View style={[styles.badge, styles.badgeGray]}>
                            <Text style={styles.badgeText}>B</Text>
                        </View>
                        <View style={styles.inputBox}>
                            <TextInput
                                style={styles.input}
                                placeholder="To"
                                placeholderTextColor="#9A9A9E"
                                value={toValue}
                                onChangeText={setToValue}
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.swapButton}
                    onPress={handleSwap}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Text style={styles.swapIcon}>⇅</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.valueBox}
                activeOpacity={0.7}
                onPress={() => setShowPicker(true)}
            >
                <Text style={date ? styles.valueText : styles.valuePlaceholder}>{formattedValue}</Text>
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

    /* Route input */
    inputContainer: {
        paddingHorizontal: 18,
        paddingTop: 18,
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
        height: 24,
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
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 12,
        marginLeft: 36,
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
