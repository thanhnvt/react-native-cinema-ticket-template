import React from "react";
import { View, StyleSheet, Image, FlatList } from "react-native";
import { RootState } from "../../stores";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { fontSize, space } from "../../theme/size";
import { MovieType } from "../../types/MovieTypes";
import { colors } from "../../theme/colors";
import { useFavorite } from "../../hooks/useFavorite";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/NavigationType";
import ScreenKey from "../../constants/ScreenKey";
import FavoriteItem from "../../components/FavoriteItem";

const FavoriteMoviesScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const { favoriteMovies } = useSelector((state: RootState) => state.movies);
  const { onFavorite } = useFavorite();

  const onFavoriteMovie = async (movie: MovieType) => {
    await onFavorite({ ...movie, isFavorite: false });
  };

  const onBooking = (movie: MovieType) => {
    navigation.navigate(ScreenKey.TICKETS_BOOKING_CINEMA_SCREEN, {
      movie: movie,
    });
  };

  const renderItem = ({ item }: { item: MovieType }) => {
    return (
      <FavoriteItem
        movie={item}
        onFavorite={onFavoriteMovie}
        onBooking={onBooking}
      />
    );
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
  contentContainerStyle: { gap: space.sm, padding: space.sm },

  container: {
    flex: 1,
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
});

export default FavoriteMoviesScreen;
