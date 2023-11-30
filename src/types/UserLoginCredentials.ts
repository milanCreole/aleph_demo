export type UserLoginCredentials = {
  onSuccess: () => void;
  onFailure: () => void;
};

export type UserLogoutCredential = {
  userId: any;
};

export type CheckLoginAvailable = {
  onSuccess: () => void;
  onFailure: () => void;
};
