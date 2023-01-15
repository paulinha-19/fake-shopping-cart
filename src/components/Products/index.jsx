import React from 'react';
import { Box, Toolbar } from "@mui/material";
import { ProductItem } from './ProductItem';

export const Products = ({ data, error, isLoading, isFetching }) => {
  return (
    <Box>
      <Toolbar />
      {isLoading || isFetching ? (
        <p>Carregando os produtos...</p>
      ) : error ? (
        <p>Ocorreu um erro :\</p>
      ) : (
        <Box
          sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
        >
          {data?.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </Box>
      )}
    </Box>
  )
}
