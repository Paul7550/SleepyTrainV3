import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveLatestConnections(from,origin,to,destination,favorite) {
    try {
        const existing = await getLatestConnections();
        const newLatestConnection = {"from":from,"origin":origin,"to":to,"destination":destination,"favorite":favorite}
        const filteredConnections = existing.filter(
            (route) => !(route.origin === newLatestConnection.origin && route.destination === newLatestConnection.destination)
        );
        const updatedConnections = [newLatestConnection, ...filteredConnections];
        await AsyncStorage.setItem('latestConnections', JSON.stringify(updatedConnections));
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
export async function getJourneys(){
    try {
        const jsonValue = await AsyncStorage.getItem('journeys');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        return []
    }
}
export async function checkJourneys(token){
    const journeys = await getJourneys();
    return journeys.includes(token)
}

export async function saveJourneys(newToken){
    try {
        const existing = await getJourneys();
        const updated = existing.includes(newToken)
            ? existing.filter(i => i !== newToken)
            : [...existing, newToken];
        await AsyncStorage.setItem('journeys', JSON.stringify(updated));
    } catch (e) {
        console.error('Error adding token', e);
    }
}
export async function saveAlarm(token,stopId,timeBevorStop,ringTone){
    try{

        let existing = await getAlarm();
        const js = {
            "token":token,
            "stopId":stopId,
            "timeBevorStop":timeBevorStop,
            "ringTone":ringTone,
            "active":true
        }
        const index = existing.findIndex(
            item => item.token === js.token
        );

        if (index !== -1) {
            existing[index] = js;
        } else {
            existing.push(js);
        }
        await AsyncStorage.setItem('alarm',JSON.stringify(existing))
    }catch (e) {
        console.error(e)
    }
}
export async function getAlarm(){
    try {
        const alarm = await AsyncStorage.getItem('alarm')
        return alarm != null ? JSON.parse(alarm) : [];

    } catch (e) {
        console.error(e)
    }
}
export async function removeAlarm(token){
    try{
        let existing = await getAlarm();
        existing = existing.filter(item => item.token !== token);
        await AsyncStorage.setItem('alarm',JSON.stringify(existing))
    }catch (e) {
        console.error(e)
    }
}
