import React, { useState } from 'react';
import { Box, Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const AlertToUser = ({ error, variant, severity }) => {
    const [openAlert, setOpenAlert] = useState(true);
    return (
        <Box sx={{ display: "flex", justifyContent: "center", width: '100%' }}>
            <Collapse in={openAlert}>
                <Alert
                    variant={variant}
                    severity={severity}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpenAlert(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {error.message}
                </Alert>
            </Collapse>
        </Box>
    )
}
