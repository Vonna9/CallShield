import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize } from '../constants/theme';

function PowerButton({ isOn, onPress }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.94,
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

  const buttonColor = isOn ? Colors.deepTeal : '#1C2A28';

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <View style={[styles.buttonBody, { backgroundColor: buttonColor }]}>
          <Ionicons
            name="power"
            size={50}
            color={isOn ? Colors.lightTeal : Colors.midGray}
          />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

function BackendBadge({ status }) {
  const color =
    status === 'connected'
      ? Colors.safe
      : status === 'checking'
      ? Colors.unknown
      : Colors.risky;
  const label =
    status === 'connected'
      ? '● Backend connected'
      : status === 'checking'
      ? '◌ Checking backend…'
      : '○ Backend offline';

  return (
    <View style={[styles.badge, { borderColor: color }]}>
      <Text style={[styles.badgeText, { color }]}>{label}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const [isOn, setIsOn] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');
  const router = useRouter();

  const BACKEND_URL = 'http://localhost:8000';

  async function pingBackend() {
    try {
      const res = await fetch(`${BACKEND_URL}/ping`, { 
        signal: AbortSignal.timeout(4000) 
      });
      if (res.ok) {
        setBackendStatus('connected');
      } else {
        setBackendStatus('offline');
      }
    } catch {
      setBackendStatus('offline');
    }
  }

  function handleToggle() {
    setIsOn(prev => !prev);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Backend badge */}
        <BackendBadge status={backendStatus} />

        {/* Control section with light blue background */}
        <View style={styles.controlSection}>
          {/* Tutorial button - LEFT */}
          <TouchableOpacity
            style={styles.tutorialButton}
            onPress={() => Alert.alert('Tutorial', 'Coming soon — Coach marks will guide you through the app!')}
          >
            <Ionicons name="help-circle-outline" size={24} color={Colors.eucalyptus} />
            <Text style={styles.tutorialText}>Tutorial</Text>
          </TouchableOpacity>

          {/* Power button - RIGHT */}
          <View style={styles.powerSection}>
            <PowerButton isOn={isOn} onPress={handleToggle} />
            <Text style={styles.protectionStatus}>
              {isOn ? 'Protection on' : 'Protection off'}
            </Text>
          </View>
        </View>

        {/* Info card */}
        <View style={[styles.infoCard, { borderColor: isOn ? Colors.safeBorder : Colors.lightGray }]}>
          <Ionicons
            name={isOn ? 'shield-checkmark' : 'shield-outline'}
            size={20}
            color={isOn ? Colors.midTeal : Colors.midGray}
          />
          <Text style={[styles.infoText, { color: isOn ? Colors.darkGray : Colors.midGray }]}>
            {isOn
              ? 'CallShield is analyzing incoming calls.'
              : 'Enable protection to start monitoring incoming calls.'}
          </Text>
        </View>

        {/* Navigation Tabs */}
        <View style={styles.tabsContainer}>
          {/* App Permissions - Full width at top */}
          <TouchableOpacity 
            style={styles.tabFull}
            onPress={() => router.push('/permissions')}
          >
            <Ionicons name="lock-closed-outline" size={20} color={Colors.eucalyptus} />
            <Text style={styles.tabText}>App Permissions</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.midGray} />
          </TouchableOpacity>

          {/* Accessibility and Data stacked below */}
          <TouchableOpacity 
            style={styles.tabStacked}
            onPress={() => Alert.alert('Accessibility', 'Coming soon')}
          >
            <Ionicons name="accessibility-outline" size={20} color={Colors.eucalyptus} />
            <Text style={styles.tabText}>Accessibility</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.midGray} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.tabStacked}
            onPress={() => router.push('/data')}
          >
            <Ionicons name="document-text-outline" size={20} color={Colors.eucalyptus} />
            <Text style={styles.tabText}>Call History</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.midGray} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const BUTTON_SIZE = 100;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  badge: {
    borderWidth: 1,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    marginBottom: Spacing.lg,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  controlSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#A8D5E8',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginVertical: Spacing.lg,
    minHeight: 160,
  },
  tutorialButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  tutorialText: {
    fontSize: FontSize.xs,
    color: Colors.eucalyptus,
    fontWeight: '600',
  },
  powerSection: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: Spacing.md,
  },
  buttonBody: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    borderWidth: 2,
    borderColor: '#2A3E3A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.deepTeal,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
  protectionStatus: {
    fontSize: FontSize.xs,
    color: Colors.midGray,
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginVertical: Spacing.lg,
  },
  infoText: {
    flex: 1,
    fontSize: FontSize.sm,
    lineHeight: 20,
  },
  tabsContainer: {
    gap: Spacing.sm,
    marginTop: Spacing.xl,
  },
  tabFull: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: Radius.md,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  tabStacked: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: Radius.md,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  tabText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.darkGray,
    fontWeight: '500',
  },
});