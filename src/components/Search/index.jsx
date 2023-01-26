import React from 'react';
import { Box } from '@mui/material';

export const SearchResult = ({ filterProducts }) => {
    return (
        <Box>
            {filterProducts().map((product) => {
                return (
                    <Box key={product.id}>
                        <li>{product.title}</li>
                    </Box>
                );
            })}
        </Box>
    )
}
