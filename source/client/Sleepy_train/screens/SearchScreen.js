import React, {useEffect, useState} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import JourneyCard from '../components/JourneyCard';
import RouteInputCard from '../components/RouteInputCard';
import {MaterialIcons} from '@expo/vector-icons';
import {getLatestConnections, saveLatestConnections} from "../Saver";
import ConnectionCard from "../components/LatestConnections";
import { LoadingState, EmptyState, ErrorState } from '../components/StateViews';
import { colors, radius, screenPadding, space, type, weight } from '../theme';


export default function SearchScreen({navigation}) {
    const [results, setResults] = useState([]);
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');
    const [date, setDate] = useState(new Date());
    const [destination, setDestination] = useState('');
    const [origin, setOrigin] = useState('')
    const [laterRef, setLaterRef] = useState('')
    const [earlierRef, setEarlierRef] = useState('')
    const [latestConnections, setLatestConnections] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [hasSearched, setHasSearched] = useState(false)
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const getLatestCon = async () => {
            setLatestConnections(await getLatestConnections());
        }
        getLatestCon()

    }, [])

    const loadLatestConnections = (from,origin,to,destination)=>{
        setOrigin(origin)
        setDestination(destination)
        setFromValue(from)
        setToValue(to)
    }
    const handleSearch = async () => {
        if (fromValue != '' && toValue != '') {
            setLoading(true)
            setError(null)
            const url = `${process.env.EXPO_PUBLIC_API_URL}/trainConnections/?departureStation=${origin}&arrivalStation=${destination}&departure=${date}`;
            try {        console.log(process.env.EXPO_BASE_URL)

                const response = await fetch(url, {
                    method: 'GET'
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const res = await response.json();
                setResults(res.journeys);
                setEarlierRef(res.earlierRef);
                setLaterRef(res.laterRef);
                await saveLatestConnections(fromValue,origin,toValue,destination,false)
                setHasSearched(true)
            } catch (e) {
                console.error(e.message);
                setError(e.message);
            } finally {
                setLoading(false)
            }
        }
    };
    const loadLaterConnections = async () => {
        if (laterRef != '' && laterRef != null) {
            const url = `${process.env.EXPO_PUBLIC_API_URL}/trainConnections/?departureStation=${origin}&arrivalStation=${destination}&laterRef=${encodeURIComponent(laterRef)}`;
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
        const url = `${process.env.EXPO_PUBLIC_API_URL}/trainConnections/?departureStation=${origin}&arrivalStation=${destination}&earlierRef=${encodeURIComponent(earlierRef)}`;
        const response = await fetch(url, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const res = await response.json();
        setResults(prevResults => [...res.journeys, ...prevResults]);
        setEarlierRef(res.earlierRef);
        setLaterRef(res.laterRef);
    }
    const handleSelectTrip = (trip, token) => {
        navigation.navigate('TripDetail', {trip, token});
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
                {loading ? (
                    <LoadingState/>
                ) : error ? (
                    <ErrorState title="Couldn't load connections"/>
                ) : (
                    <ScrollView style={styles.resultsList} contentContainerStyle={styles.resultsListContent}>
                        {results.length> 0 ?
                            results.map((result, index) => (
                            <JourneyCard {...result} handelSelectTrip={handleSelectTrip} key={index} first={index === 0}/>
                            ))
                            : hasSearched ?
                            <EmptyState
                                icon="train"
                                title="No connections found"
                                subtitle="Try a different departure time or stations."
                            />
                            :
                            latestConnections.map((c,index)=>(
                                <ConnectionCard loadLatestConnections={loadLatestConnections} fav={c.favorite} key={index} first={index === 0} from={c.from} to={c.to} destination={c.destination} origin={c.origin}></ConnectionCard>
                            )).sort((a,b)=>Number(b.favorite) - Number(a.favorite))
                        }
                    </ScrollView>
                )}
            </View>
            {results.length > 0?
                <View style={[styles.pagination, { paddingBottom: insets.bottom + space.md }]}>
                    <TouchableOpacity
                        style={styles.pageButton}
                        onPress={() => loadEarlierConnections()}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        accessibilityRole="button"
                        accessibilityLabel="Earlier connections"
                    >
                        <Text style={styles.pageButtonText}><MaterialIcons name={"arrow-left"} size={20}
                                                                           color={colors.textPrimary}/> Previous</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.pageButton}
                        onPress={() => loadLaterConnections()}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        accessibilityRole="button"
                        accessibilityLabel="Later connections"
                    >
                        <Text style={styles.pageButtonText}>Next <MaterialIcons name={"arrow-right"} size={20}
                                                                                color={colors.textPrimary}/> </Text>

                    </TouchableOpacity>
                </View>:null
            }
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    resultsList: {
        flex: 1,
        marginTop: space.xl,
    },
    resultsListContent: {
        flexGrow: 1,
        paddingHorizontal: screenPadding,
        paddingBottom: space.xxxl,
    },
    searchButton: {
        backgroundColor: colors.brand,
        marginHorizontal: screenPadding,
        marginTop: space.md,
        borderRadius: radius.md,
        paddingVertical: space.md,
        alignItems: 'center',
    },
    searchButtonText: {
        color: colors.textOnBrand,
        fontSize: type.body,
        fontWeight: weight.bold,
    },
    pagination: {
        backgroundColor: colors.surface,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: screenPadding,
        paddingTop: space.md,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    pageButton: {
        paddingVertical: space.sm,
    },
    pageButtonText: {
        fontSize: type.body,
        color: colors.textPrimary,
        fontWeight: weight.medium,
    },
});
