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
    IconButton
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllCategoriesQuery } from "../../services/features/api/shopApiSlice";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled as styledMui, alpha } from "@mui/material/styles";
import styled, { keyframes } from "styled-components";

const drawerWidth = 240;

const Search = styledMui("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
    }
}));

const SearchIconWrapper = styledMui("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));

const StyledInputBase = styledMui(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch"
        }
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
  /* height: 20px;
  line-height: 20px; */
  /* width: 20px; */
  /* border-radius: 50%; */
  font-size: 16px;
  font-weight: bold;
  /* text-align: center; */
  color: #ff6700;
  /* background-color: #ff6700; */
  animation: ${(props) => (props.animateTotalCart ? styledAnimation : null)} 1s;
`;

export const NavBar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { data, error, isLoading } = useGetAllCategoriesQuery();
    const { cartTotalQuantity } = useSelector((state) => state.cart);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [animateTotalCart, setAnimateTotalCart] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    useEffect(() => {
        if (cartTotalQuantity !== 0) {
            setAnimateTotalCart(true);
            setTimeout(() => {
                setAnimateTotalCart(false);
            }, 1000);
        }
    }, [cartTotalQuantity]);

    const handleOpenCategories = (event) => {
        if (categoriesOpen !== event.currentTarget) {
            setCategoriesOpen(event.currentTarget);
        }
    };
    const handleCloseCategories = () => {
        setCategoriesOpen(false);
    };

    const handleCategoriesChange = (event, value) => {
        setCategoriesOpen(event.currentTarget);
        console.log("VALUE: ", value);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <Link
                    style={{ textDecoration: "none", color: "#000" }}
                    to="/"
                >
                    Fake Shopping Cart
                </Link>
            </Typography>
            <Divider />
            {/* <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: "center" }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
            <Button
                aria-owns={categoriesOpen ? "simple-menu" : undefined}
                aria-haspopup="true"
                onClick={handleOpenCategories}
                onMouseOver={handleOpenCategories}
                style={{ color: "#000" }}
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
                    <MenuItem onClick={handleCloseCategories} key={product}>
                        <Link
                            style={{ textDecoration: "none", color: "#000" }}
                            onClick={(e) => handleCategoriesChange(e, product)}
                            to={`/category/${product}`}
                        >
                            {product}
                        </Link>
                    </MenuItem>
                ))}
            </Menu>
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
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
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
                                    disableScrollLock={true}
                                >
                                    <Link
                                        style={{ textDecoration: "none", color: "#000" }}
                                        onClick={(e) => handleCategoriesChange(e, product)}
                                        to={`/category/${product}`}
                                    >
                                        {product}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Link to="/cart">
                        <div className="nav-bag">
                            <NavIconWrapper>
                                <Bubble animateTotalCart={animateTotalCart}>
                                    {cartTotalQuantity}
                                </Bubble>
                                <IconButton sx={{ color: "background.paper" }}>
                                    <ShoppingCartIcon fontSize="large" />
                                </IconButton>
                            </NavIconWrapper>
                        </div>
                    </Link>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
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