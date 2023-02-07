import React, { useState } from 'react';
import { Box, Toolbar, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { Products } from '../../components';
import styled from 'styled-components';
import MoodBadIcon from '@mui/icons-material/MoodBad';

const FeedbackResult = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
`;

export const SearchResult = () => {
  const {
    filteredData,
    searchTerm,
    isLoading,
    error
  } = useSelector((state) => state.search);
  const [noResults] = useState("Nenhum produto encontrado");
  return (
    <Box>
      {filteredData.length === 0 ? (
        <Box>
          <Toolbar />
          <FeedbackResult>
            <Typography>{noResults} para {searchTerm}</Typography>
            <MoodBadIcon sx={{ marginLeft: "10px" }} />
          </FeedbackResult>

        </Box>
      ) :
        <Products data={filteredData} error={error} isError={error} isLoading={isLoading} />
      }
    </Box>
  );
};

