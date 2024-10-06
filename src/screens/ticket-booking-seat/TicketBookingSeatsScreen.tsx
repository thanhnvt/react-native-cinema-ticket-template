import React, { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { space } from "../../theme/size";
import { colors } from "../../theme/colors";
import { SeatType, CinemaSeatsType } from "../../types/CinemaTypes";
import api from "../../services";
import AppButton from "../../components/AppButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/NavigationType";
import ScreenKey from "../../constants/ScreenKey";

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

const TicketBookingSeatsScreen = ({
  route,
}: NativeStackScreenProps<
  RootStackParamList,
  ScreenKey.TICKETS_BOOKING_SEAT_SCREEN
>) => {
  const [seat, setSeat] = useState<CinemaSeatsType>();
  const [selectedSeats, setSelectedSeats] = useState<SeatType[]>([]);

  const { showTime, movie, cinema } = route?.params;
  useEffect(() => {
    getSeats();
  }, []);

  const getSeats = async () => {
    const data = await api.cinema.getSeatsByMovieShowId(showTime._id);
    if (data?.single?.length || data?.couple?.length) {
      setSeat(data);
    }
  };

  const onSelectSeat = (seat: SeatType, isSelected: boolean) => {
    if (isSelected) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      setSelectedSeats(selectedSeats.filter((s) => s?.name !== seat?.name));
    }
  };

  const onPayment = () => {
    console.log("onPayment");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.seatContainer}>
          <View style={styles.screenContainer}>
            <View style={styles.screen} />
            <Text>Screen</Text>
            <View style={styles.noteContainer}>
              <View style={styles.noteItemContainer}>
                <View style={[styles.noteColor, { backgroundColor: "gray" }]} />
                <Text>Has been booked</Text>
              </View>
              <View style={styles.noteItemContainer}>
                <View
                  style={[styles.noteColor, { backgroundColor: "green" }]}
                />
                <Text>Available</Text>
              </View>
              <View style={styles.noteItemContainer}>
                <View
                  style={[styles.noteColor, { backgroundColor: colors.orange }]}
                />
                <Text>Selected</Text>
              </View>
            </View>
          </View>
          <View style={styles.seatTopContainer}>
            {seat?.single?.length &&
              seat?.single.map((seats: any, index: number) => (
                <SeatGroup
                  seats={seats}
                  key={`seat-single-${index}`}
                  onSelectSeat={onSelectSeat}
                />
              ))}
          </View>
          {seat?.couple?.length && (
            <SeatGroup seats={seat?.couple} onSelectSeat={onSelectSeat} />
          )}
        </View>
      </ScrollView>
      <AppButton
        text={"Continue"}
        onPress={onPayment}
        disabled={selectedSeats.length === 0}
        style={
          selectedSeats.length === 0 ? styles.btnDisable : styles.btnEnable
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnDisable: {
    backgroundColor: "gray",
    borderRadius: space.sm,
    marginVertical: space.sm,
  },
  btnEnable: {
    backgroundColor: colors.orange,
    borderRadius: space.sm,
    marginVertical: space.sm,
  },
  scrollView: {
    flex: 1,
  },
  noteColor: {
    width: space.md * 2,
    height: space.md,
    borderRadius: 4,
  },
  noteItemContainer: {
    flexDirection: "row",
    gap: space.sm,
    alignContent: "center",
    justifyContent: "center",
  },
  noteContainer: {
    flexDirection: "row",
    gap: space.xs,
  },
  container: {
    padding: space.md,
    flex: 1,
  },
  seatContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: space.md * 2,
  },
  seatTopContainer: {
    flexDirection: "row",
    gap: space.md * 3,
  },
  seatRowContainer: {
    flexDirection: "row",
    gap: space.md,
  },
  seatItemContainer: {
    // backgroundColor: colors.orange,
    backgroundColor: "gray",
    width: space.md * 3,
    height: space.md * 2,
    borderRadius: space.xs,
    alignItems: "center",
    justifyContent: "center",
  },
  seatColumContainer: {
    flexDirection: "column",
    gap: space.md,
  },
  screen: {
    height: 15,
    width: 400,
    backgroundColor: "gray",
    marginTop: space.md * 2,
    borderRadius: 1000,
  },
  screenContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: space.xs,
  },
});

export default TicketBookingSeatsScreen;
