import React, { useState, useEffect } from 'react';
import articleContent from '../components/article-content'
import { Articles } from '../components/Articles';
import { NotFoundPage } from './NotFoundPage';

const Article = ({ match }) => {
    const name = match.params.name;
    const article = articleContent.find(article => article.name === name);

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

    useEffect(() => {
        setArticleInfo({ upvotes: Math.ceil(Math.random() * 10) });
    }, [name]); // without [name] array parameter, this code will be infinitely updating the counter

    if (!article) return <NotFoundPage />

    const otherArticles = articleContent.filter(x => x.name !== name);
    return (
        <>
            <div>
                <h1>{article.title}</h1>
                <p>This post has been upvoted {articleInfo.upvotes} times</p>
                {article.content.map((paragraph, key) => (
                    <p key={key}>{paragraph}</p>
                ))}
            </div>
            <div>
                <h2>Other articles</h2>
                <Articles articles={otherArticles}></Articles>
            </div>
        </>
    );
}
export default Article;
