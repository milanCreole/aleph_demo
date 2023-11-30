import TouchID from 'react-native-touch-id';
import {
  UserLoginCredentials,
  CheckLoginAvailable,
} from '../../types/UserLoginCredentials';

import {onLogin} from '.';
import {Colors} from '../../Utils/Constants';
import {Strings} from '../../Utils/Strings';

export const LogUserIn = (params: UserLoginCredentials) => {
  return async (dispatch: any) => {
    try {
      const optionalConfigObject = {
        title: Strings.authencationRequired,
        imageColor: Colors.gray,
        imageErrorColor: Colors.error_red,
        sensorDescription: Strings.scanFingerprint,
        sensorErrorDescription: 'No match.',
        cancelText: 'Cancel',
        fallbackLabel: 'Show Passcode',
        unifiedErrors: false,
        passcodeFallback: false,
      };

      TouchID.authenticate(
        'Confirm with your fingerprint to continue.',
        optionalConfigObject,
      )
        .then((success: any) => {
          params.onSuccess();
        })
        .catch((error: any) => {
          params.onFailure();
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const CheckLoginMethodAvailable = (params: CheckLoginAvailable) => {
  return async (dispatch: any) => {
    try {
      const optionalConfigObject = {
        unifiedErrors: false,
        passcodeFallback: false,
      };
      TouchID.isSupported(optionalConfigObject)
        .then(biometryType => {
          if (biometryType) {
            params.onSuccess();
          }
        })
        .catch(error => {
          params.onFailure();
        });
    } catch (error) {
      console.log(error);
    }
  };
};
