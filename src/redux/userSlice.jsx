import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    users: [],
    loading: false,
    error: null,
    status: 'idle',
    createdUser: null,
};

// const URL = "https://cafd85c0721497fd85df.free.beeceptor.com/api/users";
// const URL = "https://ca12c1311ca61af99ba6.free.beeceptor.com/api/users/";
// const URL = "https://ca12deb5fb23dd44a3c4.free.beeceptor.com/api/users/";
// const URL = "https://ca58c8171391ebcd1dd4.free.beeceptor.com/api/users/";
const URL = "https://ca99e60be4004a019b03.free.beeceptor.com/api/users/";

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
    const response = await axios.get(URL);
    return response.data;
});

export const createUsers = createAsyncThunk("createUsers", async (newUser) => {
    const response = await axios.post(URL, newUser);
    return response.data;
});

export const updateUsers = createAsyncThunk("updateUsers", async (data) => {
    const response = await axios.patch(`${URL}${data.id}`, data);
    return response.data;
});

export const deleteUsers = createAsyncThunk("deleteUsers", async (id) => {
    await axios.delete(`${URL}${id}`);
    return id;
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                console.log("Fetched users:", action.payload);
                
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createUsers.fulfilled, (state, action) => {
                console.log("🚀 ~ .addCase ~ action:", action)
                state.loading = true;
                state.users.push(action.payload);
            })
            .addCase(updateUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map((element) =>
                  element.id === action.payload.id ? action.payload : element
                );
                console.log("🚀 ~ .addCase ~ action.payload.id:", action.payload.id)
            })
            .addCase(deleteUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((element) => element.id !== action.payload);
                console.log("Deleted user ID:", action.payload.id);
            });
    }
});

export default userSlice.reducer;