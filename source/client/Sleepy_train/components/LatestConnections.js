import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";
import {saveLatestConnections} from "../Saver";
import { colors, listDivider, listRow, radius, space, type, weight } from '../theme';

export default function ConnectionCard({ from, origin,to,destination,loadLatestConnections,fav, first = false}) {
    const [favorite,setFavorite] = useState(fav)
    const [star,setStar]=useState(favorite?'star':'star-border')

    const changeFavorite =async ()=>{
        const newFavorite = !favorite
        setFavorite(newFavorite)
        newFavorite? setStar('star'):setStar('star-border')
        await saveLatestConnections(from,origin,to,destination,newFavorite)
    }

    return (
        <TouchableOpacity
            style={[styles.row, !first && styles.divider]}
            onPress={()=>loadLatestConnections(from,origin,to,destination)}
        >
            <View style={styles.stationLine}>
                <View style={[styles.badge, styles.badgeRed]}>
                    <Text style={styles.badgeText}>A</Text>
                </View>
                <Text style={styles.stationText} numberOfLines={1}>
                    {from}
                </Text>
                <TouchableOpacity
                    onPress={changeFavorite}
                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    accessibilityRole="button"
                    accessibilityLabel={favorite ? 'Remove from favourites' : 'Add to favourites'}
                >
                    <MaterialIcons name={star} size={24} />
                </TouchableOpacity>
            </View>

            <View style={styles.connectorRow}>
                <View style={styles.connectorSpacer} />
                <MaterialIcons name={"arrow-downward"} color={colors.textSecondary} size={16}></MaterialIcons>
            </View>

            <View style={styles.stationLine}>
                <View style={[styles.badge, styles.badgeGray]}>
                    <Text style={styles.badgeText}>B</Text>
                </View>
                <Text style={styles.stationText} numberOfLines={1}>
                    {to}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    row: {
        ...listRow,
    },
    divider: {
        ...listDivider,
    },
    stationLine: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        width: 24,
        height: 24,
        borderRadius: radius.md,
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
    stationText: {
        flex: 1,
        fontSize: type.body,
        color: colors.textPrimary,
        flexShrink: 1,
    },
    connectorRow: {
        flexDirection: 'row',
        height: space.xxl,
    },
    connectorSpacer: {
        width: 24,
        alignItems: 'center',
        marginRight: space.md,
    },
});
