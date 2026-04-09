import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { DashboardScreen } from '@/screens/DashboardScreen';
import { AddBillScreen } from '@/screens/AddBillScreen';
import { ActivityScreen } from '@/screens/ActivityScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { AuthScreen } from '@/screens/AuthScreen';
import { ConfirmBillScreen } from '@/screens/ConfirmBillScreen';
import { ItemDetailsScreen } from '@/screens/ItemDetailsScreen';
import { colors, shadows } from '@/theme';
import { MainTabParamList, RootStackParamList } from '@/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();

function MainTabs({ onSignOut }: { onSignOut: () => void }) {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ color, size, focused }) => {
          const iconMap: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
            Home: focused ? 'home' : 'home-outline',
            Add: focused ? 'add-circle' : 'add-circle-outline',
            Activity: focused ? 'time' : 'time-outline',
            Settings: focused ? 'settings' : 'settings-outline',
          };

          if (route.name === 'Add') {
            return (
              <View style={styles.fabInner}>
                <Ionicons color={colors.textPrimary} name="add" size={24} />
              </View>
            );
          }

          return <Ionicons color={color} name={iconMap[route.name]} size={size} />;
        },
        tabBarIconStyle: route.name === 'Add' ? styles.fabButton : undefined,
      })}>
      <Tabs.Screen name="Home" component={DashboardScreen} />
      <Tabs.Screen
        name="Add"
        component={AddBillScreen}
        options={{ title: '', tabBarLabel: () => null }}
      />
      <Tabs.Screen name="Activity" component={ActivityScreen} />
      <Tabs.Screen name="Settings">{() => <SettingsScreen onSignOut={onSignOut} />}</Tabs.Screen>
    </Tabs.Navigator>
  );
}

export function AppNavigator() {
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasOnboarded ? (
          <Stack.Screen name="Onboarding">
            {() => <OnboardingScreen onContinue={() => setHasOnboarded(true)} />}
          </Stack.Screen>
        ) : !isSignedIn ? (
          <Stack.Screen name="Auth">
            {() => <AuthScreen onAuthenticate={() => setIsSignedIn(true)} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="MainTabs">
              {() => <MainTabs onSignOut={() => setIsSignedIn(false)} />}
            </Stack.Screen>
            <Stack.Screen name="ConfirmBill" component={ConfirmBillScreen} />
            <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 18,
    height: 72,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderTopWidth: 0,
    paddingBottom: 10,
    paddingTop: 10,
    ...shadows.card,
  },
  tabBarLabel: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
  },
  fabButton: {
    marginTop: -18,
  },
  fabInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.card,
  },
});
