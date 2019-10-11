import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import { Button } from 'reactstrap'
class Register extends Component {
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
        axios.post(`http://localhost:8080/users/register`, this.state)
            .then(res => {
                if (res.success) {
                    this.props.history.push("/login")
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
                    <Button onClick={this.handleSubmit} className="mt-5">Register</Button>
                </header>
            </div>

        );
    }
}

export default Register;
