import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  freelancerId?: number | null;
  [key: string]: any;
}

interface LoginPayload {
  token: string;
  refreshToken: string;
  user: User;
}

interface UserState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  userDetails: User | null;
}

const loadInitialState = (): UserState => {
  // localStorage is not available during SSR — guard against it
  if (typeof window === "undefined") {
    return {
      isAuthenticated: false,
      token: null,
      refreshToken: null,
      userDetails: null,
    };
  }

  const token = localStorage.getItem("trestech_token");
  const refreshToken = localStorage.getItem("trestech_refresh_token");
  const userDetails = localStorage.getItem("trestech_user");

  return {
    isAuthenticated: !!token,
    token,
    refreshToken,
    userDetails: userDetails ? (JSON.parse(userDetails) as User) : null,
  };
};

const initialState: UserState = loadInitialState();

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
      const { token, refreshToken, user } = action.payload;

      state.isAuthenticated = true;
      state.token = token;
      state.refreshToken = refreshToken;
      state.userDetails = user;

      localStorage.setItem("trestech_token", token);
      localStorage.setItem("trestech_refresh_token", refreshToken);
      localStorage.setItem("trestech_user", JSON.stringify(user));
    },

    setUserDetails: (state, action: PayloadAction<User>) => {
      state.userDetails = action.payload;
      localStorage.setItem(
        "trestech_user",
        JSON.stringify(action.payload)
      );
    },

    removeUserDetails: (state) => {
      state.userDetails = null;
      localStorage.removeItem("trestech_user");
    },

    setFreelancerID: (state, action: PayloadAction<number>) => {
      if (state.userDetails) {
        state.userDetails.freelancerId = action.payload;

        localStorage.setItem(
          "trestech_user",
          JSON.stringify(state.userDetails)
        );
      }
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.userDetails = null;

      localStorage.removeItem("trestech_token");
      localStorage.removeItem("trestech_refresh_token");
      localStorage.removeItem("trestech_user");
    },
  },
});

export const {
  loginSuccess,
  setUserDetails,
  removeUserDetails,
  setFreelancerID,
  logout,
} = userSlice.actions;

export default userSlice.reducer;