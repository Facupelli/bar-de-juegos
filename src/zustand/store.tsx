import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createUserSlice, UserSlice } from "./slices/userSlice";

const useBoundStore = create<UserSlice>()((...a) => ({
  ...createUserSlice(...a),
}));
