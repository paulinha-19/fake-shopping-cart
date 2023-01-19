import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Grid, Divider } from '@mui/material';
import { TextCenter, NewLink, Span } from '../../assets/styles';
import { SubTotal } from './SubTotal';
import { styled } from "@mui/material/styles";
import {
    increasingItemCart,
    decreaseItemCart,
    getTotalCart,
    removeItemCart
} from "../../services/features/cart/cartSlice";

const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
});


export const New = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTotalCart());
    }, [cart, dispatch]);

    const handleIncreasingItemCart = (product) => {
        dispatch(increasingItemCart(product));
    };
    const handleDecreaseItemCart = (product) => {
        dispatch(decreaseItemCart(product));
    };
    const handleRemoveItemCart = (product) => {
        dispatch(removeItemCart(product));
    };
    return (
        <Box sx={{ p: 6 }}>
            <TextCenter weight="600" size="2rem">Carrinho de compras</TextCenter>
            {cart.cartItems.length === 0 ? (
                <TextCenter size="1.2rem" marginT="2rem">Seu carrinho está vazio </TextCenter>
            ) : (
                <Box>
                    {/* <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                        <Typography variant='overline'>Produto</Typography>
                        <Typography variant='overline'>Preço</Typography>
                    </Box> */}
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}
                    >
                        <Typography variant='overline'>Produto</Typography>
                        <Typography variant='overline'>Preço</Typography>
                    </Grid>
                    <Divider />
                    {cart.cartItems.map((cartItem) => {
                        return (
                            <Grid container spacing={2} key={cartItem.id} sx={{ my: 2 }} className="GERAL">
                                <Grid item className='IMAGEM'>
                                    <NewLink to={`/details/${cartItem.id}`}>
                                        <Img
                                            sx={{ width: 100, height: 150 }}
                                            src={cartItem.image} alt={cartItem.name} />
                                    </NewLink>
                                </Grid>
                                <Grid item xs={4} sm container className='DOIS' >
                                    <Grid item xs container direction="column" className='TITULO'>
                                        <Grid item xs>
                                            <Grid item sm={10} xs={12}>
                                                <NewLink to={`/details/${cartItem.id}`}>
                                                    {cartItem.title}
                                                </NewLink>
                                            </Grid>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    width: "100px",
                                                    height: "30px",
                                                    border: "0.5px solid #b1b1b1",
                                                    borderRadius: "5px",
                                                    mt: 1,
                                                }}
                                            >
                                                <Button onClick={() => handleDecreaseItemCart(cartItem)}
                                                    sx={{
                                                        '&:hover': {
                                                            backgroundColor: "transparent"
                                                        }
                                                    }}
                                                >
                                                    -
                                                </Button>
                                                <Box sx={{ lineHeight: "30px" }}>
                                                    {cartItem.cartQuantity}
                                                </Box>
                                                <Button onClick={() => handleIncreasingItemCart(cartItem)}
                                                    sx={{
                                                        '&:hover': {
                                                            backgroundColor: "transparent"
                                                        }
                                                    }}
                                                >
                                                    +
                                                </Button>
                                            </Box>
                                            <Typography
                                                variant='caption'
                                                onClick={() => handleRemoveItemCart(cartItem)}
                                                sx={{
                                                    mt: 1,
                                                    width: "40px",
                                                    cursor: "pointer",
                                                    display: "block",
                                                    '&:hover': {
                                                        textDecoration: "underline"
                                                    }
                                                }}
                                            >
                                                Excluir
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item display="flex" flexDirection="column" alignItems="flex-end" className='PRECO'>
                                        <Span>
                                            R$ {cartItem.price * cartItem.cartQuantity}
                                        </Span>
                                        <Typography variant="caption" component="div">
                                            R${cartItem.price} x {cartItem.cartQuantity}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    })}
                    <SubTotal />
                </Box>
            )}
            {/* <div className="continue-shopping">
                <Link to="/">
                    Voltar ao início
                </Link>
            </div> */}
        </Box>
    )
}


// <Container fixed>
//     <Grid container spacing={3}>
//         <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
//             <Grid container>
//                 <Grid item xs>
//                     <ShoppingCartItem />
//                 </Grid>
//             </Grid>
//         </Grid>
//         <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
//             <OrderSummaryItem />
//         </Grid>
//     </Grid>
// </Container>