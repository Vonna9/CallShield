import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.lightTeal,
          tabBarInactiveTintColor: Colors.eucalyptus,
          tabBarStyle: {
            backgroundColor: Colors.navy,
            borderTopColor: Colors.darkTeal,
            borderTopWidth: 1,
            paddingBottom: 8,
            paddingTop: 6,
            height: 64,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
            marginTop: 2,
          },
          headerStyle: {
            backgroundColor: Colors.deepTeal,
          },
          headerTintColor: Colors.white,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'CallShield',
            headerTitle: 'CallShield',
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="shield-checkmark" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="data"
          options={{
            title: 'Data',
            tabBarLabel: 'Data',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="document-text" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="permissions"
          options={{
            title: 'Permissions',
            tabBarLabel: 'Permissions',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="lock-closed" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
