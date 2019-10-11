import React, { Component } from 'react';
import axios from 'axios';
import '../index.css'
import { isMyComments, structureRes } from "./helper"
import Comments from "./Comments";
import Modal from "../ModalComponent"
import { Button, Row } from "reactstrap"
class ViewComment extends Component {
    constructor() {
        super();
        this.state = {
            comment: null,
            editId: null,
            text: null,
            reply: false,
            replyText: null,
            replyId: null,
            replyArray: [],
            author: null,
            modal: false,
            editText: ""
        }
    }
    componentDidMount() {
        // console.log(this.props)
        axios.get(`http://localhost:8080/myblogs/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    comment: res.data,
                    replyArray: [...res.data.replies]
                })
            })
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleInputChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }
    handleEdit = (commentId, comment) => {
        this.setState(prevState => ({
            modal: !prevState.modal,
            editId: commentId,
            editText: comment
        }));
    }
    handleEditDone = (text) => {
        let reqBody = {
            id: this.props.match.params.id,
            comment: text,
            editId: this.state.editId
        }
        axios.put(`http://localhost:8080/myblogs/editMyComment`, reqBody)
            .then(res => {
                this.setState(prevState => ({
                    comment: res.data,
                    replyArray: [...res.data.replies]
                }));
            })
    }
    handleReplyComment = (author, id) => {
        this.setState(prevState => ({
            reply: !prevState.reply,
            replyId: id,
            author
        }));
    }

    handleReplyEdit = () => {

    }

    handleInputReplyChange = (e) => {
        this.setState({
            replyText: e.target.value
        })
    }
    handleCancelReply = () => {
        this.setState(prevState => ({
            reply: !prevState.reply,
            replyText: null,
            author: null,
        }));
    }

    handlePostComment = () => {
        let obj = {
            comment: this.state.replyText,
            _id: this.props.match.params.id,
            author: localStorage.getItem('UserId'),
            authorName: localStorage.getItem('UserName'),
            replyId: this.state.replyId
        }
        axios.put(`http://localhost:8080/myblogs/addReply`, obj)
            .then(res => {
                this.setState(prevState => ({
                    reply: !prevState.reply,
                    replyText: null,
                    replyArray: res.data.replies
                }));
            })
    }

    render() {
        return (
            <>
                <div className="">
                    <div>
                        <div className="w3-panel w3-leftbar w3-sand w3-serif">
                            <p className="w3-xxlarge ">{this.state.comment && this.state.comment.comment}</p>

                            <p>by:<i>{this.state.comment && this.state.comment.authorName}</i></p>
                        </div>
                        <Button outline color="primary" className="ml-2" onClick={() => this.handleReplyComment(localStorage.getItem('UserId'), null)}>Reply</Button>
                        {isMyComments(this.state.comment && this.state.comment.author) ?
                            <Button outline color="secondary" className="ml-2" onClick={() => this.handleEdit(null, this.state.comment.comment)}>Edit</Button> : null}
                    </div>
                    <hr />
                    <Comments
                        padding={2}
                        replies={this.state.replyArray}
                        handleReplyComment={this.handleReplyComment}
                        edit={this.handleEdit} />
                    {this.state.reply ? <Row class="footer" className="mt-2 pl-5">
                        <textarea rows="2" cols="50"
                            value={this.state.replyText}
                            onChange={this.handleInputReplyChange}
                        />
                        <Button outline color="primary" className="ml-2" onClick={this.handlePostComment}>Post</Button>
                        <Button outline color="danger" className="ml-2" onClick={this.handleCancelReply}>Cancel</Button>
                    </Row> : null}
                </div >
                <Modal toggle={this.toggle}
                    modal={this.state.modal}
                    editText={this.state.editText}
                    handleEditDone={this.handleEditDone} />
            </>
        );
    }
}

export default ViewComment;
