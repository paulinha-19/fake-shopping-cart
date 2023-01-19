import React from 'react';
import { Route, Routes as AllRoutes } from "react-router-dom";
import { Home, New, PageNotFound, ProductCategory, ProductDetails } from '../page';

export const Routes = () => {
    return (
        <AllRoutes>
            <Route path="/" index element={<Home />} />
            <Route path="/cart" element={<New />} />
            <Route path="/details/:productId" element={<ProductDetails />} />
            <Route path="/category/:nameCategory" element={<ProductCategory />} />
            <Route path="*" element={<PageNotFound />} />
        </AllRoutes>
    )
}