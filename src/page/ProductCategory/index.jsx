import React from 'react';
import { useParams, Link } from "react-router-dom";
import { useGetSingleCategoryQuery } from "../../features/api/shopApiSlice";
import { Rating, Stack } from "@mui/material";
import Toolbar from '@mui/material';

export const ProductCategory = () => {
  const { nameCategory } = useParams();
  const { data, error, isLoading, isFetching } = useGetSingleCategoryQuery(
    nameCategory
  );
  return (
    <div className="home-container">
      <h2>{nameCategory}</h2>
      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Unexpected error occured...</p>
      ) : (
        <>
          <div className="products">
            {data?.map((product) => (
              <Link
                style={{
                  textDecoration: "none",
                  color: "#000"
                }}
                to={`/details/${product.id}`}
              >
                <div
                  key={product.id}
                  className="product"
                  style={{
                    "&:hover": {
                      color: "orange"
                    }
                  }}
                >
                  <img src={product.image} alt={product.name} />
                  <p>{product.title}</p>
                  <div className="details">
                    <span className="price">R${product.price}</span>
                    <Stack spacing={1}>
                      <Rating
                        name="half-rating-read"
                        defaultValue={product.rating.rate}
                        precision={0.5}
                        readOnly
                      />
                    </Stack>
                  </div>
                  <br />
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
