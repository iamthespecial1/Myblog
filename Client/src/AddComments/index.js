import React, { Component } from 'react';
import axios from 'axios';
import '../Comments/index.css'
import { Button } from 'reactstrap';
class AddComments extends Component {
    constructor() {
        super();
        this.state = {
            comment: null
        }
    }

    handleRoute = () => {
        this.props.history.push("/addComment")
    }
    handleInputChange = (e) => {
        this.setState({
            comment: e.target.value
        })
    }
    handleSubmit = () => {
        let obj = {
            author: localStorage.getItem('UserId'),
            authorName: localStorage.getItem('UserName'),
            comment: this.state.comment
        }
        axios.post(`http://localhost:8080/myblogs/postdata`, obj)
            .then(res => {
                this.props.history.push("/comments")
            })
    }

    render() {

        return (
            <div className="App">
                <h1>Add Comments</h1>
                <div className="container">
                    <div className="w3-panel w3-leftbar w3-sand w3-xxlarge w3-serif pt-5 pad-bot">
                        <p><textarea rows="4" cols="50"
                            value={this.state.comment}
                            onChange={this.handleInputChange}
                            placeholder="type something ..."
                        /></p>

                        <Button outline color="primary" onClick={this.handleSubmit}>Submit</Button>{' '}
                    </div>
                </div>
            </div>

        );
    }
}

export default AddComments;
