import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL + "auth/";

const login = (payload) => {
	return axios.post(`${baseUrl}login`, payload);
};

const setToken = (token) => {
	sessionStorage.setItem("parking-token", token);
};

const setUserId = (id) => {
	sessionStorage.setItem("parking-userId", id);
};

const setSessionUser = (user) => {
	sessionStorage.setItem("parking-user", JSON.stringify(user));
};

const getToken = () => {
	return sessionStorage.getItem("parking-token");
};

const getSessionUser = () => {
	try {
		const user = sessionStorage.getItem("user") || sessionStorage.getItem("user");
		if (!user || user === "undefined" || user === "null") return null;
		return JSON.parse(user);
	} catch (error) {
		console.error("Error parsing user from storage:", error);
		return null;
	}
};

const getUserId = () => {
	return sessionStorage.getItem("parking-userId") || "{}";
};

const loggedIn = () => {
	return sessionStorage.getItem("parking-token") !== null;
};

const logOut = () => {
	sessionStorage.removeItem("parking-userId");
	sessionStorage.removeItem("parking-user");
	sessionStorage.removeItem("parking-token");
};

export { login, setToken, setUserId, setSessionUser, getToken, getSessionUser, getUserId, loggedIn, logOut };
