import React, { useEffect, useState } from 'react'
import { Box, TextField, InputAdornment } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import SearchIcon from "@mui/icons-material/Search";
import { fetchData, setSearchTerm } from "../../services/features/search/searchSlice";

export const SearchInput = () => {
    const [noResults, setNoResults] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        searchTerm
    } = useSelector((state) => state.search);

    const handleChangeSearch = (e) => {
        const { value } = e.target
        if (!value) { // value !== ''
            navigate("/search", { state: value, replace: true })
        }
        dispatch(setSearchTerm(value));
        console.log(value);
    };
    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    return (
        <Box
            component="form"
            noValidate
        >
            <TextField
                type="search"
                size='small'
                sx={{
                    width: "100%",
                }}
                id="pesquisar-produto"
                placeholder="Pesquisar"
                value={searchTerm}
                onChange={handleChangeSearch}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
        </Box>
    )
}
