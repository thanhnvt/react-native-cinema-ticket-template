import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { fontSize, space } from "../theme/size";
import { colors } from "../theme/colors";

type AppButtonProps = {
  text: string;
  onPress: () => void;
};

const AppButton = ({ text, onPress }: AppButtonProps) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
      <Text style={styles.txtBtn}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  txtBtn: {
    color: "#fff",
    fontSize: fontSize.md,
    fontWeight: "700",
    paddingHorizontal: space.md * 6,
    padding: space.md,
    textAlign: "center",
  },
  btnContainer: {
    backgroundColor: colors.orange,
    borderRadius: space.sm,
    marginVertical: space.sm,
  },
});

export default AppButton;
