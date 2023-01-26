import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    Button,
    InputBase,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Collapse
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllCategoriesQuery } from "../../services/features/api/shopApiSlice";
import { styled as styledMui, alpha } from "@mui/material/styles";
import styled, { keyframes } from "styled-components";
import { SearchInput } from './SearchInput';

const drawerWidth = 240;

const Search = styledMui("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 1),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.95)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
    }
}));

const styledAnimation = keyframes`
0% { 
  transform: rotate(-15deg);
}
50% { 
  transform: rotate(0deg);
}
 100% { 
  transform: rotate(15deg);
   }
`;

const NavIconWrapper = styled.div`
  position: relative;
`;

const Bubble = styled.div`
  position: absolute;
  top: -6px;
  right: -3px;
  font-size: 16px;
  font-weight: bold;
  color: #ff6700;
  animation: ${(props) => (props.animateTotalCart ? styledAnimation : null)} 1s;
`;

export const NavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { data, error, isLoading } = useGetAllCategoriesQuery();
    const { cartTotalQuantity } = useSelector((state) => state.cart);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [categoriesMobileOpen, setCategoriesMobileOpen] = useState(false);
    const [animateTotalCart, setAnimateTotalCart] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen((prevState) => !prevState);
        if (categoriesMobileOpen === true) {
            setCategoriesMobileOpen(!categoriesMobileOpen);
        }
    };

    useEffect(() => {
        if (cartTotalQuantity !== 0) {
            setAnimateTotalCart(true);
            setTimeout(() => {
                setAnimateTotalCart(false);
            }, 1000);
        }
    }, [cartTotalQuantity]);

    const handleOpenCategoriesMobile = () => {
        setCategoriesMobileOpen(!categoriesMobileOpen);
    };

    const handleOpenCategories = (event) => {
        if (categoriesOpen !== event.currentTarget) {
            setCategoriesOpen(event.currentTarget);
        }
    };
    const handleCloseCategories = () => {
        setCategoriesOpen(false);
    };

    const drawer = (
        <Box>
            <IconButton onClick={handleDrawerToggle}
                sx={{ position: "relative" }}
            >
                <CloseIcon
                    sx={{ position: "absolute", left: 210, top: 7 }}
                />
            </IconButton>
            <Divider sx={{ marginTop: 3 }} />
            <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
                <Link
                    style={{ textDecoration: "none", color: "#000" }}
                    to="/"
                    onClick={handleDrawerToggle}
                >
                    Fake Shopping Cart
                </Link>
            </Typography>
            <Divider />
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                onClick={handleOpenCategoriesMobile}
            >
                <ListItemButton>
                    <ListItemText primary="Categorias" />
                    {categoriesMobileOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={categoriesMobileOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {data?.map((product) => (
                            <ListItemButton sx={{ pl: 4 }} key={product}
                                onClick={handleDrawerToggle}
                            >
                                <Link
                                    style={{ textDecoration: "none", color: "#000" }}
                                    to={`/category/${product}`}
                                >
                                    <ListItemText primary={product} />
                                </Link>
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: "none", sm: "none", md: "block" } }}
                    >
                        <Link
                            style={{ textDecoration: "none", color: "#fff" }}
                            to="/"
                        >
                            Fake Shopping Cart
                        </Link>
                    </Typography>
                    <Search>
                        <SearchInput />
                    </Search>
                    <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                        <Button
                            aria-owns={categoriesOpen ? "simple-menu" : undefined}
                            aria-haspopup="true"
                            onClick={handleOpenCategories}
                            onMouseOver={handleOpenCategories}
                            style={{ color: "#fff" }}
                        >
                            Categorias
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={categoriesOpen}
                            open={Boolean(categoriesOpen)}
                            onClose={handleCloseCategories}
                            MenuListProps={{ onMouseLeave: handleCloseCategories }}
                            disableScrollLock={true}
                        >
                            {data?.map((product) => (
                                <MenuItem
                                    onClick={handleCloseCategories}
                                    key={product}
                                >
                                    <Link
                                        style={{ textDecoration: "none", color: "#000" }}
                                        to={`/category/${product}`}
                                    >
                                        {product}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Link to="/cart">
                        <NavIconWrapper>
                            <Bubble animateTotalCart={animateTotalCart}>
                                {cartTotalQuantity}
                            </Bubble>
                            <IconButton sx={{ color: "background.paper" }}>
                                <ShoppingCartIcon fontSize="large" />
                            </IconButton>
                        </NavIconWrapper>
                    </Link>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                    disableScrollLock={true}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth
                        }
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}