import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";



export default function JourneyCard({
  plannedDeparture,
  plannedArrival,
  departureDelay,
  arrivalDelay,
  plannedDeparturePlatform,
  legs  =[{
    name
  }],
  refreshToken, handelSelectTrip
})
{
  const Departure = new Date(plannedDeparture)
  const Arrival = new Date(plannedArrival)
  const time = Math.round((Arrival-Departure)/ 1000 / 60)

  const loadConnectionDetails = async (key) => {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/refreshJourney/?refreshToken=${encodeURIComponent(key)}`;
    const response = await fetch(url, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    let res = await response.json();
    handelSelectTrip(res,refreshToken);
  }

  return (
    <TouchableOpacity style={JourneyCardStyles.card} onPress={() => loadConnectionDetails(refreshToken)}>
      <View style={JourneyCardStyles.topRow}>
        <View>
          <View style={JourneyCardStyles.timeRow}>
            <Text style={JourneyCardStyles.timeText}>{Departure.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</Text>
            <MaterialIcons name={"arrow-forward"} size={20} color={TEXT_DARK}></MaterialIcons>
            <Text style={JourneyCardStyles.timeText}>{Arrival.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</Text>
          </View>
          <View style={JourneyCardStyles.subTimeRow}>
            <Text style={JourneyCardStyles.subTimeText}>{departureDelay}</Text>
            <Text style={JourneyCardStyles.subTimeSpacer} />
            <Text style={JourneyCardStyles.subTimeText}>{arrivalDelay}</Text>
          </View>
        </View>
        {plannedDeparturePlatform?<Text style={JourneyCardStyles.trackText}>Gls {plannedDeparturePlatform}</Text>: <View /> }
      </View>

      <View style={JourneyCardStyles.bottomRow}>
        <View style={JourneyCardStyles.lineRow}>
          {legs.map((line, index) => (
              <React.Fragment key={index}>
                <View style={JourneyCardStyles.lineBadge}>
                  <Text style={JourneyCardStyles.lineBadgeText}>{line.name}</Text>
                </View>
                <View style={JourneyCardStyles.connectorLine} />
              </React.Fragment>
          ))}
        </View>

        <View style={JourneyCardStyles.durationRow}>
          <ClockIcon />
          <Text style={JourneyCardStyles.durationText}>{time} min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function ClockIcon() {
  return (
    <View style={JourneyCardStyles.clockCircle}>
      <View style={JourneyCardStyles.clockHandMinute} />
      <View style={JourneyCardStyles.clockHandHour} />
    </View>
  );
}

const BLUE = '#2F6FED';
const GREEN = '#2E9B4F';
const TEXT_DARK = '#1A1A1A';
const TEXT_GRAY = '#8A8A8E';
const BORDER = '#E4E4E7';
const LINE_BLUE = '#2F5FC7';


const JourneyCardStyles = StyleSheet.create({
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
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: BORDER,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
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
  arrow: {
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
  badge: {
    backgroundColor: BLUE,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 2,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  connectorLine: {
    height: 3,
    backgroundColor: BLUE,
    flex: 1,
    marginHorizontal: -2,
  },
  tailLine: {
    height: 3,
    width: 18,
    backgroundColor: BLUE,
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
});