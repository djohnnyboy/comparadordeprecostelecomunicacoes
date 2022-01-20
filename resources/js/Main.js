import React from "react";
import {Route, Switch} from "react-router-dom";
import Toggle from "./components/Home/Toggle";
import Login from "./views/Auth/Login/Login";
import Register from "./views/Auth/Register/Register";
import NotFound from "./views/NotFound/NotFound"; 
import PrivateRoute from "./PrivateRoute";
import Dashboard from './views/User/Dashboard/Dashboard';

import CompaniesList from "./views/User/System/Companies/CompaniesList";
import EditCompany from "./views/User/System/Companies/EditCompany";
import AddCompany from "./views/User/System/Companies/AddCompany";

import ProductsList from "./views/User/System/Products/ProductsList";
import EditProduct from "./views/User/System/Products/EditProduct";
import AddProduct from "./views/User/System/Products/AddProduct";

import LocalitiesList from "./views/User/System/Localities/LocalitiesList";
import EditLocality from "./views/User/System/Localities/EditLocality";
import AddLocality from "./views/User/System/Localities/AddLocality";

import Query from './components/Home/Query';

const Main = () => (
    <Switch> 

        <Route exact path="/" component={Toggle} />
        {/* Auth */}

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} /> 

        {/* Logged user */}

        <PrivateRoute path="/dashboard" component={Dashboard} />
        
        <PrivateRoute path="/create-new-company" component={AddCompany} />
        <PrivateRoute path="/companies" component={CompaniesList} />
        <PrivateRoute path="/company/:id/edit" component={EditCompany} />
        
        <PrivateRoute path="/create-new-product" component={AddProduct} />
        <PrivateRoute path="/products" component={ProductsList} />
        <PrivateRoute path="/product/:id/edit" component={EditProduct} />

        <PrivateRoute path="/create-new-locality" component={AddLocality} />
        <PrivateRoute path="/localities" component={LocalitiesList} />
        <PrivateRoute path="/locality/:id/edit" component={EditLocality} />

        {/*Page Not Found*/}

        <NotFound component={NotFound} /> 
        <PrivateRoute  component={NotFound} /> 

    </Switch>
)

export default Main;