import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../hooks/Hooks';
import IButton from '../../Components/IButton';
import {Strings} from '../../Utils/Strings';
import {Colors} from '../../Utils/Constants';

const Profile = (props: any) => {
  // const usr = useAppSelector((state: any) => state.auth.currentUser);

  const onLogout = () => {
    props.navigation.replace('AuthStack');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <View style={{height: 20}} />

      <Text>Email: </Text>
      <View style={{height: 20}} />
      <IButton onPress={() => onLogout()} title={Strings.logout} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    color: Colors.black,
  },
});
