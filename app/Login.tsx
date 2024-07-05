import { useState } from "react";
import { Text, View, TextInput } from "react-native";

export default function Login() {
  const [userName, setUsername] = useState("");
  const [apiKey, setApiKey] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Login page.</Text>
      <View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text>Enter your username:</Text>
          <TextInput
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text>Enter your APIKey:</Text>
          <TextInput
            onChangeText={(text) => setApiKey(text)}
          />
        </View>
      </View>
    </View>
  );
}
