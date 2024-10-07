import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { RootState } from "../../stores";
import { useSelector } from "react-redux";
import { CinemaPaymentRequestType } from "../../types/CinemaTypes";
import { space } from "../../theme/size";

const TicketsBookedItem = ({
  ticket,
}: {
  ticket: CinemaPaymentRequestType;
}) => {
  const { movie, cinema, seats, showTime } = ticket;
  return (
    <View style={styles.ticketContainer}>
      <Image source={{ uri: movie.image }} style={styles.imgMovie} />
      <View style={styles.ticketInfoContainer}>
        <Text>{movie.name}</Text>
        <Text>{movie.startTime}</Text>
        <Text>{cinema?.name}</Text>
        <Text>{cinema?.address}</Text>
        <Text>{showTime?.value}</Text>
      </View>
    </View>
  );
};

const TicketsBookedScreen = () => {
  const { tickets } = useSelector((state: RootState) => state.ticket);

  useEffect(() => {
    console.log("tickets", JSON.stringify(tickets));
  }, [tickets]);

  const renderItem = ({ item }: { item: CinemaPaymentRequestType }) => {
    return <TicketsBookedItem ticket={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tickets}
        renderItem={renderItem}
        keyExtractor={(item) => item.movie?._id}
        contentContainerStyle={{ gap: space.sm, padding: space.sm }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: { gap: space.sm, padding: space.sm },
  ticketInfoContainer: {
    flexDirection: "column",
    gap: space["3xs"],
    flex: 1,
  },
  container: {
    flex: 1,
  },
  imgMovie: {
    aspectRatio: 580 / 936,
    width: 80,
    borderRadius: space.xs,
  },
  ticketContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    padding: space.xs,
    borderRadius: space.xs,
  },
});

export default TicketsBookedScreen;
