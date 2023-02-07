import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
    "search/fetchData",
    async (arg, { rejectWithValue }) => {
        try {
            const response = await axios.get("https://fakestoreapi.com/products");
            return response.data;
        } catch (error) {
            throw rejectWithValue(
                `${error.code}. Status code: ${error.response.status}`
            );
        }
    }
);

const searchSlice = createSlice({
    name: "search",
    initialState: {
        apiData: [],
        filteredData: [],
        searchTerm: "",
        isLoading: true,
        error: null
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            state.filteredData = state.apiData.filter((product) => {
                return state.searchTerm.trim().toLocaleLowerCase() === ""
                    ? product
                    :
                    product.title.toLowerCase().includes(state.searchTerm.trim().toLowerCase())
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.apiData = action.payload;
        });
        builder.addCase(fetchData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});

export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
