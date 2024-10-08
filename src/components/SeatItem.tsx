import React, { useMemo, useState } from "react";
import { SeatType } from "../types/CinemaTypes";
import { colors } from "../theme/colors";
import { Pressable, StyleSheet, Text } from "react-native";
import { space } from "../theme/size";

type SeatProps = {
  seat: SeatType;
  onSelectSeat: (seat: SeatType, isSelected: boolean) => void;
};

const SeatItem = ({ seat, onSelectSeat }: SeatProps) => {

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const backgroundColor = useMemo(() => {
    if (seat?.isBooked) {
      return "gray";
    }
    if (isSelected) {
      return colors.orange;
    }
    return "green";
  }, [seat?.isBooked, isSelected]);
  const onSelect = () => {
    onSelectSeat(seat, !isSelected);
    setIsSelected(!isSelected);
  };
  return (
    <Pressable
      style={[styles.seatItemContainer, { backgroundColor: backgroundColor }]}
      disabled={seat?.isBooked}
      onPress={onSelect}
    >
      <Text>{seat?.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  seatItemContainer: {
    // backgroundColor: colors.orange,
    backgroundColor: "gray",
    width: space.md * 3,
    height: space.md * 2,
    borderRadius: space.xs,
    alignItems: "center",
    justifyContent: "center",
  },
});

const propsAreEqual = () => {
  return true;
};

export default React.memo(SeatItem, propsAreEqual);
