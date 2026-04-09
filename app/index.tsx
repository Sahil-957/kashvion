import { SafeAreaView, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-sm">
          <Text className="text-sm font-medium uppercase tracking-[3px] text-emerald-600">
            Expo + Tailwind
          </Text>
          <Text className="mt-4 text-4xl font-bold text-slate-900">Kashvion</Text>
          <Text className="mt-3 text-base leading-6 text-slate-600">
            A clean starting point using Expo Router, NativeWind, and Tailwind utility classes.
          </Text>
          <View className="mt-6 rounded-2xl bg-slate-900 px-4 py-3">
            <Text className="text-center text-sm font-semibold text-white">
              Edit app/index.tsx to build your app
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
