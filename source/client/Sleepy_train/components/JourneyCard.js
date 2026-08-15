import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function JourneyCard({
  departureTime = '12:00',
  arrivalTime = '14:00',
  departurePlatformTime = '12:25',
  arrivalPlatformTime = '14:25',
  track = 'Gls 4',
  fromLine = 'S4',
  toLine = 'U4',
  duration = '2h',
}) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{departureTime}</Text>
            <Text style={styles.arrow}> → </Text>
            <Text style={styles.timeText}>{arrivalTime}</Text>
          </View>
          <View style={styles.subTimeRow}>
            <Text style={styles.subTimeText}>{departurePlatformTime}</Text>
            <Text style={styles.subTimeSpacer} />
            <Text style={styles.subTimeText}>{arrivalPlatformTime}</Text>
          </View>
        </View>
        <Text style={styles.trackText}>{track}</Text>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.lineRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{fromLine}</Text>
          </View>
          <View style={styles.connectorLine} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{toLine}</Text>
          </View>
          <View style={styles.tailLine} />
        </View>

        <View style={styles.durationRow}>
          <ClockIcon />
          <Text style={styles.durationText}>{duration}</Text>
        </View>
      </View>
    </View>
  );
}

function ClockIcon() {
  return (
    <View style={styles.clockCircle}>
      <View style={styles.clockHandMinute} />
      <View style={styles.clockHandHour} />
    </View>
  );
}

const BLUE = '#2F6FED';
const GREEN = '#2E9B4F';
const TEXT_DARK = '#1A1A1A';
const TEXT_GRAY = '#8A8A8E';
const BORDER = '#E4E4E7';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
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