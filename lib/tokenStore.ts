let accessToken = "";
let refreshToken = "";
let userData = {};

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const setRefreshToken = (token: string) => {
  refreshToken = token;
};

export const setUserData = (
  userId: string,
  name: string,
  role: string,
  avatar: string
) => {
  userData = { userId, name, role, avatar };
};

export const getAccessToken = () => {
  return accessToken;
};

export const getRefreshToken = () => {
  return refreshToken;
};

export const getUserData = () => {
  return userData;
};
