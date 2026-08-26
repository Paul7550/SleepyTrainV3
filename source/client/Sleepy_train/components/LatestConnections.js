import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";
import {saveLatestConnections} from "../Saver";

export default function ConnectionCard({ from, origin,to,destination,loadLatestConnections,fav}) {
    const [favorite,setFavorite] = useState(fav)
    const [star,setStar]=useState(favorite?'star':'star-border')

    const changeFavorite =async ()=>{
        const newFavorite = !favorite
        setFavorite(newFavorite)
        newFavorite? setStar('star'):setStar('star-border')
        await saveLatestConnections(from,origin,to,destination,newFavorite)
    }

    return (
        <TouchableOpacity style={styles.card} onPress={()=>loadLatestConnections(from,origin,to,destination)}>
            <View style={styles.stationLine}>
                <View style={[styles.badge, styles.badgeRed]}>
                    <Text style={styles.badgeText}>A</Text>
                </View>
                <Text style={styles.stationText} numberOfLines={1}>
                    {from}
                </Text>
                <MaterialIcons name={star} onPress={()=>changeFavorite()} size={24} ></MaterialIcons>
            </View>

            <View style={styles.connectorRow}>
                <View style={styles.connectorSpacer} />
                <MaterialIcons name={"arrow-downward"} color={TEXT_GRAY} size={16}></MaterialIcons>
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

const RED = '#E8352B';
const GRAY = '#9A9A9E';
const BORDER = '#E4E4E7';
const TEXT_DARK = '#1A1A1A';
const TEXT_GRAY = '#8A8A8E';

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: BORDER,
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    stationLine: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
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
        fontSize: 11,
    },
    stationText: {
        fontSize: 15,
        color: TEXT_DARK,
        flexShrink: 1,
    },
    connectorRow: {
        flexDirection: 'row',
        height: 20,
    },
    connectorSpacer: {
        width: 24,
        alignItems: 'center',
        marginRight: 12,
    },
    arrow: {
        fontSize: 14,
        color: TEXT_GRAY,
    },
});