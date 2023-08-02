import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Peter Doe",
		email: "PeterDoe@gmail.com",
		github: "Pet",
	},
	{
		id: "2",
		name: "Peter Doe",
		email: "PeterDoe@gmail.com",
		github: "Razul",
	},
	{
		id: "3",
		name: "Peter Doe",
		email: "PeterDoe@gmail.com",
		github: "Kanil",
	},
];

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWhitId extends User {
	id: UserId;
}

const initialState: UserWhitId[] = (() => {
	const persistedState = localStorage.getItem("__redux_state__");
	if (persistedState) {
		return JSON.parse(persistedState).users;
	}
	return DEFAULT_STATE;
})();

export const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			state.push({ id, ...action.payload });
			console.log("entre");
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollBackUser: (state, action: PayloadAction<UserWhitId>) => {
			const isUserAlredyDefine = state.some(
				(user) => user.id === action.payload.id,
			);
			if (!isUserAlredyDefine) {
				return [...state, action.payload];
			}
		},
	},
});

export default userSlice.reducer;

export const { deleteUserById, addNewUser, rollBackUser } = userSlice.actions;
