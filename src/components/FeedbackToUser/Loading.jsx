import React from 'react';
import { Box, Typography } from "@mui/material";
import { Dot, LoadingWrapper } from '../../assets/styles/Dot';

export const Loading = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <LoadingWrapper>
                <Typography variant='overline'>Carregando</Typography>
                <Dot delay="0s" />
                <Dot delay="0.1s" />
                <Dot delay="0.2s" />
            </LoadingWrapper>
        </Box>
    )
}
