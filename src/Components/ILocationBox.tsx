import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '../Utils/Constants';

interface Props {
  onPress: (data: any) => void;
  loading?: Boolean;
  title: String;
  data: any;
}

const ILocationBox: React.FC<Props> = ({onPress, data}) => {
  return (
    <TouchableOpacity style={styles.cardView} activeOpacity={1}>
      <View style={styles.cardHeading}>
        <FastImage
          source={{
            uri: 'https://assets.stickpng.com/images/58860bac6f293bbfae451a51.png',
          }}
          style={styles.petrolIcon}
        />
        <Text style={styles.title} numberOfLines={1}>
          {data.name}
        </Text>
      </View>
      <View style={styles.itemSeparatorLine} />
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.sectionBtn} disabled>
          <FastImage
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/5998/5998867.png',
            }}
            style={styles.distanceImg}
          />

          <Text style={{...styles.sectionTitle}} numberOfLines={2}>
            {data.vicinity}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.openRow}>
          <FastImage
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/2/2306.png',
            }}
            style={styles.clockImg}
          />

          <Text style={styles.sectionTitle}>
            {data.opening_hours.open_now ? 'Open' : 'Closed'}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.directionBtn}
        onPress={() => {
          onPress(data);
        }}>
        <Text style={{color: 'white', fontSize: 14}}>Get Direction</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ILocationBox;

const styles = StyleSheet.create({
  cardView: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: Colors.location_back,
    elevation: 8,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    marginHorizontal: 10,
    width: 300,
  },
  petrolIcon: {height: 40, width: 40},
  cardHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: 220,
  },
  title: {color: 'black', fontWeight: 'bold', fontSize: 20},
  itemSeparatorLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  itemContainer: {
    marginTop: 10,
  },
  sectionBtn: {
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    gap: 5,
    paddingHorizontal: 15,
    borderColor: 'black',
    justifyContent: 'space-around',
    backgroundColor: '#F4F2F5',
    alignItems: 'center',
  },
  sectionTitle: {
    color: 'black',
    fontWeight: 'normal',
    fontSize: 14,
  },
  directionBtn: {
    backgroundColor: '#EF8633',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  distanceImg: {width: 30, height: 30},
  clockImg: {width: 15, height: 15},
  openRow: {
    gap: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
