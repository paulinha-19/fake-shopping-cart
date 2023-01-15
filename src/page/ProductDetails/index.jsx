import React from 'react';
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useGetSingleProductQuery } from "../../features/api/shopApiSlice";
import { addItemCart } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Rating, Stack } from "@mui/material";

export const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();
  const { data, error, isLoading, isFetching } = useGetSingleProductQuery(
    productId
  );

  const handleAddToCart = (data) => {
    dispatch(addItemCart(data));
    navigate("/cart");
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <div className="home-container">
      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Unexpected error occured...</p>
      ) : (
        <>
          <div className="products">
            <div key={data.id} className="product">
              <h3>{data.title}</h3>
              <img src={data.image} alt={data.name} />
              <div className="details">
                <span>{data.description}</span>
                <span className="price">${data.price}</span>
                <Stack spacing={1}>
                  <Rating
                    name="half-rating-read"
                    defaultValue={data.rating.rate}
                    precision={0.5}
                    readOnly
                  />
                  {/* <span>{data.rating.count}</span> */}
                </Stack>
              </div>

              <button
                className="btn btn-success"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleAddToCart(data)}
              >
                {isHover ? <AddShoppingCartIcon /> : "Adicionar ao carrinho"}
              </button>
              <br />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
