import React, { useMemo } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { space } from "../../theme/size";
import { IconImages } from "../../assets/images";
import AppButton from "../../components/AppButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/NavigationType";
import ScreenKey from "../../constants/ScreenKey";
import { usePayment } from "../../hooks/usePayment";
import TextRow from "../../components/TextRow";
import { useSelector } from "react-redux";
import { RootState } from "../../stores";

const PaymentScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, ScreenKey.PAYMENT_SCREEN>) => {
  const { user } = useSelector((state: RootState) => state.auth);
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
