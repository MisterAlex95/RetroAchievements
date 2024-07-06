import { Box } from "@gluestack-ui/themed";

import { StyleSheet } from "react-native";

export default function HomeScreen() {
  return <Box style={styles.container}></Box>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    marginLeft: 50,
  },
});
