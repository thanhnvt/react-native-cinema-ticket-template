import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Pressable } from "react-native";
import { MovieType } from "../types/MovieTypes";
import { fontSize, screenSize, space } from "../theme/size";
import { colors } from "../theme/colors";
import AppButton from "./AppButton";

type FavoriteItemProp = {
  movie: MovieType;
  onFavorite: (movie: MovieType) => void;
  onBooking: (movie: MovieType) => void;
};

const FavoriteItem = ({ movie, onFavorite, onBooking }: FavoriteItemProp) => {
  const onFavoriteMovie = () => {
    onFavorite(movie);
  };

  const onBookingMovie = () => {
    onBooking(movie);
  };

  return (
    <View style={styles.movieContainer}>
      <View>
        <Image source={{ uri: movie.image }} style={styles.imgMovie} />
      </View>
      <View style={styles.movieInfoContainer}>
        <View style={styles.textNameContainer}>
          <Text style={styles.txtMovie}>{movie.name}</Text>
          <Pressable onPress={onFavoriteMovie}>
            <Icon name={"heart"} size={space.xl} color={colors.orange} />
          </Pressable>
        </View>
        <Text numberOfLines={3}>{movie?.description}</Text>
        <View style={styles.infoMovieContainer}>
          <Icon name="clock" size={space.md} color={"gray"} />
          <Text style={styles.txtInfo}>{movie?.duration}</Text>
          <Icon name="star" size={space.md} color={colors.orange} />
          <Text style={styles.txtInfo}>{movie?.star}</Text>
        </View>
        <AppButton text={"Booking"} onPress={onBookingMovie} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    padding: space.xs,
    borderRadius: space.xs,
  },
  imgMovie: {
    aspectRatio: 580 / 936,
    width: space.md * 6,
    borderRadius: space.xs,
  },
  movieInfoContainer: {
    flexDirection: "column",
    gap: space.xs,
    flex: 1,
  },
  txtMovie: {
    fontWeight: "700",
    fontSize: fontSize.lg,
    width: screenSize.width * 0.5,
  },
  textNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoMovieContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.xs,
  },
  txtInfo: {
    fontSize: fontSize.sm,
    fontWeight: "500",
  },
});

const propsAreEqual = (
  prevProps: FavoriteItemProp,
  nextProps: FavoriteItemProp
) => {
  return prevProps.movie.isFavorite === nextProps.movie.isFavorite;
};

export default React.memo(FavoriteItem, propsAreEqual);
