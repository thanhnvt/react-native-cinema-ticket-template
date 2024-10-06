import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import Dates from "../../assets/json/date.json";
import { DAYS } from "../../constants/DateConstants";
import { fontSize, space } from "../../theme/size";
import { colors } from "../../theme/colors";
import api from "../../services";
import { CinemaType } from "../../types/CinemaTypes";

const TicketBookingCinemaScreen = () => {
  const [dateSelected, setDateSelected] = React.useState(Dates[0].date);
  const [cinemas, setCinemas] = React.useState<Array<CinemaType>>();

  const movieId = "123";

  useEffect(() => {
    if (dateSelected) {
      getMovieShow(dateSelected, movieId);
    }
  }, [dateSelected]);

  const getMovieShow = async (date: string, movieId: string) => {
    const data = await api.cinema.getMovieShow(date, movieId);
    if (data && data.length) {
      setCinemas(data);
    }
  };

  const onSelectDate = ({ date }: { date: string }) => {
    setDateSelected(date);
    //Load new cinemas by date & movieId
  };

  return (
    <ScrollView style={styles.container}>
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
      <View style={styles.cinemaContainer}>
        {cinemas?.length &&
          cinemas.map((cm) => {
            return (
              <View key={cm._id} style={styles.cinemaItemContainer}>
                <Image
                  source={{
                    uri: cm.image,
                  }}
                  style={styles.imgCinema}
                />
                <Text style={styles.txtCinema}>{cm.name}</Text>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  txtCinema: {
    color: "white",
    fontSize: fontSize.md,
    fontWeight: "700",
    textAlign: "center",
  },
  imgCinema: {
    aspectRatio: 1 / 1,
    width: "auto",
  },
  cinemaItemContainer: {
    backgroundColor: colors.primary,
    padding: space.xs,
    borderRadius: space["2xs"],
    flexDirection: "column",
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
