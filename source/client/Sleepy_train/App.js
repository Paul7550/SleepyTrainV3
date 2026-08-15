import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import JourneyCard from './components/JourneyCard';
import RouteInputCard from "./components/RouteInputCard";
import Header from "./components/Header"
import {useState} from "react";
import {TouchableOpacity, ScrollView} from 'react-native';

const handleSearch = () => {
    // Hook up your search / API call here
};
const results = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}
];
export default function App() {
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');
    const [date, setDate] = useState(new Date());
    const [page, setPage] = useState(1);
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.headerArea}>
                <StatusBar barStyle="light-content" backgroundColor={RED}/>
                <Header/>
            </View>

            <View style={styles.content}>
                <RouteInputCard
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
                    {results.map((_, index) => (
                        <JourneyCard key={index}/>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.pagination}>
                <TouchableOpacity
                    style={styles.pageButton}
                    onPress={() => setPage((p) => Math.max(1, p - 1))}
                >
                    <Text style={styles.pageButtonText}>← Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.pageButton}
                    onPress={() => setPage((p) => p + 1)}
                >
                    <Text style={styles.pageButtonText}>Next →</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
    /* Results list */
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
        paddingHorizontal: 18,
        marginTop: 18,
    },
    resultsListContent: {
        paddingBottom: 24,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: BORDER,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 14,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 20,
        fontWeight: '700',
        color: TEXT_DARK,
    },
    arrowBig: {
        fontSize: 18,
        fontWeight: '600',
        color: TEXT_DARK,
    },
    subTimeRow: {
        flexDirection: 'row',
        marginTop: 2,
    },
    subTimeText: {
        fontSize: 13,
        fontWeight: '600',
        color: GREEN,
        width: 46,
    },
    subTimeSpacer: {
        width: 20,
    },
    trackText: {
        fontSize: 14,
        color: TEXT_GRAY,
        fontWeight: '500',
        marginTop: 2,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 18,
    },
    lineRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    lineBadge: {
        backgroundColor: LINE_BLUE,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        zIndex: 2,
    },
    lineBadgeText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 13,
    },
    connectorLine: {
        height: 3,
        backgroundColor: LINE_BLUE,
        flex: 1,
        marginHorizontal: -2,
    },
    tailLine: {
        height: 3,
        width: 18,
        backgroundColor: LINE_BLUE,
        marginLeft: -2,
    },
    durationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    durationText: {
        fontSize: 13,
        color: TEXT_GRAY,
        fontWeight: '500',
        marginLeft: 4,
    },
    clockCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 1.3,
        borderColor: TEXT_GRAY,
        alignItems: 'center',
        justifyContent: 'center',
    },
    clockHandMinute: {
        position: 'absolute',
        width: 1.3,
        height: 5,
        backgroundColor: TEXT_GRAY,
        top: 1.5,
        left: 6.3,
    },
    clockHandHour: {
        position: 'absolute',
        width: 3.5,
        height: 1.3,
        backgroundColor: TEXT_GRAY,
        top: 6.3,
        left: 6.3,
    },
    /* Search button */
    searchButton: {
        backgroundColor: RED,
        marginHorizontal: 18,
        marginTop: 18,
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
    },
    searchButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    /* Pagination footer */
    pagination: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop:12,
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
