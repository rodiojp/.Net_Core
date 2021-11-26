import React, { useState } from 'react';

const AddComment = ({ name, setArticleInfo }) => {
    const [userComment, setUserComment] = useState({ username: '', comment: '' });
    // or
    //const [username, setUsername] = useState('');
    //const [comment, setComment] = useState('');
    const submitUserComment = async () => {
        console.log("Button clicked!");
        const url = `http://localhost:1337/api/articles/${name}/addcomment`;
        console.log(url);
        const result = await fetch(url, {
            method: 'put',
            body: JSON.stringify(userComment),
            headers: { 'Content-Type': 'application/json' }
        });
        //.then(res => console.log(res))
        //.then(res => res.text()) // or res.json()
        const { voutes, comments } = await result.json();
        console.log(voutes, comments)
        setUserComment({ username: '', comment: '' });
        setArticleInfo({ voutes: voutes, comments: comments });
    };

    return (
        <div id="addComment">
            <div class="form-group">
                <label for="username">Username</label>
                <input class="form-control" id="username" value={userComment.username} onChange={(event) => setUserComment({ username: event.target.value, comment: userComment.comment })} />
            </div>

            <div class="form-group">
                <label for="commentText">Add your comment here:</label>
                <textarea class="form-control" id="commentText" rows="3" value={userComment.comment} onChange={(event) => setUserComment({ username: userComment.username, comment: event.target.value })}></textarea>
            </div>
            <button class="btn btn-primary" onClick={submitUserComment}>Add Comment</button>
            <p>{userComment.username}: {userComment.comment}</p>
        </div>
    )
};

export default AddComment;