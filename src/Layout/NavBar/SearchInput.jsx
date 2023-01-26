import React, { useState, useMemo } from 'react'
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useGetAllProductsQuery } from '../../services/features/api/shopApiSlice';
import { SearchResult } from '../../components/Search';

export const SearchInput = () => {
    const [searchProduct, setSearchProduct] = useState("");
    const { data, error, isError, isLoading, isFetching } = useGetAllProductsQuery();
    const handleChangeSearch = (event) => {
        const { value } = event.target
        setSearchProduct(value);
        console.log(value);
    };

    const filterProducts = () => {
        return data.filter((product) => {
            return product.title.toLowerCase().includes(searchProduct.toLowerCase());
        });
    }

    // const filterProduct = useMemo(() => {
    //     return data.filter((product) => {
    //         return product.title.toLowerCase().includes(searchProduct.toLowerCase());
    //     })
    // })

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
                value={searchProduct}
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
