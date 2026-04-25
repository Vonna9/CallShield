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

export default function SimpleWidget() {
  const [isOn, setIsOn] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  function handleToggle() {
    setIsOn(prev => !prev);
  }

  const buttonColor = isOn ? Colors.midTeal : Colors.darkTeal;

  return (
    <View style={styles.container}>
      {/* Power button */}
      <TouchableOpacity
        onPress={handleToggle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <View style={[styles.powerButton, { backgroundColor: buttonColor }]}>
            <Ionicons
              name="power"
              size={40}
              color={Colors.white}
            />
          </View>
        </Animated.View>
      </TouchableOpacity>

      {/* App name */}
      <Text style={styles.appName}>CallShield</Text>
    </View>
  );
}

const BUTTON_SIZE = 80;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.sm,
    justifyContent: 'center',
  },
  powerButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    borderWidth: 2,
    borderColor: Colors.eucalyptus,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.midTeal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  appName: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.deepTeal,
    letterSpacing: 0.5,
  },
});