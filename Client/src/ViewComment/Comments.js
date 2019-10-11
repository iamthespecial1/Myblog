import React from 'react';
import Comment from "./Comment"
export default ({ replies, padding, handleReplyComment, edit }) => {
    return <div>
        {replies && replies.map(function (comment) {
            return <div className="mt-10">
                <Comment key={comment._id} comment={comment} padding={padding * 4}
                    handleReplyComment={handleReplyComment}
                    edit={edit} />
            </div>
        })}
    </div>
}
