import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import Dates from "../../assets/json/date.json";
import { DAYS } from "../../constants/DateConstants";
import { fontSize, space } from "../../theme/size";
import { colors } from "../../theme/colors";
import api from "../../services";
import { CinemaType, TimeSlotType } from "../../types/CinemaTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/NavigationType";
import ScreenKey from "../../constants/ScreenKey";

const TicketBookingCinemaScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<
  RootStackParamList,
  ScreenKey.TICKETS_BOOKING_CINEMA_SCREEN
>) => {
  const [dateSelected, setDateSelected] = React.useState(Dates[0].date);
  const [cinemas, setCinemas] = React.useState<Array<CinemaType>>();
  const [cinemaSelected, setCinemaSelected] = React.useState<CinemaType>();

  const movieId = route?.params?.movie?._id;

  useEffect(() => {
    if (dateSelected) {
      getMovieShow(dateSelected, movieId);
    }
  }, [dateSelected]);

  const getMovieShow = async (date: string, movieId: string) => {
    const data = await api.cinema.getMovieShow(date, movieId);
    if (data && data.length) {
      setCinemaSelected(data[0]);
      setCinemas(data);
    }
  };

  const onSelectDate = ({ date }: { date: string }) => {
    setDateSelected(date);
  };

  const renderHeader = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dateViewContainer}
      >
        {Dates.map((date) => {
          return (
            <Pressable
              key={date.date}
              style={[
                styles.dateContainer,
                {
                  backgroundColor:
                    dateSelected === date.date ? colors.orange : "white",
                },
              ]}
              onPress={() => onSelectDate(date)}
            >
              <Text
                style={[
                  styles.txtDateIndex,
                  { color: dateSelected === date.date ? "white" : "black" },
                ]}
              >
                {DAYS[date.dayIndex]}
              </Text>
              <Text
                style={[
                  styles.txtDate,
                  { color: dateSelected === date.date ? "white" : "black" },
                ]}
              >
                {date.date}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    );
  };

  const renderItem = ({ item }: { item: CinemaType }) => {
    const onSelectCinema = () => {
      setCinemaSelected(item);
    };
    const onTimeSlotPress = (timeSlot: TimeSlotType) => {
      navigation.navigate(ScreenKey.TICKETS_BOOKING_SEAT_SCREEN, {
        movie: route?.params?.movie,
        cinema: cinemaSelected,
        showTime: timeSlot,
      });
    };
    return (
      <Pressable style={styles.cinemaItemContainer} onPress={onSelectCinema}>
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.imgCinema}
        />
        <View style={styles.cinemaInfoContainer}>
          <Text style={styles.txtCinema}>{item.name}</Text>
          <Text style={styles.txtAddress} numberOfLines={2}>
            {item.address}
          </Text>
          <View style={styles.timeSlotContainer}>
            {cinemaSelected?._id === item._id &&
              item?.timeSlots?.map((timeSlot: TimeSlotType) => {
                return (
                  <Pressable
                    style={styles.timeSlotItemContainer}
                    key={timeSlot._id}
                    onPress={() => onTimeSlotPress(timeSlot)}
                  >
                    <Text>{timeSlot.value}</Text>
                  </Pressable>
                );
              })}
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={cinemas ?? []}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  timeSlotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: space.xs,
  },
  timeSlotItemContainer: {
    padding: space.xs,
    borderWidth: 1,
    borderColor: colors.orange,
    borderRadius: space.xs,
  },
  cinemaInfoContainer: {
    flexDirection: "column",
    gap: space.xs,
    flex: 1,
  },
  txtCinema: {
    fontSize: fontSize.md,
    fontWeight: "700",
  },
  txtAddress: {
    fontSize: fontSize.sm,
    fontWeight: "500",
    flex: 1,
  },
  imgCinema: {
    aspectRatio: 1 / 1,
    width: space.md * 3,
  },
  cinemaItemContainer: {
    padding: space.xs,
    flexDirection: "row",
    gap: space.xs,
  },
  cinemaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: space.md,
    alignItems: "center",
    justifyContent: "center",
  },
  dateViewContainer: {
    flexDirection: "row",
    gap: space.xs,
    padding: space.xs,
    paddingHorizontal: space["2xs"],
  },
  container: {
    backgroundColor: "white",
  },
  dateContainer: {
    flexDirection: "column",
    gap: space.sm,
    padding: space.xs,
    paddingHorizontal: space["2xs"],
    alignItems: "center",
    borderRadius: space.sm,
  },
  txtDate: {
    fontSize: fontSize.md,
    fontWeight: "700",
  },
  txtDateIndex: {
    fontSize: fontSize.sm,
    fontWeight: "400",
  },
});

export default TicketBookingCinemaScreen;
