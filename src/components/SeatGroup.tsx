import React, { useMemo, useState } from "react";
import { SeatType } from "../types/CinemaTypes";
import { colors } from "../theme/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { space } from "../theme/size";
import SeatItem from "./SeatItem";

type SeatGroupProps = {
  seats: SeatType[][];
  onSelectSeat: (seat: SeatType, isSelected: boolean) => void;
};

const SeatGroup = ({ seats, onSelectSeat }: SeatGroupProps) => {
  return (
    <View style={styles.seatColumContainer}>
      {seats.map((seatRow, index) => {
        return (
          <View style={styles.seatRowContainer} key={`seat-row-${index}`}>
            {seatRow.map((seat) => {
              return (
                <SeatItem
                  seat={seat}
                  key={seat?.name}
                  onSelectSeat={onSelectSeat}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  seatColumContainer: {
    flexDirection: "column",
    gap: space.md,
  },
  seatRowContainer: {
    flexDirection: "row",
    gap: space.md,
  },
});

const propsAreEqual = () => {
  return true;
};

export default React.memo(SeatGroup, propsAreEqual);
