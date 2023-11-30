import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Colors} from '../../Utils/Constants';

const Splash = (props: any) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.replace('Login');
    }, 700);
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={Colors.black} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
