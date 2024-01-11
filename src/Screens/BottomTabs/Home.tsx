// import React, {useEffect, useState} from 'react';
// import {Dimensions, StyleSheet, Text, View, FlatList} from 'react-native';
// import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// import MapViewDirections from 'react-native-maps-directions';
// import Geolocation from '@react-native-community/geolocation';
// import {google_api_key} from '../../Utils/Constants';
// import {useAppDispatch, useAppSelector} from '../../hooks/Hooks';
// import {GetLocations} from '../../redux/locations/locationActions';
// import ILocationBox from '../../Components/ILocationBox';

// const {width, height} = Dimensions.get('window');

// const ASPECT_RATIO = width / height;
// const LATITUDE = 3.9904111;
// const LONGITUDE = 101.6031895;
// const LATITUDE_DELTA = 0.0122;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const GOOGLE_MAPS_APIKEY = google_api_key;

// const region = {
//   latitude: LATITUDE,
//   longitude: LONGITUDE,
//   latitudeDelta: LATITUDE_DELTA,
//   longitudeDelta: LONGITUDE_DELTA,
// };
// const Home = () => {
//   const [location, setLocation] = useState(region);
//   const locationData = useAppSelector(state => state.location.locations);
//   const dispatch = useAppDispatch();
//   const [origin, setOrigin] = useState<any>(null);
//   const [destination, setDestination] = useState<any>(null);

//   useEffect(() => {
//     CheckPermission();
//   }, []);

//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(info => {
//       const data = {...location};
//       data.latitude = info.coords.latitude;
//       data.longitude = info.coords.longitude;
//       setLocation(data);
//       setOrigin({
//         latitude: info.coords.latitude,
//         longitude: info.coords.longitude,
//       });
//       // dispatch(
//       //   GetLocations({
//       //     latitude: info.coords.latitude,
//       //     longitude: info.coords.longitude,
//       //   }),
//       // );
//     });
//   };

//   const CheckPermission = async () => {
//     check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
//       .then(result => {
//         switch (result) {
//           case RESULTS.DENIED:
//             RequestPermission();
//             break;
//           case RESULTS.GRANTED:
//             getCurrentLocation();
//             break;
//         }
//       })
//       .catch(error => {});
//   };

//   const RequestPermission = async () => {
//     request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
//       switch (result) {
//         case RESULTS.DENIED:
//           console.log(
//             'The permission has not been requested / is denied but requestable',
//           );
//           break;

//         case RESULTS.GRANTED:
//           getCurrentLocation();

//           break;
//         case RESULTS.BLOCKED:
//           console.log('The permission is denied and not requestable anymore');
//           break;
//       }
//     });
//   };

//   const onPressDirection = (data: any) => {
//     setDestination({
//       latitude: data.geometry.location.lat,
//       longitude: data.geometry.location.lng,
//     });
//     setLocation({
//       ...location,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0922 * ASPECT_RATIO,
//     });
//   };

//   const renderItem = (item: any, index: number) => {
//     return (
//       <ILocationBox
//         data={item}
//         onPress={data => {
//           onPressDirection(data);
//         }}
//         title={item.name}
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         scrollEnabled={true}
//         zoomEnabled={true}
//         showsMyLocationButton={true}
//         showsUserLocation={true}
//         region={location}
//         userInterfaceStyle="dark">
//         {locationData &&
//           locationData.map((item, index) => {
//             return (
//               <Marker
//                 key={index}
//                 coordinate={{
//                   latitude: item.geometry.location.lat,
//                   longitude: item.geometry.location.lng,
//                 }}
//                 title={item.name}
//                 description={item.vicinity}
//               />
//             );
//           })}

//         {/* <MapViewDirections
//           origin={origin}
//           destination={destination}
//           apikey={GOOGLE_MAPS_APIKEY}
//           strokeWidth={4}
//         /> */}
//       </MapView>
//       {/* <FlatList
//         data={locationData}
//         renderItem={({item, index}) => renderItem(item, index)}
//         style={{position: 'absolute', bottom: 10}}
//         horizontal
//       /> */}
//     </View>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     width: width,
//     height: height,
//   },
// });

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Marker, Region} from 'react-native-maps';

import ClusteredMapView from '../../Components/ClusteredMapView';
import MapZoomPanel from '../../Components/MapZoomPanel';

const getRandomLatitude = (min = 48, max = 56) => {
  return Math.random() * (max - min) + min;
};

const getRandomLongitude = (min = 14, max = 24) => {
  return Math.random() * (max - min) + min;
};

const getRegionForZoom = (lat: number, lon: number, zoom: number) => {
  const distanceDelta = Math.exp(Math.log(360) - zoom * Math.LN2);
  const {width, height} = Dimensions.get('window');
  const aspectRatio = width / height;
  return {
    latitude: lat,
    longitude: lon,
    latitudeDelta: distanceDelta * aspectRatio,
    longitudeDelta: distanceDelta,
  };
};

const getZoomFromRegion = (region: Region) => {
  return Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
};

interface Markers {
  id: number;
  latitude: number;
  longitude: number;
}

function App(): JSX.Element {
  const map = useRef(null);

  const [zoom, setZoom] = useState<number>(18);
  const [markers, setMarkers] = useState<Markers[]>([
    {id: 0, latitude: 53.91326738786109, longitude: 27.523712915343737},
  ]);
  const [region, setRegion] = useState<Region>({
    latitude: 53.91326738786109,
    longitude: 27.523712915343737,
    latitudeDelta: 1.5,
    longitudeDelta: 1.5,
  });

  const generateMarkers = useCallback((lat: number, long: number) => {
    const markersArray = [];

    for (let i = 0; i < 50; i++) {
      markersArray.push({
        id: i,
        latitude: getRandomLatitude(lat - 0.05, lat + 0.05),
        longitude: getRandomLongitude(long - 0.05, long + 0.05),
      });
    }
    setMarkers(markersArray);
  }, []);

  const mapZoomIn = () => {
    if (zoom > 18) {
      setZoom(18);
    } else {
      setZoom(zoom + 1);
      const regn = getRegionForZoom(
        region.latitude,
        region.longitude,
        zoom + 1,
      );
      map.current.animateToRegion(regn, 200);
    }
  };

  const mapZoomOut = () => {
    if (zoom < 3) {
      setZoom(3);
    } else {
      setZoom(zoom - 1);
      const regn = getRegionForZoom(
        region.latitude,
        region.longitude,
        zoom - 1,
      );
      map.current.animateToRegion(regn, 200);
    }
  };

  const onRegionChangeComplete = (newRegion: Region) => {
    setZoom(getZoomFromRegion(newRegion));
    setRegion(newRegion);
  };

  useEffect(() => {
    generateMarkers(region.latitude, region.longitude);
  }, []);

  return (
    <View style={styles.container}>
      <ClusteredMapView
        clusterColor="red"
        ref={map}
        mapType="hybrid"
        style={styles.mapView}
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete}>
        {markers.map(item => (
          <Marker
            key={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
          />
        ))}
      </ClusteredMapView>
      <MapZoomPanel
        onZoomIn={() => {
          mapZoomIn();
        }}
        onZoomOut={() => {
          mapZoomOut();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapView: {flex: 1, width: '100%', height: '100%'},
  customMarker: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
