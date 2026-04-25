import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, Spacing } from '../constants/theme';

export default function PermissionsScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="lock-closed-outline" size={48} color={Colors.eucalyptus} />
      <Text style={styles.title}>App Permissions</Text>
      <Text style={styles.subtitle}>
        Microphone, contacts, and call access permissions will be configured here.
      </Text>
      <View style={styles.chip}>
        <Text style={styles.chipText}>Coming soon</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.offWhite,
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.deepTeal,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.midGray,
    textAlign: 'center',
    lineHeight: 22,
  },
  chip: {
    marginTop: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.eucalyptus,
    borderRadius: 999,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  chipText: {
    fontSize: FontSize.xs,
    color: Colors.eucalyptus,
    fontWeight: '500',
  },
});
