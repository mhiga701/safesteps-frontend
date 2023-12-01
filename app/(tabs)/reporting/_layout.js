import { Stack } from 'expo-router'


const ReportLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="accident" options={{ headerShown: false }} />
        <Stack.Screen name="obstacle" options={{ headerShown: false }} />

    </Stack>
  );
};

export default ReportLayout