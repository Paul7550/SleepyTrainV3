import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveLatestConnections(from,origin,to,destination) {
    try {
        const existing = await getLatestConnections();
        const newLatestConnection = {"from":from,"origin":origin,"to":to,"destination":destination}
        const exists = existing.some(
            (route) => route.origin === newLatestConnection.origin && route.destination === newLatestConnection.destination
        );
        if (exists) {

            return
        }
        const updated = [newLatestConnection,...existing];
        await AsyncStorage.setItem('latestConnections', JSON.stringify(updated));
    } catch (e) {
        console.error('Error adding token', e);
    }
}

export async function getLatestConnections() {
    try {
        const jsonValue = await AsyncStorage.getItem('latestConnections');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        return []
    }
}
