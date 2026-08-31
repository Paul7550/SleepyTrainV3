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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, space, type, weight } from '../theme';

/* -------------------------------------------------------------------------- */
/*  Generic option picker (used for both "Train Station" and "Timer Sound")  */
/* -------------------------------------------------------------------------- */

function OptionPickerModal({ visible, title, options, selected, onSelect, onClose, labelOf = (item) => item }) {
    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
            <View style={styles.optionModalContainer}>
                <View style={styles.optionModalHeader}>
                    <TouchableOpacity
                        onPress={onClose}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        accessibilityRole="button"
                        accessibilityLabel="Cancel"
                    >
                        <Text style={styles.optionModalCancel}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.optionModalTitle}>{title}</Text>
                    <View style={styles.optionModalCancelSpacer} />
                </View>

                <FlatList
                    data={options}
                    renderItem={({ item }) => {
                        const label = labelOf(item);
                        const isSelected = item === selected;
                        return (
                            <TouchableOpacity
                                style={styles.optionRow}
                                onPress={() => {
                                    onSelect(item);
                                    onClose();
                                }}
                                accessibilityRole="button"
                                accessibilityState={{ selected: isSelected }}
                                accessibilityLabel={label}
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
    const insets = useSafeAreaInsets();
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(45);
    const [seconds, setSeconds] = useState(30);
    const [station, setStation] = useState(stations[stations.length-1] );
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
                <View style={[styles.sheet, { paddingBottom: insets.bottom + space.xxl }]}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Alarm</Text>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={handleConfirm}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            accessibilityRole="button"
                            accessibilityLabel="Set alarm"
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
                                <Text style={styles.settingValue}>{station?.tripStation}</Text>
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
                labelOf={(item) => item.tripStation}
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

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: colors.scrim,
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: colors.surface,
        borderTopLeftRadius: space.xxxl,
        borderTopRightRadius: space.xxxl,
        paddingHorizontal: space.xxl,
        paddingTop: space.xxl,
    },

    /* Header */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: type.subdisplay,
        fontWeight: weight.bold,
        color: colors.textPrimary,
    },
    confirmButton: {
        position: 'absolute',
        right: 0,
        top: -6,
        width: space.max,
        height: space.max,
        borderRadius: radius.xl,
        backgroundColor: colors.brand,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmIcon: {
        color: colors.textOnBrand,
        fontSize: type.title,
        fontWeight: weight.bold,
    },

    /* Time wheel */
    wheelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: space.md,
        marginBottom: space.md,
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
        fontSize: type.subdisplay,
        color: colors.textPrimary,
    },

    /* Settings rows */
    settingsList: {
        marginTop: space.xxl,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: space.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    settingLabel: {
        fontSize: type.body,
        color: colors.textPrimary,
    },
    settingValueRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingValue: {
        fontSize: type.body,
        color: colors.textSecondary,
        marginRight: space.xs,
    },
    settingChevron: {
        fontSize: type.title,
        color: colors.textSecondary,
    },

    /* Option picker modal (Train Station / Timer Sound) */
    optionModalContainer: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    optionModalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: space.xl,
        paddingVertical: space.base,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    optionModalCancel: {
        fontSize: type.body,
        color: colors.brand,
    },
    optionModalCancelSpacer: {
        width: 50,
    },
    optionModalTitle: {
        fontSize: type.body,
        fontWeight: weight.bold,
        color: colors.textPrimary,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: space.xl,
        paddingVertical: space.lg,
    },
    optionRowText: {
        fontSize: type.body,
        color: colors.textPrimary,
    },
    optionRowCheck: {
        fontSize: type.body,
        color: colors.brand,
        fontWeight: weight.bold,
    },
    optionSeparator: {
        height: 1,
        backgroundColor: colors.border,
        marginLeft: space.xl,
    },
});
