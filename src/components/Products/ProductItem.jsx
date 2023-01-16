import React from 'react';
import { Link } from 'react-router-dom';
import { Rating, Box, Typography } from "@mui/material";
import {Span} from '../../assets/styles/Span';

export const ProductItem = ({ id, name, price, rating, image, title, category }) => {
    return (
        <Box
            key={id}
            sx={{
                display: "flex",
                display: "-webkit-flex",
                flexDirection: "column",
                WebkitFlexDirection: "column",
                justifyContent: "center",
                backgroundColor: "#fff",
                boxShadow: 5,
                borderRadius: 1,
                maxWidth: {
                    xs: "250px",
                    sm: "250px",
                    md: "280px",
                    lg: "300px",
                    xl: "300px"
                },
                // height: "400px",
                width: "300px",
                px: 2,
                py: 2,
                mx: 2,
                mt: 5,
                mb: 5
            }}
        >
            <Link
                style={{
                    textDecoration: "none",
                    color: "#000"
                }}
                to={`/details/${id}`}
            >
                <Box
                    sx={{ height: "150px", marginBottom: "15px" }}>
                    <img src={image} alt={name}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain"
                        }}
                    />
                </Box>
                <Box>
                    <Typography>{title}</Typography>
                    <Box
                        sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <Span>R${price}</Span>
                        <Rating
                            sx={{ color: "#FFA41C" }}
                            name="half-rating-read"
                            defaultValue={rating.rate}
                            precision={0.5}
                            readOnly
                        />
                        <Span>({rating.rate})</Span>
                    </Box>
                </Box>
            </Link>
            <Typography variant="overline">Categoria: {category}</Typography>
        </Box>
    )
}
