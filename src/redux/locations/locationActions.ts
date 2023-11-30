import axios from 'axios';
import {google_api_key} from '../../Utils/Constants';
import {LocationReqParams} from '../../types/LocationParams';
import {onSuccessGetLocations, onFailureGetLocations} from '.';

export const GetLocations = (params: LocationReqParams) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${google_api_key}&location=${params.latitude},${params.longitude}&radius=5000&keyword=Petronas`,
      );

      if (response.data.status == 'OK') {
        if (Array.isArray(response.data.results)) {
          const data = response.data.results.slice(0, 5);

          dispatch(onSuccessGetLocations(data));
        }
      } else {
        dispatch(onFailureGetLocations());
      }
    } catch (error) {
      console.log('Error!', error);
      dispatch(onFailureGetLocations());
    }
  };
};

export const CheckLoginMethodAvailable = () => {
  return async (dispatch: any) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
};
