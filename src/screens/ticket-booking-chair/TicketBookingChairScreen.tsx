import React, { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { space } from "../../theme/size";
import { colors } from "../../theme/colors";
import { ChairType, CinemaChairsType } from "../../types/CinemaTypes";
import api from "../../services";
import AppButton from "../../components/AppButton";

type ChairProps = {
  chair: ChairType;
};

const ChairItem: React.FC<ChairProps> = ({ chair }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const backgroundColor = useMemo(() => {
    if (chair?.isBooked) {
      return "gray";
    }
    if (isSelected) {
      return colors.orange;
    }
    return "green";
  }, [chair?.isBooked, isSelected]);
  const onSelect = () => {
    setIsSelected(!isSelected);
  };
  return (
    <Pressable
      style={[styles.chairItemContainer, { backgroundColor: backgroundColor }]}
      disabled={chair?.isBooked}
      onPress={onSelect}
    >
      <Text>{chair?.name}</Text>
    </Pressable>
  );
};

type ChairGroupProps = {
  chairs: ChairType[][];
};

const ChairGroup: React.FC<ChairGroupProps> = ({ chairs }) => {
  return (
    <View style={styles.chairColumContainer}>
      {chairs.map((chairRow, index) => {
        return (
          <View style={styles.chairRowContainer} key={`chair-row-${index}`}>
            {chairRow.map((chair) => {
              return <ChairItem chair={chair} key={chair?.name} />;
            })}
          </View>
        );
      })}
    </View>
  );
};

const TicketBookingChairScreen = () => {
  const [chair, setChair] = useState<CinemaChairsType>();
  useEffect(() => {
    getChairs();
  }, []);
  const getChairs = async () => {
    const data = await api.cinema.getChairsByMovieShowId("12");
    if (data?.single?.length || data?.couple?.length) {
      setChair(data);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.chairContainer}>
          <View style={styles.screenContainer}>
            <View style={styles.screen} />
            <Text>Screen</Text>
            <View style={styles.noteContainer}>
              <View style={styles.noteItemContainer}>
                <View style={[styles.noteColor, { backgroundColor: "gray" }]} />
                <Text>Has been booked</Text>
              </View>
              <View style={styles.noteItemContainer}>
                <View
                  style={[styles.noteColor, { backgroundColor: "green" }]}
                />
                <Text>Available</Text>
              </View>
              <View style={styles.noteItemContainer}>
                <View
                  style={[styles.noteColor, { backgroundColor: colors.orange }]}
                />
                <Text>Selected</Text>
              </View>
            </View>
          </View>
          <View style={styles.chairTopContainer}>
            {chair?.single?.length &&
              chair?.single.map((chairs: any, index: number) => (
                <ChairGroup chairs={chairs} key={`chair-single-${index}`} />
              ))}
          </View>
          {chair?.couple?.length && <ChairGroup chairs={chair?.couple} />}
        </View>
      </ScrollView>
      <AppButton text={"Continue"} onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  noteColor: {
    width: space.md * 2,
    height: space.md,
    borderRadius: 4,
  },
  noteItemContainer: {
    flexDirection: "row",
    gap: space.sm,
    alignContent: "center",
    justifyContent: "center",
  },
  noteContainer: {
    flexDirection: "row",
    gap: space.xs,
  },
  container: {
    padding: space.md,
    flex: 1,
  },
  chairContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: space.md * 2,
  },
  chairTopContainer: {
    flexDirection: "row",
    gap: space.md * 3,
  },
  chairRowContainer: {
    flexDirection: "row",
    gap: space.md,
  },
  chairItemContainer: {
    // backgroundColor: colors.orange,
    backgroundColor: "gray",
    width: space.md * 3,
    height: space.md * 2,
    borderRadius: space.xs,
    alignItems: "center",
    justifyContent: "center",
  },
  chairColumContainer: {
    flexDirection: "column",
    gap: space.md,
  },
  screen: {
    height: 15,
    width: 400,
    backgroundColor: "gray",
    marginTop: space.md * 2,
    borderRadius: 1000,
  },
  screenContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: space.xs,
  },
});

export default TicketBookingChairScreen;
