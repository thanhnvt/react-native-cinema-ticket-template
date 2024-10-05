/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {MovieType} from '../types/MovieTypes';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {StyleSheet, View} from 'react-native';
import {screenSize} from '../theme/size';

type PaginationProps = {
  items: Array<MovieType>;
  paginationIndex: number;
  scrollX: SharedValue<number>;
};

const Pagination: React.FC<PaginationProps> = ({
  items,
  paginationIndex,
  scrollX,
}) => {
  return (
    <View style={styles.container}>
      {items.map((vl, index) => {
        const pgItemAnimatedStyle = useAnimatedStyle(() => {
          const dotWidth = interpolate(
            scrollX.value,
            [
              (index - 1) * screenSize.width,
              index * screenSize.width,
              (index + 1) * screenSize.width,
            ],
            [8, 20, 8],
          );
          return {
            width: dotWidth,
          };
        });
        return (
          <Animated.View
            key={vl._id}
            style={[
              styles.dot,
              pgItemAnimatedStyle,
              {
                backgroundColor:
                  index === paginationIndex ? 'white' : '#e5e5e5',
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4444',
    margin: 3,
  },
});

export default Pagination;
