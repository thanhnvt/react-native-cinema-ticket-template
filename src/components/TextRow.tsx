import React from "react";
import { View, Text, StyleSheet } from "react-native";
const TextRow = ({
  textLeft,
  textRight,
}: {
  textLeft: string;
  textRight: string;
}) => {
  return (
    <View style={styles.textRowContainer}>
      <Text style={styles.txtLeft}>{textLeft}</Text>
      <Text style={styles.txtRight}>{textRight}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    txtLeft: {},
    txtRight: {},
    textRowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });

export default TextRow;
