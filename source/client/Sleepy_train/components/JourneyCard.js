import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";
import { colors, listDivider, listRow, radius, space, type, weight } from '../theme';



export default function JourneyCard({
  plannedDeparture,
  plannedArrival,
  departureDelay,
  arrivalDelay,
  plannedDeparturePlatform,
  legs  =[{
    name
  }],
  refreshToken, handelSelectTrip, first = false
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
    <TouchableOpacity
      style={[JourneyCardStyles.row, !first && JourneyCardStyles.divider]}
      onPress={() => loadConnectionDetails(refreshToken)}
    >
      <View style={JourneyCardStyles.topRow}>
        <View>
          <View style={JourneyCardStyles.timeRow}>
            <Text style={JourneyCardStyles.timeText}>{Departure.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</Text>
            <MaterialIcons name={"arrow-forward"} size={20} color={colors.textPrimary}></MaterialIcons>
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

const JourneyCardStyles = StyleSheet.create({
  lineBadge: {
    backgroundColor: colors.routeLine,
    borderRadius: radius.sm,
    paddingHorizontal: space.sm,
    paddingVertical: space.xs,
    zIndex: 2,
  },
  lineBadgeText: {
    color: colors.textOnBrand,
    fontWeight: weight.bold,
    fontSize: type.small,
  },
  row: {
    ...listRow,
  },
  divider: {
    ...listDivider,
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
    fontSize: type.heading,
    fontWeight: weight.bold,
    color: colors.textPrimary,
  },
  subTimeRow: {
    flexDirection: 'row',
    marginTop: 2,
  },
  subTimeText: {
    fontSize: type.small,
    fontWeight: weight.semibold,
    color: colors.success,
    width: 46,
  },
  subTimeSpacer: {
    width: space.xxl,
  },
  trackText: {
    fontSize: type.small,
    color: colors.textSecondary,
    fontWeight: weight.medium,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: space.xl,
  },
  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  // Matches the route spine colour used in TripDetailScreen.
  connectorLine: {
    height: 3,
    backgroundColor: colors.routeLine,
    flex: 1,
    marginHorizontal: -2,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: space.md,
  },
  durationText: {
    fontSize: type.small,
    color: colors.textSecondary,
    fontWeight: weight.medium,
    marginLeft: space.xs,
  },
  clockCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.3,
    borderColor: colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockHandMinute: {
    position: 'absolute',
    width: 1.3,
    height: 5,
    backgroundColor: colors.textSecondary,
    top: 1.5,
    left: 6.3,
  },
  clockHandHour: {
    position: 'absolute',
    width: 3.5,
    height: 1.3,
    backgroundColor: colors.textSecondary,
    top: 6.3,
    left: 6.3,
  },
});
