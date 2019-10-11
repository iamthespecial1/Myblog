import React from "react";
import { Route, Redirect } from "react-router-dom";
import App from "../App";
import Login from "../login";
import Comments from "../Comments"
import AddComments from "../AddComments";
import ViewComment from "../ViewComment";
import Register from "../register"
import PrivateRoute from "./protected"
import Header from "../header"

class RouteComp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            url: null,
            component: null
        }
    }

    componentDidMount() {
    }
    render() {
        return (
            <React.Fragment>
                <Header />
                <Route exact path="/" component={App} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/comments" component={Comments} />
                <PrivateRoute exact path="/addComment" component={AddComments} />
                <PrivateRoute exact path="/viewComment/:id" component={ViewComment} />
            </React.Fragment>
        );
    }
}

export default RouteComp;