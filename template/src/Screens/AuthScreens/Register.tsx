import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Alert} from 'react-native';

import {images} from '../../assets';
import InputBoxs from '../../Components/InputBoxs';

import {Colors} from '../../Utils/Constants';
import {Strings} from '../../Utils/Strings';
import IButton from '../../Components/IButton';
import {useAppDispatch} from '../../hooks/Hooks';
import {RegisterUser} from '../../redux/auth/authActions';

const Register = (props: any) => {
  const [email, setEmail] = useState<String>('');
  const [password, setPassword] = useState<String>('');
  const [loading, setLoading] = useState<Boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  const isValidEmail = (email: String) => {
    var regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email.toLowerCase());
  };

  const Checking = async () => {
    setLoading(true);
    if (!email) {
      Alert.alert('User Name Required!');
      setLoading(false);
    } else if (!password) {
      Alert.alert('Please Enter Password!');
      setLoading(false);
    } else if (!isValidEmail(email)) {
      Alert.alert('Invalid Email');
      setLoading(false);
    } else {
      const data = {
        email,
        password,
      };
      dispatch(
        RegisterUser({
          email,
          password,
          onFailure: onFailRegister,
          onSuccess: onSucessRegister,
        }),
      );
    }
  };

  const onSucessRegister = () => {
    setLoading(false);
    Alert.alert('Success Register');
  };

  const onFailRegister = () => {
    setLoading(false);
    Alert.alert(`${Strings.createAccountFail}`);
  };

  const onSignIn = () => {
    props.navigation.goBack();
  };

  const InputContainer = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={{height: 30}} />
        <Text style={styles.header}>{Strings.createAccount}</Text>
        <View style={{height: 40}} />

        <InputBoxs
          image={images.USER}
          value={email}
          onChangeText={(t: String) => setEmail(t)}
          placeholder={Strings.emailAddress}
        />
        <InputBoxs
          image={images.LOCK}
          value={password}
          secureTextEntry
          onChangeText={(t: String) => setPassword(t)}
          placeholder={Strings.password}
        />

        <View style={{height: 30}} />
        <IButton
          onPress={() => Checking()}
          title={Strings.register}
          loading={loading}
        />
        <View style={{height: 20}} />
        <Text style={{...styles.forgotText, alignSelf: 'center'}}>
          <Text style={{color: Colors.black}}>{Strings.alreadyAccount}</Text>{' '}
          {/* {Strings.signIn} */}
          <Text onPress={() => onSignIn()}>{Strings.signIn}</Text>
        </Text>
        <View style={{height: 20}} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 0.45}}></View>

      <View style={{flex: 0.55, backgroundColor: Colors.orange}}></View>
      <View style={{position: 'absolute', alignItems: 'center', top: 150}}>
        {InputContainer()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Off_White,
  },
  header: {
    fontSize: 25,
    color: Colors.black,
  },
  inputContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    elevation: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    alignItems: 'center',

    width: '90%',
  },
  forgotText: {
    color: Colors.orange,
    alignSelf: 'flex-end',
    marginTop: 10,
    fontSize: 12,
  },
  Btn: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 7,
    backgroundColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Register;
