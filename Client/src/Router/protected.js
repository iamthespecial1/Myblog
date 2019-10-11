import React from 'react';
import { Route, Redirect } from "react-router-dom";
function PrivateRoute({ component: Component, ...rest }) {
    const greeting = 'Hello Function Component!';
    return <Route {...rest} render={(props) => (
        localStorage.getItem('UserId')
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />;
}
export default PrivateRoute;
