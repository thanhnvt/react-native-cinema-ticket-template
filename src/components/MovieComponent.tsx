import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MovieType } from "../types/MovieTypes";
import { fontSize, screenSize, space } from "../theme/size";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../theme/colors";
import AppButton from "./AppButton";
import { useFavorite } from "../hooks/useFavotite";

type MovieComponentProps = {
  movie: MovieType;
  scrollX: SharedValue<number>;
  index: number;
  onBooking: () => void;
};

const MovieComponent = ({
  movie,
  scrollX,
  index,
  onBooking,
}: MovieComponentProps) => {
  const { onFavorite } = useFavorite();

  const onFavoriteMovie = async () => {
    await onFavorite({ ...movie, isFavorite: !movie.isFavorite });
  };

  const viewAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [
              (index - 1) * screenSize.width,
              index * screenSize.width,
              (index + 1) * screenSize.width,
            ],
            [-screenSize.width * 0.25, 0, screenSize.width * 0.25],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [
              (index - 1) * screenSize.width,
              index * screenSize.width,
              (index + 1) * screenSize.width,
            ],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.itemContainer, viewAnimatedStyle]}>
      <View style={styles.contentContainer}>
        <Image
          source={{
            uri: movie.image,
          }}
          style={styles.imgPoster}
        />
        <View style={styles.infoMovieContainer}>
          <Text style={styles.txtMovieName} numberOfLines={2}>
            {movie?.name}
          </Text>
          <Pressable onPress={onFavoriteMovie}>
            <Icon
              name={"heart"}
              size={space.xl}
              color={movie?.isFavorite ? colors.orange : "white"}
            />
          </Pressable>
        </View>
        <View style={styles.infoMovieContainer}>
          <Icon name="clock" size={space.md} color={"white"} />
          <Text style={styles.txtInfo}>{movie?.duration}</Text>
          <Icon name="star" size={space.md} color={colors.orange} />
          <Text style={styles.txtInfo}>{movie?.star}</Text>
        </View>
        <View>
          <AppButton text={"Booking"} onPress={onBooking} />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  favoriteContainer: {
    top: space.md,
    right: space.md,
    borderWidth: 1,
    borderRadius: 100,
    padding: space["4xs"],
  },
  txtBooking: {
    color: "#fff",
    fontSize: fontSize.md,
    fontWeight: "700",
    paddingHorizontal: space.md * 6,
    padding: space.md,
  },
  btnBooking: {
    backgroundColor: colors.orange,
    borderRadius: space.sm,
    marginVertical: space.sm,
  },
  infoMovieContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.xs,
  },
  txtMovieName: {
    fontSize: fontSize["2xl"],
    fontWeight: "700",
    color: "#fff",
    maxWidth: screenSize.width / 2 + space.md * 6,
    textAlign: "center",
  },
  contentContainer: {
    backgroundColor: colors.primary,
    borderRadius: space.md,
    padding: space["3xs"],
    alignItems: "center",
    gap: space.xs,
    flexDirection: "column",
  },
  itemContainer: {
    width: screenSize.width,
    alignItems: "center",
    gap: 20,
    justifyContent: "center",
  },
  imgPoster: {
    width: screenSize.width / 2 + space.md * 6,
    aspectRatio: 580 / 936,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  txtInfo: {
    color: "#fff",
    fontSize: fontSize.sm,
    fontWeight: "500",
  },
});

export default MovieComponent;
