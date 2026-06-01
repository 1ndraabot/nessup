import api from "./api";

export const registerUser = async(payload) => {
    return await api.post("/register", payload)
};

export const loginUser = async(payload) => {
    return await api.post("/login", payload)
};

