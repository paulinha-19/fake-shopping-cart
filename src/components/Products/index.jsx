import React from 'react';
import { Box } from "@mui/material";
import { useGetAllProductsQuery } from '../../features/api/shopApiSlice';
import { ProductItem } from './ProductItem';

export const Products = () => {
  const { data, error, isLoading, isFetching } = useGetAllProductsQuery();
  return (
    <Box>
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
