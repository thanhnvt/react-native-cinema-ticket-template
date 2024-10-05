import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {space} from '../../theme/size';
import {colors} from '../../theme/colors';

const chairLeft = [
  ['A1', 'A2', 'A3', 'A4'],
  ['A5', 'A6', 'A7', 'A8'],
  ['A9', 'A10', 'A11', 'A12'],
  ['A13', 'A14', 'A15', 'A16'],
  ['A17', 'A18', 'A19', 'A20'],
];

const chairRight = [
  ['B1', 'B2', 'B3', 'B4'],
  ['B5', 'B6', 'B7', 'B8'],
  ['B9', 'B10', 'B11', 'B12'],
  ['B13', 'B14', 'B15', 'B16'],
  ['B17', 'B18', 'B19', 'B20'],
];

const chairTop = [chairLeft, chairRight];

const chairBehind = [
  ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'],
  ['C9', 'C10', 'C11', 'C12', 'C13', 'C14', 'C15', 'C16'],
];

type ChairProps = {
  chair: string;
};

const ChairItem: React.FC<ChairProps> = ({chair}) => {
  return (
    <View style={styles.chairItemContainer}>
      <Text>{chair}</Text>
    </View>
  );
};

type ChairGroupProps = {
  chairs: string[][];
};
const ChairGroup: React.FC<ChairGroupProps> = ({chairs}) => {
  return (
    <View style={styles.chairColumContainer}>
      {chairs.map(chairRow => {
        return (
          <View style={styles.chairRowContainer}>
            {chairRow.map(chair => {
              return <ChairItem chair={chair} />;
            })}
          </View>
        );
      })}
    </View>
  );
};

const TicketBookingChairScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.chairContainer}>
          <View style={styles.screenContainer}>
            <View style={styles.screen} />
            <Text>Screen</Text>
          </View>
          <View style={styles.chairTopContainer}>
            {chairTop?.length &&
              chairTop.map(chairs => <ChairGroup chairs={chairs} />)}
          </View>
          {chairBehind?.length && <ChairGroup chairs={chairBehind} />}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: space.md,
  },
  chairContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: space.md * 2,
  },
  chairTopContainer: {
    flexDirection: 'row',
    gap: space.md * 3,
  },
  chairRowContainer: {
    flexDirection: 'row',
    gap: space.md,
  },
  chairItemContainer: {
    backgroundColor: colors.orange,
    width: space.md * 3,
    height: space.md * 2,
    borderRadius: space.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chairColumContainer: {
    flexDirection: 'column',
    gap: space.md,
  },
  screen: {
    height: 15,
    width: 400,
    backgroundColor: 'gray',
    marginTop: space.md * 2,
    borderRadius: 1000,
  },
  screenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: space.xs,
  },
});

export default TicketBookingChairScreen;
