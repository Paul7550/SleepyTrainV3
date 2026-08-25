import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import JourneyCard from '../components/JourneyCard';
import RouteInputCard from '../components/RouteInputCard';
import { MaterialIcons } from '@expo/vector-icons';
import Header from "../components/Header";
import {StatusBar} from "expo-status-bar";


export default function SearchScreen({navigation}) {
    const [results, setResults] = useState([]);
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');
    const [date, setDate] = useState(new Date());
    const [destination,setDestination] = useState('');
    const [origin,setOrigin] = useState('')
    const [laterRef,setLaterRef] = useState('')
    const [earlierRef,setEarlierRef] = useState('')
    const [details,setDetails] = useState('')


    const handleSearch = async() => {
        if(fromValue != ''  && toValue != ''){
            const url = `http://172.20.10.2:3000/api/trainConnections/?departureStation=${origin}&arrivalStation=${destination}&departure=${date}`;
            try {
                const response = await fetch(url,{
                    method: 'GET'
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const res = await response.json();
                setResults(res.journeys);
                setEarlierRef(res.earlierRef);
                setLaterRef(res.laterRef);
            } catch (error) {
                console.error(error.message);
            }
        }
    };
    const loadLaterConnections = async () => {
        if (laterRef != '' && laterRef != null) {
            const url = `http://172.20.10.2:3000/api/trainConnections/?departureStation=${origin}&arrivalStation=${destination}&laterRef=${encodeURIComponent(laterRef)}`;
            const response = await fetch(url, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const res = await response.json();
            setResults(prevResults => [...prevResults, ...res.journeys]);
            setEarlierRef(res.earlierRef);
            setLaterRef(res.laterRef);
        }
    }
    const loadEarlierConnections = async () => {
        const url = `http://172.20.10.2:3000/api/trainConnections/?departureStation=${origin}&arrivalStation=${destination}&earlierRef=${encodeURIComponent(earlierRef)}`;
        const response = await fetch(url, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const res = await response.json();
        setResults(prevResults => [...res.journeys,...prevResults]);
        setEarlierRef(res.earlierRef);
        setLaterRef(res.laterRef);
    }
    const handleSelectTrip = (trip,token) => {
        navigation.navigate('TripDetail', { trip,token });
    };


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
                        <JourneyCard {...result} handelSelectTrip={handleSelectTrip} key={index} />
                    ))}
                </ScrollView>
            </View>

            <View style={styles.pagination}>
                <TouchableOpacity
                    style={styles.pageButton}
                    onPress={() => loadEarlierConnections()}
                >
                    <Text style={styles.pageButtonText}><MaterialIcons name={"arrow-left"} size={20} color={TEXT_DARK}/> Previous</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.pageButton}
                    onPress={() => loadLaterConnections()}
                >
                    <Text style={styles.pageButtonText}>Next <MaterialIcons name={"arrow-right"} size={20} color={TEXT_DARK} /> </Text>

                </TouchableOpacity>
            </View>
        </>
    );
}

const RED = '#E8352B';
const BORDER = '#E4E4E7';
const TEXT_DARK = '#1A1A1A';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerArea: {
        backgroundColor: RED,
    },
    content: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    resultsList: {
        flex: 1,
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
