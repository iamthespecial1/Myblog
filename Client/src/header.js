import React from "react";
import { withRouter } from 'react-router-dom';
class Header extends React.Component {
    logout = () => {
        localStorage.removeItem('UserId')
        localStorage.removeItem('UserName')
        this.props.history.push('/login')
        localStorage.getItem('UserId')
    }
    render() {
        let loggedIn = localStorage.getItem('UserId')
        if (loggedIn) {
            return (
                <button onClick={this.logout}>Logout</button>
            )
        }
        else {
            return null
        }

    }
}

export default withRouter(Header);