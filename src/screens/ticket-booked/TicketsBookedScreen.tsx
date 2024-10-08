import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { RootState } from "../../stores";
import { useSelector } from "react-redux";
import { CinemaPaymentRequestType } from "../../types/CinemaTypes";
import { space } from "../../theme/size";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/NavigationType";
import ScreenKey from "../../constants/ScreenKey";

const TicketsBookedItem = ({
  ticket,
  onPress,
}: {
  ticket: CinemaPaymentRequestType;
  onPress: () => void;
}) => {
  const { movie, cinema, seats, showTime } = ticket;
  return (
    <Pressable style={styles.ticketContainer} onPress={onPress}>
      <Image source={{ uri: movie.image }} style={styles.imgMovie} />
      <View style={styles.ticketInfoContainer}>
        <Text>{movie.name}</Text>
        <Text>{movie.startTime}</Text>
        <Text>{cinema?.name}</Text>
        <Text>{cinema?.address}</Text>
        <Text>{showTime?.value}</Text>
      </View>
    </Pressable>
  );
};

const TicketsBookedScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const { tickets } = useSelector((state: RootState) => state.ticket);

  const renderItem = ({ item }: { item: CinemaPaymentRequestType }) => {
    const onPress = () => {
      console.log("onPress", item);
      navigation?.navigate(ScreenKey.TICKET_DETAIL_SCREEN, { ...item });
    };
    return <TicketsBookedItem ticket={item} onPress={onPress} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tickets}
        renderItem={renderItem}
        keyExtractor={(item) => item.movie?._id}
        contentContainerStyle={styles.contentContainerStyle}
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
