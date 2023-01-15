import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

export const PageNotFound = () => {
  return (
    <Box>
      <h2>404</h2>
      <div>Página não encontrada</div>
      <Link to="/">Ir para a página inicial</Link>
    </Box>
  )
}
