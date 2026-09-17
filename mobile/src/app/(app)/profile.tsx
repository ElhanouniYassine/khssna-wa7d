import { Button, Text, View } from "react-native";

import { useSession } from "@/context/SessionContext";

export default function ProfileScreen() {
  const { user, signOut } = useSession();

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        justifyContent: "center",
      }}
    >
      <Text>Name: {user?.name}</Text>

      <Text>Email: {user?.email}</Text>

      <Text>City: {user?.city}</Text>

      <Button
        title="Logout"
        onPress={() => {
          void signOut();
        }}
      />
    </View>
  );
}
