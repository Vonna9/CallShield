import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize } from '../constants/theme';

export default function RectangularWidget() {
  const [isOn, setIsOn] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePowerPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const handlePowerPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  function handleToggle() {
    setIsOn(prev => !prev);
  }

  function handleHomePress() {
    // This would navigate to the main app
    // You can use React Navigation or deep linking here
  }

  const buttonColor = isOn ? Colors.midTeal : Colors.darkTeal;

  return (
    <View style={styles.widgetBox}>
      {/* Home button - top right */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={handleHomePress}
      >
        <Ionicons name="home" size={20} color={Colors.white} />
      </TouchableOpacity>

      {/* Center content */}
      <View style={styles.content}>
        {/* Power button */}
        <TouchableOpacity
          onPress={handleToggle}
          onPressIn={handlePowerPressIn}
          onPressOut={handlePowerPressOut}
          activeOpacity={1}
        >
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <View style={[styles.powerButton, { backgroundColor: buttonColor }]}>
              <Ionicons
                name="power"
                size={50}
                color={Colors.white}
              />
            </View>
          </Animated.View>
        </TouchableOpacity>

        {/* Status text */}
        <Text style={[styles.statusText, { color: isOn ? Colors.midTeal : Colors.darkTeal }]}>
          {isOn ? 'On' : 'Off'}
        </Text>
      </View>
    </View>
  );
}

const BUTTON_SIZE = 110;

const styles = StyleSheet.create({
  widgetBox: {
    backgroundColor: Colors.paleEuca,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 280,
    position: 'relative',
    shadowColor: Colors.midTeal,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  homeButton: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.midTeal,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.midTeal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  content: {
    alignItems: 'center',
    gap: Spacing.xl,
    justifyContent: 'center',
  },
  powerButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    borderWidth: 3,
    borderColor: Colors.eucalyptus,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.deepTeal,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  statusText: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    letterSpacing: 1,
  },
});