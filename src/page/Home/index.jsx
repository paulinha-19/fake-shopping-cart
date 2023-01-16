import React from 'react';
import { Products } from "../../components/Products/index";
import { useGetAllProductsQuery } from '../../services/features/api/shopApiSlice';

export const Home = () => {
  const { data, error, isError, isLoading, isFetching } = useGetAllProductsQuery();
  return (
    <div >
      <Products data={data} error={error} isError={isError} isLoading={isLoading} isFetching={isFetching} />
    </div>
  )
}
