import React from 'react';
import { Box, Toolbar, Alert } from "@mui/material";
import { ProductItem } from './ProductItem';
import { Loading, AlertToUser } from "../FeedbackToUser";

export const Products = ({ data, error, isError, isLoading }) => {
  return (
    <Box>
      <Toolbar />
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <AlertToUser error={error} variant="filled" severity="error" />
      ) : (
        <Box
          sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
        >
          {data?.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))}
          {/* <div>{isFetching ? 'Fetching...' : null}</div> */}
        </Box>
      )}
    </Box>
  )
}
