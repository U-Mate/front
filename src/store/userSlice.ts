import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number;
  name: string;
  birthDay: string; // 예: "1990-01-01T00:00:00.000Z"
  email: string;
  plan: number;
  membership: string | null; // "vvip", "vip", "우수", or null
  isLogin?: boolean;
}

const initialState: UserState = {
  id: 0,
  name: '',
  birthDay: '',
  email: '',
  plan: 0,
  membership: null,
  isLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<UserState>) => ({
      ...action.payload,
      isLogin: true,
    }),
    clearUser: () => ({
      ...initialState,
      isLogin: false,
    }),
    updateUserPlan(state, action: PayloadAction<number>) {
      state.plan = action.payload;
    },
  },
});
export const { setUser, clearUser, updateUserPlan } = userSlice.actions;
export default userSlice.reducer;
