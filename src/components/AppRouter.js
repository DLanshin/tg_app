import React, {Component} from 'react';
import {Routes, Route, Navigate, redirect, useParams} from 'react-router-dom';
import {routes} from "../routes";
import AccessDenied from "../pages/AccessDenied";


const AppRouter = () => {
    const isAuth = true;
    return (
        <Routes>
            {!isAuth ?
                <Route path={'/'} element={<AccessDenied/>}/>
            :
                routes.map(({path, Component}) =>
                    <Route key={path} path={path} element={Component} exact/>
                )
            }
        </Routes>
    );
}

export default AppRouter;
