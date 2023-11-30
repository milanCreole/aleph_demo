import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView, Alert} from 'react-native';
import {images} from '../../assets';
import {Colors} from '../../Utils/Constants';
import {Strings} from '../../Utils/Strings';
import IButton from '../../Components/IButton';
import {
  CheckLoginMethodAvailable,
  LogUserIn,
} from '../../redux/auth/authActions';
import {useAppDispatch} from '../../hooks/Hooks';

interface Props {
  props: any;
  navigation: any;
}

const Login = (props: any) => {
  const [showBtn, setShowBtn] = useState<Boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    Checking();
  }, []);

  const Checking = () => {
    dispatch(
      CheckLoginMethodAvailable({
        onSuccess: onSucessChecking,
        onFailure: onFailChecking,
      }),
    );
  };

  const onSucessChecking = () => {
    dispatch(
      LogUserIn({
        onFailure: onFailLogin,
        onSuccess: onSucessLogin,
      }),
    );
  };

  const onFailChecking = () => {
    Alert.alert(`${Strings.loginMethodNotAvailable}`);
  };

  const onSucessLogin = () => {
    props.navigation.replace('Home');
  };

  const onFailLogin = () => {
    Alert.alert(`${Strings.loginFailed}`);
    setShowBtn(true);
  };

  const InputContainer = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={{height: 40}} />
        <Image
          source={images.APP_LOGO}
          style={{height: 150, width: 150, marginHorizontal: 50}}
        />
        <View style={{height: showBtn ? 20 : 40}} />

        {showBtn && (
          <>
            <Text style={styles.errorText}>{Strings.pleaseTryAgain}</Text>
            <View style={{height: 20}} />
            <IButton onPress={() => Checking()} title={Strings.signIn} />
            <View style={{height: 20}} />
          </>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 0.45}}></View>
      <View style={{flex: 0.55, backgroundColor: Colors.orange}}></View>
      <View style={styles.inputContainerBox}>{InputContainer()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Off_White,
  },
  inputContainerBox: {
    position: 'absolute',
    alignItems: 'center',
    top: 150,
    padding: 30,
    alignSelf: 'center',
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
    alignSelf: 'center',
    width: '90%',
  },
  errorText: {
    color: Colors.orange,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
  },
});

export default Login;
