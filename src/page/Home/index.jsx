import React from 'react';
import { Products } from "../../components/Products/index";
import { useGetAllProductsQuery } from '../../features/api/shopApiSlice';

export const Home = () => {
  const { data, error, isLoading, isFetching } = useGetAllProductsQuery();
  return (
    <div >
      <Products data={data} error={error} isLoading={isLoading} isFetching={isFetching} />
    </div>
  )
}
