import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import { Home, Cart, PageNotFound, ProductCategory, ProductDetails } from '../page';

export const Routes = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/not-found" component={PageNotFound} />
            <Route path="/details/:productId" component={ProductDetails} />
            <Route path="/category/:nameCategory" component={ProductCategory} />
        </BrowserRouter>
    )
}
