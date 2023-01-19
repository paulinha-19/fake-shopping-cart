import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useGetSingleProductQuery } from "../../services/features/api/shopApiSlice";
import { addItemCart } from "../../services/features/cart/cartSlice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Rating, Box, Grid, Typography, Button, Toolbar } from "@mui/material";
import { Span } from '../../assets/styles';
import { Loading, AlertToUser } from "../../components/FeedbackToUser";

export const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();
  const { data, error, isError, isLoading, isFetching } = useGetSingleProductQuery(
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
    <Box>
      <Toolbar />
      {/* <div>{isFetching ? 'Fetching...' : null}</div> */}
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <AlertToUser error={error} variant="filled" severity="error" />
      ) : (
        <Grid container key={data.id} sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
          <Grid item xs={12} sm={8} md={6} lg={4} xl={2}
            sx={{
              maxWidth: {
                xs: "200px",
                sm: "250px",
                md: "280px",
                lg: "350px",
                xl: "400px"
              },
            }}
          >
            <img src={data.image} alt={data.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4} xl={2} sx={{ px: 2 }}>
            <Box sx={{ display: "flex", height: "400px", flexDirection: "column", justifyContent: "center" }}>
              <Typography variant='h6' sx={{ textAlign: "justify" }}>{data.title}</Typography>
              <Typography variant="overline">Categoria: {data.category}</Typography>
              <Span>Sobre o item:</Span>
              <Typography variant="body2" sx={{ textAlign: "justify" }}>{data.description}</Typography>
              <Box sx={{ mt: 2, display: "flex" }}>
                <Rating
                  sx={{ color: "#FFA41C" }}
                  name="half-rating-read"
                  defaultValue={data.rating.rate}
                  precision={0.5}
                  readOnly
                />
                <Span>({data.rating.rate})</Span>
              </Box>
              <Span style={{ marginTop: 15 }}>R${data.price}</Span>
              <Button
                sx={{ mt: 3 }}
                color="success"
                variant='contained'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleAddToCart(data)}
              >
                {isHover ? <AddShoppingCartIcon /> : "Adicionar ao carrinho"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}
