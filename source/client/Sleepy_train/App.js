import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Header from "./components/Header"
import {useState} from "react";
import SearchScreen from "./Pages/SearchScreen";




export default function App() {

    const [results, setResults] = useState([]);
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');
    const [date, setDate] = useState(new Date());
    const [destination,setDestination] = useState('');
    const [origin,setOrigin] = useState('')
    const [laterRef,setLaterRef] = useState('')
    const [earlierRef,setEarlierRef] = useState('')
    const [searchScreen,setSearchScreen] = useState(true)
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


    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.headerArea}>
                <Header/>
                <StatusBar barStyle="light-content" backgroundColor={RED}/>
            </View>

            {searchScreen ? (
                <SearchScreen
                    results={results}
                    destination={destination}
                    setDestination={setDestination}
                    origin={origin}
                    setOrigin={setOrigin}
                    fromValue={fromValue}
                    setFromValue={setFromValue}
                    toValue={toValue}
                    setToValue={setToValue}
                    date={date}
                    setDate={setDate}
                    handleSearch={handleSearch}
                    loadEarlierConnections={loadEarlierConnections}
                    loadLaterConnections={loadLaterConnections}
                />
            ) : null}
        </SafeAreaView>
    );
}

const RED = '#E8352B';

const styles = StyleSheet.create({
    /* Results list */
    screen: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerArea: {
        backgroundColor: RED,
    },
});
