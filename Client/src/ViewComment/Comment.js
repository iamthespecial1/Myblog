import React from 'react';
import Comments from "./Comments"
import { isMyComments } from "./helper"
import { Button } from "reactstrap"
export default ({ comment, padding, handleReplyComment, edit }) => {
    let style = {
        marginLeft: `${padding}px`
    }
    const reply = (comment) => {
        handleReplyComment(comment.author, comment._id)
    }
    const handleEdit = (comment) => {
        edit(comment._id, comment.comment)
    }
    return <div style={style} className="box mt-10 pb-3">
        <p>{comment.authorName} says {comment.comment}</p>
        <Button outline color="primary" className="ml-2" onClick={() => reply(comment)}>Reply</Button>
        {isMyComments(comment.author) ? <Button outline color="secondary" className="ml-2"
            onClick={() => handleEdit(comment)}>Edit</Button> : null}
        <Comments padding={padding}
            replies={comment.replies} handleReplyComment={handleReplyComment}
            edit={edit} />
    </div>
}
