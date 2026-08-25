import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    FlatList,
    Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

/* -------------------------------------------------------------------------- */
/*  Generic option picker (used for both "Train Station" and "Timer Sound")  */
/* -------------------------------------------------------------------------- */

function OptionPickerModal({ visible, title, options, selected, onSelect, onClose }) {
    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
            <View style={styles.optionModalContainer}>
                <View style={styles.optionModalHeader}>
                    <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Text style={styles.optionModalCancel}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.optionModalTitle}>{title}</Text>
                    <View style={styles.optionModalCancelSpacer} />
                </View>

                <FlatList
                    data={options}
                    keyExtractor={(item, index) => (typeof item === 'string' ? item : item.id || String(index))}
                    renderItem={({ item }) => {
                        const label = typeof item === 'string' ? item : item.name;
                        const isSelected = label === selected;
                        return (
                            <TouchableOpacity
                                style={styles.optionRow}
                                onPress={() => {
                                    onSelect(label);
                                    onClose();
                                }}
                            >
                                <Text style={styles.optionRowText}>{label}</Text>
                                {isSelected && <Text style={styles.optionRowCheck}>✓</Text>}
                            </TouchableOpacity>
                        );
                    }}
                    ItemSeparatorComponent={() => <View style={styles.optionSeparator} />}
                />
            </View>
        </Modal>
    );
}

/* -------------------------------------------------------------------------- */
/*  Time wheel picker (hours / min / sec)                                    */
/* -------------------------------------------------------------------------- */

function range(n) {
    return Array.from({ length: n }, (_, i) => i);
}

function TimeWheelPicker({ hours, minutes, seconds, onChangeHours, onChangeMinutes, onChangeSeconds }) {
    return (
        <View style={styles.wheelRow}>
            <View style={styles.wheelColumn}>
                <Picker
                    selectedValue={hours}
                    onValueChange={onChangeHours}
                    itemStyle={styles.wheelItem}
                    style={styles.wheel}
                >
                    {range(24).map((h) => (
                        <Picker.Item key={h} label={`${h}`} value={h} />
                    ))}
                </Picker>
            </View>

            <View style={styles.wheelColumn}>
                <Picker
                    selectedValue={minutes}
                    onValueChange={onChangeMinutes}
                    itemStyle={styles.wheelItem}
                    style={styles.wheel}
                >
                    {range(60).map((m) => (
                        <Picker.Item key={m} label={`${m}`} value={m} />
                    ))}
                </Picker>
            </View>

            <View style={styles.wheelColumn}>
                <Picker
                    selectedValue={seconds}
                    onValueChange={onChangeSeconds}
                    itemStyle={styles.wheelItem}
                    style={styles.wheel}
                >
                    {range(60).map((s) => (
                        <Picker.Item key={s} label={`${s}`} value={s} />
                    ))}
                </Picker>
            </View>
        </View>
    );
}

/* -------------------------------------------------------------------------- */
/*  Main Alarm modal                                                         */
/* -------------------------------------------------------------------------- */

/**
 * AlarmModal
 *
 * Props:
 *  - visible: boolean
 *  - onClose: () => void
 *  - onConfirm: ({ hours, minutes, seconds, station, sound }) => void
 *  - stations: array of strings (or {name, id} objects) — selectable train stations
 *  - sounds: array of strings — selectable timer sounds
 *  - initialStation, initialSound: optional preselected values
 *
 * npm install @react-native-picker/picker
 */
export default function AlarmModal({
                                       visible,
                                       onClose,
                                       onConfirm,
                                       stations = [],
                                       sounds = ['Radar', 'Chimes', 'Signal', 'Wave'],
                                       initialStation,
                                       initialSound,
                                   }) {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(45);
    const [seconds, setSeconds] = useState(30);
    const [station, setStation] = useState(initialStation || stations[0] || '');
    const [sound, setSound] = useState(initialSound || sounds[0] || '');

    const [showStationPicker, setShowStationPicker] = useState(false);
    const [showSoundPicker, setShowSoundPicker] = useState(false);

    const handleConfirm = () => {
        onConfirm?.({ hours, minutes, seconds, station, sound });
        onClose();
    };

    return (
        <Modal visible={visible} animationType="none" transparent onRequestClose={onClose}>
            <View style={styles.backdrop} >
                <View style={styles.sheet}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Alarm</Text>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={handleConfirm}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Text style={styles.confirmIcon}>✓</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Time wheel */}
                    <TimeWheelPicker
                        hours={hours}
                        minutes={minutes}
                        seconds={seconds}
                        onChangeHours={setHours}
                        onChangeMinutes={setMinutes}
                        onChangeSeconds={setSeconds}
                    />

                    {/* Settings rows */}
                    <View style={styles.settingsList}>
                        <TouchableOpacity
                            style={styles.settingRow}
                            onPress={() => setShowStationPicker(true)}
                            activeOpacity={0.6}
                        >
                            <Text style={styles.settingLabel}>Train Station</Text>
                            <View style={styles.settingValueRow}>
                                <Text style={styles.settingValue}>{station}</Text>
                                <Text style={styles.settingChevron}>›</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.settingRow}
                            onPress={() => setShowSoundPicker(true)}
                            activeOpacity={0.6}
                        >
                            <Text style={styles.settingLabel}>Timer Sound</Text>
                            <View style={styles.settingValueRow}>
                                <Text style={styles.settingValue}>{sound}</Text>
                                <Text style={styles.settingChevron}>›</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <OptionPickerModal
                visible={showStationPicker}
                title="Train Station"
                options={stations}
                selected={station}
                onSelect={setStation}
                onClose={() => setShowStationPicker(false)}
            />

            <OptionPickerModal
                visible={showSoundPicker}
                title="Timer Sound"
                options={sounds}
                selected={sound}
                onSelect={setSound}
                onClose={() => setShowSoundPicker(false)}
            />
        </Modal>
    );
}

/* -------------------------------------------------------------------------- */
/*  Styles                                                                    */
/* -------------------------------------------------------------------------- */

const RED = '#E8352B';
const BORDER = '#E4E4E7';
const TEXT_DARK = '#1A1A1A';
const TEXT_GRAY = '#8A8A8E';

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor:'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    },

    /* Header */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: TEXT_DARK,
    },
    confirmButton: {
        position: 'absolute',
        right: 0,
        top: -6,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: RED,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmIcon: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },

    /* Time wheel */
    wheelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10
    },
    wheelColumn: {
        flex: 1,
        alignItems: 'center',
    },
    wheel: {
        width: '100%',
        height: Platform.OS === 'ios' ? 160 : 50,
    },
    wheelItem: {
        fontSize: 22,
        color: TEXT_DARK,
    },
    wheelUnitLabel: {
        fontSize: 13,
        color: TEXT_GRAY,
        marginTop: -8,
    },

    /* Settings rows */
    settingsList: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: BORDER,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
    },
    settingLabel: {
        fontSize: 16,
        color: TEXT_DARK,
    },
    settingValueRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingValue: {
        fontSize: 16,
        color: TEXT_GRAY,
        marginRight: 4,
    },
    settingChevron: {
        fontSize: 18,
        color: TEXT_GRAY,
    },

    /* Option picker modal (Train Station / Timer Sound) */
    optionModalContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    optionModalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
    },
    optionModalCancel: {
        fontSize: 16,
        color: RED,
    },
    optionModalCancelSpacer: {
        width: 50,
    },
    optionModalTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: TEXT_DARK,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingVertical: 16,
    },
    optionRowText: {
        fontSize: 16,
        color: TEXT_DARK,
    },
    optionRowCheck: {
        fontSize: 16,
        color: RED,
        fontWeight: '700',
    },
    optionSeparator: {
        height: 1,
        backgroundColor: BORDER,
        marginLeft: 18,
    },
});