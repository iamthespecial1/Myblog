import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import { Button } from 'reactstrap'
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null
        }
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = () => {
        axios.post(`http://localhost:8080/users/authenticate`, this.state)
            .then(res => {
                console.log(res);
                console.log(res.data);
                if (res.data.success) {
                    localStorage.setItem('UserId', res.data.user.id);
                    localStorage.setItem('UserName', res.data.user.username);
                    this.props.history.push("/comments")
                }

            })

    }


    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <form>
                        <div className="d-flex">
                            <label>
                                Username:

                            </label>
                            <input
                                name="username"
                                type="text"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                className="form-control" />
                        </div>

                        <br />
                        <div className="d-flex">
                            <label>
                                Password:
                        </label>
                            <input
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                className="form-control" />
                        </div>

                    </form>
                    <div className="mt-3 ml-2">
                        <Button onClick={this.handleSubmit}>Login</Button>
                        <Button onClick={() => this.props.history.push('/register')}
                            color="primary" className="ml-5">Go to Register</Button>
                    </div>
                </header>
            </div>

        );
    }
}

export default Login;
