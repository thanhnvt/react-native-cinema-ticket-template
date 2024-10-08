import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { RootState } from "../../stores";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { fontSize, screenSize, space } from "../../theme/size";
import { MovieType } from "../../types/MovieTypes";
import { colors } from "../../theme/colors";
import { Pressable } from "react-native";
import { useFavorite } from "../../hooks/useFavotite";

const FavoriteItem = ({
  movie,
  onFavorite,
}: {
  movie: MovieType;
  onFavorite: (movie: MovieType) => void;
}) => {
  const onFavoriteMovie = () => {
    onFavorite(movie);
  };
  return (
    <View style={styles.ticketContainer}>
      <Image source={{ uri: movie.image }} style={styles.imgMovie} />
      <View style={styles.ticketInfoContainer}>
        <View style={styles.textNameContainer}>
          <Text>{movie.name}</Text>
          <Pressable onPress={onFavoriteMovie}>
            <Icon name={"heart"} size={space.xl} color={colors.orange} />
          </Pressable>
        </View>
        <Text>{movie?.description}</Text>
        <View style={styles.infoMovieContainer}>
          <Icon name="clock" size={space.md} color={"white"} />
          <Text style={styles.txtInfo}>{movie?.duration}</Text>
          <Icon name="star" size={space.md} color={colors.orange} />
          <Text style={styles.txtInfo}>{movie?.star}</Text>
        </View>
      </View>
    </View>
  );
};

const FavoriteMoviesScreen = () => {
  const { favoriteMovies } = useSelector((state: RootState) => state.movies);
  const { onFavorite } = useFavorite();

  const onFavoriteMovie = async (movie: MovieType) => {
    console.log("onFavoriteMovie");
    await onFavorite({ ...movie, isFavorite: false });
  };
  useEffect(() => {
    console.log("tickets", JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  const renderItem = ({ item }: { item: MovieType }) => {
    return <FavoriteItem movie={item} onFavorite={onFavoriteMovie} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteMovies}
        renderItem={renderItem}
        keyExtractor={(item) => item?._id}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
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
  txtInfo: {
    color: "#fff",
    fontSize: fontSize.sm,
    fontWeight: "500",
  },
});

export default FavoriteMoviesScreen;
