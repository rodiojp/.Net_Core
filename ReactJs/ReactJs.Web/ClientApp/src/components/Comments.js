import React, { Component } from 'react';

const Comments = ({ comments }) => {

    return (
        <>
            <h4>Comments</h4>
            {comments.map((comment, key) => (
                <p key={key}>{comment.username}: {comment.comment}</p>
            ))}
        </>
    );
};
export default Comments;

