import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, space, type, weight } from '../theme';

/** Centred spinner, used while a screen is fetching. */
export function LoadingState() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.brand} />
        </View>
    );
}

/**
 * Shared empty/error placeholder.
 *
 * Props:
 *  - icon: MaterialIcons glyph name
 *  - title: short headline
 *  - subtitle: optional supporting line
 *  - tone: 'neutral' (default) | 'error'
 */
export function EmptyState({ icon = 'inbox', title, subtitle, tone = 'neutral' }) {
    const tint = tone === 'error' ? colors.brand : colors.textSecondary;
    return (
        <View style={styles.container}>
            <MaterialIcons name={icon} size={44} color={tint} />
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
    );
}

/** Error placeholder. Keeps the raw exception out of the UI. */
export function ErrorState({ title = 'Something went wrong', subtitle = 'Check your connection and try again.' }) {
    return <EmptyState icon="error-outline" title={title} subtitle={subtitle} tone="error" />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: space.xxxl,
        paddingVertical: space.max,
    },
    title: {
        marginTop: space.md,
        fontSize: type.title,
        fontWeight: weight.bold,
        color: colors.textPrimary,
        textAlign: 'center',
    },
    subtitle: {
        marginTop: space.sm,
        fontSize: type.small,
        lineHeight: space.xxl,
        color: colors.textSecondary,
        textAlign: 'center',
    },
});
