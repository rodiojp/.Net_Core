import React from 'react';

const Comments = ({ comments }) => {

    return (
        <div>
            {comments.map((comment, key) => (
                <p key={key}>{comment.username}: {comment.comment}</p>
            ))}
        </div>
    );
};
export default Comments;

