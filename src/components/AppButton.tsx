import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { fontSize, space } from "../theme/size";
import { colors } from "../theme/colors";

interface AppButtonProps extends PressableProps {
  text: string;
  onPress: () => void;
}

const AppButton = (props: AppButtonProps) => {
  const { text, onPress } = props;

  return (
    <Pressable style={styles.btnContainer} {...props} onPress={onPress}>
      <Text style={styles.txtBtn}>{text}</Text>
    </Pressable>
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
