import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View, FlatList} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import {google_api_key} from '../../Utils/Constants';
import {useAppDispatch, useAppSelector} from '../../hooks/Hooks';
import {GetLocations} from '../../redux/locations/locationActions';
import ILocationBox from '../../Components/ILocationBox';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 3.9904111;
const LONGITUDE = 101.6031895;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = google_api_key;

const region = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};
const Home = () => {
  const [location, setLocation] = useState(region);
  const locationData = useAppSelector(state => state.location.locations);
  const dispatch = useAppDispatch();
  const [origin, setOrigin] = useState<any>(null);
  const [destination, setDestination] = useState<any>(null);

  useEffect(() => {
    CheckPermission();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(info => {
      const data = {...location};
      data.latitude = info.coords.latitude;
      data.longitude = info.coords.longitude;
      setLocation(data);
      setOrigin({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      });
      dispatch(
        GetLocations({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        }),
      );
    });
  };

  const CheckPermission = async () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => {
        switch (result) {
          case RESULTS.DENIED:
            RequestPermission();
            break;
          case RESULTS.GRANTED:
            getCurrentLocation();
            break;
        }
      })
      .catch(error => {});
  };

  const RequestPermission = async () => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
      switch (result) {
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;

        case RESULTS.GRANTED:
          getCurrentLocation();

          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    });
  };

  const onPressDirection = (data: any) => {
    setDestination({
      latitude: data.geometry.location.lat,
      longitude: data.geometry.location.lng,
    });
    setLocation({
      ...location,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0922 * ASPECT_RATIO,
    });
  };

  const renderItem = (item: any, index: number) => {
    return (
      <ILocationBox
        data={item}
        onPress={data => {
          onPressDirection(data);
        }}
        title={item.name}
      />
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        scrollEnabled={true}
        zoomEnabled={true}
        showsMyLocationButton={true}
        showsUserLocation={true}
        region={location}
        userInterfaceStyle="dark">
        {locationData &&
          locationData.map((item, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: item.geometry.location.lat,
                  longitude: item.geometry.location.lng,
                }}
                title={item.name}
                description={item.vicinity}
              />
            );
          })}

        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
        />
      </MapView>
      <FlatList
        data={locationData}
        renderItem={({item, index}) => renderItem(item, index)}
        style={{position: 'absolute', bottom: 10}}
        horizontal
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    width: width,
    height: height,
  },
});
