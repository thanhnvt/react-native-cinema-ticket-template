import React, { useRef, useState } from "react";
import { View, StyleSheet, ViewToken, ImageBackground } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useSelector } from "react-redux";
import { RootState } from "../../stores";
import { MovieType } from "../../types/MovieTypes";
import MovieComponent from "../../components/MovieComponent";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Pagination from "../../components/Paginagition";
import ScreenKey from "../../constants/ScreenKey";
import { RootStackParamList } from "../../types/NavigationType";

const MoviesScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const { movies } = useSelector((state: RootState) => state.movies);

  const [paginationIndex, setPaginationIndex] = useState(0);

  const scrollX = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
  }) => {
    if (viewableItems[0].index) {
      setPaginationIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const renderItem = ({ item, index }: { item: MovieType; index: number }) => {
    const onBooking = () => {
      navigation.navigate(ScreenKey.TICKETS_BOOKING_CINEMA_SCREEN, {
        movie: item,
      });
    };

    return (
      <MovieComponent
        movie={item}
        scrollX={scrollX}
        index={index}
        onBooking={onBooking}
      />
    );
  };

  return (
    <ImageBackground
      style={styles.container}
      source={{
        uri: movies[paginationIndex]?.image,
      }}
      blurRadius={99}
      imageStyle={{ opacity: 80 }}
    >
      <Animated.FlatList
        data={movies}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        pagingEnabled
        onScroll={onScrollHandler}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainerStyle: {
    alignItems: "center",
  },
});

export default MoviesScreen;
