import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize } from '../constants/theme';

export default function DataScreen() {
  const [transcriptions, setTranscriptions] = useState([
    {
      id: '1',
      name: 'Call_2025-04-25_10:30.txt',
      date: 'Apr 25, 10:30 AM',
      duration: '2:45',
      type: 'incoming',
    },
    {
      id: '2',
      name: 'Call_2025-04-24_14:15.txt',
      date: 'Apr 24, 2:15 PM',
      duration: '1:32',
      type: 'incoming',
    },
    {
      id: '3',
      name: 'Upload_sample.txt',
      date: 'Apr 23, 9:00 AM',
      duration: 'N/A',
      type: 'uploaded',
    },
  ]);

  const handleUploadFile = () => {
    Alert.alert(
      'Upload File',
      'Select an audio file to transcribe',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'Choose File', onPress: () => {
          Alert.alert('File Selected', 'Your file has been uploaded for transcription.');
        }},
      ]
    );
  };

  const handleFilePress = (file) => {
    Alert.alert(
      file.name,
      `Date: ${file.date}\nDuration: ${file.duration}\n\nTap to view transcription`,
      [
        { text: 'View', onPress: () => {} },
        { text: 'Delete', onPress: () => {
          setTranscriptions(transcriptions.filter(t => t.id !== file.id));
          Alert.alert('Deleted', 'File removed successfully');
        }, style: 'destructive' },
        { text: 'Close', style: 'cancel' },
      ]
    );
  };

  const FileItem = ({ item }) => (
    <TouchableOpacity
      style={styles.fileItem}
      onPress={() => handleFilePress(item)}
    >
      <View style={styles.fileIcon}>
        <Ionicons
          name={item.type === 'uploaded' ? 'document-attach-outline' : 'radio-outline'}
          size={24}
          color={Colors.midTeal}
        />
      </View>
      <View style={styles.fileInfo}>
        <Text style={styles.fileName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.fileDate}>
          {item.date} • {item.duration}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.midGray} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="document-text-outline" size={32} color={Colors.deepTeal} />
          <Text style={styles.headerTitle}>Call History Data</Text>
          <Text style={styles.headerSubtitle}>
            View transcribed calls and uploaded files
          </Text>
        </View>

        {/* Upload Button */}
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleUploadFile}
        >
          <Ionicons name="cloud-upload-outline" size={24} color={Colors.white} />
          <Text style={styles.uploadButtonText}>Upload Audio File</Text>
        </TouchableOpacity>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: Colors.safeBg }]}>
              <Ionicons name="radio-outline" size={20} color={Colors.safe} />
            </View>
            <View>
              <Text style={styles.statValue}>{transcriptions.filter(t => t.type === 'incoming').length}</Text>
              <Text style={styles.statLabel}>Calls Recorded</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: Colors.unknownBg }]}>
              <Ionicons name="document-attach-outline" size={20} color={Colors.unknown} />
            </View>
            <View>
              <Text style={styles.statValue}>{transcriptions.filter(t => t.type === 'uploaded').length}</Text>
              <Text style={styles.statLabel}>Files Uploaded</Text>
            </View>
          </View>
        </View>

        {/* Transcriptions List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transcriptions</Text>
          {transcriptions.length > 0 ? (
            <FlatList
              data={transcriptions}
              renderItem={({ item }) => <FileItem item={item} />}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="folder-open-outline" size={48} color={Colors.midGray} />
              <Text style={styles.emptyText}>No transcriptions yet</Text>
              <Text style={styles.emptySubtext}>
                Enable audio transcription in permissions to get started
              </Text>
            </View>
          )}
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={20} color={Colors.eucalyptus} />
          <Text style={styles.infoText}>
            All transcriptions are stored locally on your device and encrypted for privacy.
          </Text>
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
  uploadButton: {
    backgroundColor: Colors.midTeal,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
    shadowColor: Colors.midTeal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  uploadButtonText: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.white,
  },
  statsCard: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.darkGray,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.midGray,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.deepTeal,
    marginBottom: Spacing.md,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: Radius.md,
  },
  fileIcon: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.offWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.darkGray,
  },
  fileDate: {
    fontSize: FontSize.xs,
    color: Colors.midGray,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: Spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    gap: Spacing.sm,
  },
  emptyText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.midGray,
  },
  emptySubtext: {
    fontSize: FontSize.xs,
    color: Colors.midGray,
    textAlign: 'center',
  },
  infoCard: {
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