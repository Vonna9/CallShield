import {
  View,
  Text,
  StyleSheet,
  Switch,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize } from '../constants/theme';

export default function PermissionsScreen() {
  const [contactsEnabled, setContactsEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const handleContactsToggle = (value) => {
    setContactsEnabled(value);
    if (value) {
      Alert.alert('Contacts Access', 'CallShield will access your contacts to identify callers.');
    }
  };

  const handleAudioToggle = (value) => {
    setAudioEnabled(value);
    if (value) {
      Alert.alert('Audio Transcription', 'CallShield will transcribe incoming calls for analysis.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header info */}
        <View style={styles.header}>
          <Ionicons name="lock-closed-outline" size={32} color={Colors.deepTeal} />
          <Text style={styles.headerTitle}>App Permissions</Text>
          <Text style={styles.headerSubtitle}>
            Grant permissions to enable CallShield features
          </Text>
        </View>

        {/* Permissions List */}
        <View style={styles.permissionsContainer}>
          {/* Contacts Permission */}
          <View style={styles.permissionCard}>
            <View style={styles.permissionHeader}>
              <View style={styles.permissionIconContainer}>
                <Ionicons name="person-outline" size={24} color={Colors.midTeal} />
              </View>
              <View style={styles.permissionInfo}>
                <Text style={styles.permissionTitle}>Contact Access</Text>
                <Text style={styles.permissionDescription}>
                  Identify incoming callers from your contacts
                </Text>
              </View>
              <Switch
                value={contactsEnabled}
                onValueChange={handleContactsToggle}
                trackColor={{ false: Colors.lightGray, true: Colors.midTeal }}
                thumbColor={contactsEnabled ? Colors.deepTeal : Colors.midGray}
              />
            </View>
            <View style={styles.permissionStatus}>
              <Ionicons
                name={contactsEnabled ? 'checkmark-circle' : 'alert-circle'}
                size={16}
                color={contactsEnabled ? Colors.safe : Colors.unknown}
              />
              <Text style={[styles.statusText, { color: contactsEnabled ? Colors.safe : Colors.unknown }]}>
                {contactsEnabled ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
          </View>

          {/* Audio Transcription Permission */}
          <View style={styles.permissionCard}>
            <View style={styles.permissionHeader}>
              <View style={styles.permissionIconContainer}>
                <Ionicons name="mic-outline" size={24} color={Colors.midTeal} />
              </View>
              <View style={styles.permissionInfo}>
                <Text style={styles.permissionTitle}>Audio Transcription</Text>
                <Text style={styles.permissionDescription}>
                  Transcribe calls for text analysis and review
                </Text>
              </View>
              <Switch
                value={audioEnabled}
                onValueChange={handleAudioToggle}
                trackColor={{ false: Colors.lightGray, true: Colors.midTeal }}
                thumbColor={audioEnabled ? Colors.deepTeal : Colors.midGray}
              />
            </View>
            <View style={styles.permissionStatus}>
              <Ionicons
                name={audioEnabled ? 'checkmark-circle' : 'alert-circle'}
                size={16}
                color={audioEnabled ? Colors.safe : Colors.unknown}
              />
              <Text style={[styles.statusText, { color: audioEnabled ? Colors.safe : Colors.unknown }]}>
                {audioEnabled ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
          </View>
        </View>

        {/* Info section */}
        <View style={styles.infoSection}>
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color={Colors.eucalyptus} />
            <Text style={styles.infoText}>
              Permissions are required for CallShield to protect you from spam and scam calls. Your data is stored securely on your device.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.deepTeal,
  },
  headerSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.midGray,
    textAlign: 'center',
  },
  permissionsContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  permissionCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  permissionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  permissionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.offWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  permissionTitle: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.darkGray,
  },
  permissionDescription: {
    fontSize: FontSize.xs,
    color: Colors.midGray,
    lineHeight: 16,
  },
  permissionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginLeft: 56,
  },
  statusText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  infoSection: {
    marginTop: Spacing.lg,
  },
  infoBox: {
    flexDirection: 'row',
    gap: Spacing.sm,
    backgroundColor: Colors.unknownBg,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.unknownBorder,
  },
  infoText: {
    flex: 1,
    fontSize: FontSize.xs,
    color: Colors.darkGray,
    lineHeight: 18,
  },
});