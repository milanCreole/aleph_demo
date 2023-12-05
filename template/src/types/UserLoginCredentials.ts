export type UserLoginCredentials = {
  email: String;
  password: String;
  onSuccess: () => void;
  onFailure: () => void;
};

export type UserLogoutCredential = {
  userId: any;
};
