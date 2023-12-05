import {UserLoginCredentials} from '../../types/UserLoginCredentials';

import {onLogin} from '.';



export const LogUserIn = (userCredentials: UserLoginCredentials) => {
  return async (dispatch: any) => {
    try {
      userCredentials.onSuccess()
    } catch (error) {
      console.log('Error!', error);

      userCredentials.onFailure();
    }
  };
};

export const RegisterUser = (userCredentials: UserLoginCredentials) => {
  return async (dispatch: any) => {
    try {
      
    } catch (error) {
      console.log(error);
    }
  };
};
