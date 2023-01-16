import React from 'react';
import { useParams} from "react-router-dom";
import { useGetSingleCategoryQuery } from "../../services/features/api/shopApiSlice";
import { Products } from '../../components/index';

export const ProductCategory = () => {
  const { nameCategory } = useParams();
  const { data, error, isError, isLoading, isFetching } = useGetSingleCategoryQuery(
    nameCategory
  );
  return (
    <div >
      <h2>{nameCategory}</h2>
      <Products data={data} error={error} isError={isError} isLoading={isLoading} isFetching={isFetching} />
    </div>
  )
}
