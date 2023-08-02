import { Middleware, configureStore } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer, { rollBackUser } from "./users/slice";

const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("__redux_state__", JSON.stringify(store.getState()));
	};

const syncWithDataBase: Middleware = (store) => (next) => (action) => {
	const { type, payload } = action;
	const previusState = store.getState();

	next(action);

	if (type === "users/deleteUserById") {
		const userIdToRemove = payload;
		const userToRemove = previusState.users.find((user) => user.id === payload);
		fetch(
			`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`,
			{
				method: "DELETE",
			},
		)
			.then((res) => {
				if (res.ok) toast.success("Usuario guardado correctamente");
			})
			.catch(() => {
				toast.error("paso algo malo mano");
				if (userToRemove) store.dispatch(rollBackUser(userToRemove));
				console.log("error");
			});
	}
};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: [persistanceLocalStorageMiddleware, syncWithDataBase],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
