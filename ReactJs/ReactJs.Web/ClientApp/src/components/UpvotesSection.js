import React from 'react';

const UpvotesSection = ({ name, voutes, setArticleInfo }) => {

    const upvoteClick = async () => {
        console.log("Button clicked!");
        const url = `http://localhost:1337/api/articles/${name}/voute`;
        console.log(url);
        const result = await fetch(url, { method: 'PUT' });
        //.then(res => console.log(res))
        //.then(res => res.text()) // or res.json()
        const { voutes, comments } = await result.json();
        console.log(voutes, comments)
        setArticleInfo({ voutes: voutes, comments: comments });
    };

    return (
        <div>
             <button className="btn btn-primary" onClick={upvoteClick}>up</button>
            <p>This post has been upvoted {voutes} times!</p>
        </div>
    );
};
export default UpvotesSection;

