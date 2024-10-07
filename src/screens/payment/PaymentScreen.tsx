import React, { useMemo } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { SeatType } from "../../types/CinemaTypes";
import { space } from "../../theme/size";
import { IconImages } from "../../assets/images";
import AppButton from "../../components/AppButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/NavigationType";
import ScreenKey from "../../constants/ScreenKey";
import { usePayment } from "../../hooks/usePayment";

const data = {
  movie: {
    _id: "1",
    name: "Black Adam",
    image: "https://i.bbcosplay.com/15715/black-adam1.jpg",
    star: "7.8",
    startTime: "04/10/2024",
    endTime: "04/12/2024",
    duration: "125 Min",
    description:
      "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods--and imprisoned just as quickly--Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
    price: "6$",
  },
  cinema: {
    _id: "1",
    name: "Cinema 1",
    image: "https://roadstreet.vn/wp-content/uploads/2017/10/CGV-logo.png",
    address: "469 Nguyen Huu Tho Street, Tan Hung Ward, District 7, HCMC",
    timeSlots: [
      { _id: "1", value: "9h00~11h00" },
      { _id: "2", value: "11h00~13h00" },
      { _id: "3", value: "13h00~15h00" },
      { _id: "4", value: "15h00~17h00" },
    ],
  },
  showTime: { _id: "4", value: "15h00~17h00" },
  seats: [
    { name: "A8", price: "5", isBooked: false },
    { name: "A18", price: "5", isBooked: false },
    { name: "A19", price: "5", isBooked: false },
    { name: "A20", price: "5", isBooked: false },
    { name: "A15", price: "5", isBooked: false },
    { name: "A14", price: "5", isBooked: false },
  ],
};

const user = {
  _id: "1",
  name: "Nguyen Thanh",
  email: "nguyenthanh@gmail.com",
  password: "123456",
  phone: "0123456789",
  address: "489 NVC, P3, GV, TPHCM",
  avatar: "https://i.imgur.com/ylPJBm7.jpeg",
  createdAt: "2021-01-01T00:00:00.000Z",
  updatedAt: "2021-01-01T00:00:00.000Z",
};

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

const PaymentScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, ScreenKey.PAYMENT_SCREEN>) => {
  const { movie, cinema, showTime, seats } = route.params;
  const { onPayment } = usePayment();
  const total = useMemo(() => {
    const total = seats.reduce((total, seat) => {
      return total + Number.parseInt(seat.price);
    }, 0);
    return total;
  }, [seats]);

  const onRequestPayment = () => {
    Alert.alert("Payment", "Confirm payment", [
      {
        text: "OK",
        onPress: () => {
          onPayment(route.params);
        },
      },
      {
        text: "Cancel",
        onPress: () => {
          console.log("OK");
        },
      },
    ]);
  };

  return (
    <View style={styles.flex}>
      <ScrollView style={styles.container}>
        <View style={styles.personalInfoContainer}>
          <View style={styles.movieContainer}>
            <Image source={{ uri: movie.image }} style={styles.imgMovie} />
            <View style={styles.movieInfoContainer}>
              <Text>{movie.name}</Text>
              <Text>{movie.duration}</Text>
              <Text>{showTime.value}</Text>
              <Text>{cinema?.name}</Text>
              <Text>{cinema?.address}</Text>
            </View>
          </View>
          <View style={styles.columContainer}>
            <Text style={styles.txtUserInfo}>User info</Text>
            <TextRow textLeft="Full name" textRight={user.name} />
            <TextRow textLeft="Email" textRight={user.email} />
            <TextRow textLeft="Phone number" textRight={user.phone} />
            <TextRow textLeft="Address" textRight={user.address} />
          </View>
          <View style={styles.columContainer}>
            <Text style={styles.txtUserInfo}>Seats</Text>
            {seats.map((seat) => {
              return (
                <TextRow
                  key={seat.name}
                  textLeft={seat.name}
                  textRight={`${seat.price}$`}
                />
              );
            })}
            <TextRow textLeft="Total: " textRight={total + "$"} />
          </View>
          <View style={styles.columContainer}>
            <Text style={styles.txtUserInfo}>Payment method</Text>
            <View style={styles.rowCenter}>
              <Image
                source={IconImages.ico_payment_visa}
                style={styles.imgVisa}
              />
              <Text>Visa/Mastercard</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <AppButton text={"Pay"} onPress={onRequestPayment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    flexDirection: "row",
    gap: space.sm,
  },
  container: {
    flex: 1,
    padding: space.md,
    flexDirection: "column",
    gap: space.md,
  },
  personalInfoContainer: {
    flexDirection: "column",
    gap: space.xs,
    borderRadius: space.xs,
    padding: space.xs,
    backgroundColor: "white",
  },
  txtLeft: {},
  txtRight: {},
  textRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txtUserInfo: {
    fontWeight: "700",
  },
  imgMovie: {
    aspectRatio: 580 / 936,
    width: 80,
    borderRadius: space.xs,
  },
  movieInfoContainer: {
    flexDirection: "column",
    gap: space["3xs"],
    flex: 1,
  },
  columContainer: {
    flexDirection: "column",
    gap: space.xs,
    marginTop: space.md,
  },
  imgVisa: {
    aspectRatio: 1 / 1,
    width: 50,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
  },
  flex: {
    flex: 1,
  },
  btnContainer: {
    padding: space.md,
  },
});

export default PaymentScreen;
