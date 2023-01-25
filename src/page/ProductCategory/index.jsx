import React from 'react';
import { useParams } from "react-router-dom";
import { useGetSingleCategoryQuery } from "../../services/features/api/shopApiSlice";
import { Products } from '../../components/index';
import { Box, Toolbar, Typography } from '@mui/material';
import { AlertToUser, Loading } from '../../components/FeedbackToUser';

export const ProductCategory = () => {
  const { nameCategory } = useParams();
  const { data, error, isError, isLoading, isFetching } = useGetSingleCategoryQuery(
    nameCategory
  );
  return (
    <Box>
      <Toolbar/>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <AlertToUser error={error} variant="filled" severity="error" />
      ) : (
        <Box>
          <Typography variant='h5' textAlign="center">{nameCategory.toUpperCase()}</Typography>
          <Products data={data} error={error} isError={isError} isLoading={isLoading} isFetching={isFetching} />
        </Box>
      )}
    </Box>
  )
}
