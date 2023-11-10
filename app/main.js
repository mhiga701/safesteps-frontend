import { Text } from "react-native";
import { Link } from "expo-router";

export default function Page() {
  return (
    <>
      <Text>Home page</Text>
      <Link href="/">Go to main page!</Link>
    </>
  );
}
