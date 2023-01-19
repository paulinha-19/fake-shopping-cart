import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { Span } from '../../assets/styles';
import { clearCart } from "../../services/features/cart/cartSlice";

export const SubTotal = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    };
    return (
        <Card elevation={15}>
            <CardContent>
                <Typography sx={{ display: "inline" }}>
                    Subtotal ({cart.cartTotalQuantity} itens):
                </Typography>
                <Span>R$ {cart.cartTotalAmount}</Span>
            </CardContent>
            <CardActions>
                <Button color="error" variant='contained' onClick={() => handleClearCart()}>
                    Limpar carrinho
                </Button>
            </CardActions>
            <CardActions>
                <Button color='success' variant='contained'>Fechar pedido</Button>
            </CardActions>
        </Card>
    )
}
