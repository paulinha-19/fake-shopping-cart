import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopApiSlice = createApi({
  reducerPath: "fakeStoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `products`
    }),
    getSingleProduct: builder.query({
      query: (productId) => `products/${productId}`
    }),
    getAllCategories: builder.query({
      query: () => `products/categories`
    }),
    getSingleCategory: builder.query({
      query: (nameCategory) => `products/category/${nameCategory}`
    })
  })
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery
} = shopApiSlice;
