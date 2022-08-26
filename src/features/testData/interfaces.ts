export interface User {
  id: string;
  name: string;
}

export interface UsersState {
  users: User[];
  status: "idle" | "loading" | "failed";
}

export const initialState: UsersState = {
  users: [],
  status: "idle",
};
