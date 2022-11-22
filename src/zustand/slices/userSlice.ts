import create, { StateCreator } from "zustand";
import { User } from "../../types/model";

export interface UserSlice {
  data: User | {};
  setUser: () => void;
}
export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set
) => ({
  data: {},
  setUser: () => set((state) => ({ data: (state.data = {}) })),
});
