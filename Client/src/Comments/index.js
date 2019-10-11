import React, { Component } from 'react';
import axios from 'axios';
import './index.css'
class Comments extends Component {
    constructor() {
        super();
        this.state = {
            comments: []
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:8080/myblogs/getAll`)
            .then(res => {
                this.setState({
                    comments: res.data
                })
            })
    }

    handleRoute = () => {
        this.props.history.push("/addComment")
    }
    handleNavigate = (id) => {
        this.props.history.push(`/viewComment/${id}`)
    }

    render() {

        return (
            <div className="App">
                <h1>All Comments</h1>
                <div className="container">
                    {this.state.comments && this.state.comments.length === 0 ?
                        <div>No Comments? Click on + button to add Comments</div> : null}
                    {this.state.comments.map((data, index) => {
                        return <div className="w3-panel w3-leftbar w3-sand w3-xxlarge w3-serif pad-bot hand"
                            key={data._id}
                            onClick={() => this.handleNavigate(data._id)}
                        >
                            <p><i>{data.comment}</i></p>
                        </div>
                    })}
                    <div className="float" onClick={this.handleRoute}>
                        <div className="my-float">+</div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Comments;
