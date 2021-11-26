import React, { useState, useEffect } from 'react';
import articleContent from '../components/article-content'
import { Articles } from '../components/Articles';
import { NotFoundPage } from './NotFoundPage';
import Comments from '../components/Comments';
import UpvotesSection from '../components/UpvotesSection'
import AddComment from '../components/AddComment'

const Article = ({ match }) => {
    const name = match.params.name;
    const article = articleContent.find(article => article.name === name);

    const [articleInfo, setArticleInfo] = useState({ voutes: 0, comments: [] });

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:1337/api/articles/${name}/voute`
            console.log(url);
            const result = await fetch(url)
            const { voutes, comments } = await result.json();
            console.log(voutes, comments)
            setArticleInfo({ voutes: voutes, comments: comments });
        }
        fetchData();
    }, [name]); // without [name] array parameter, this code will be infinitely updating the counter

    if (!article) return <NotFoundPage />

    const otherArticles = articleContent.filter(x => x.name !== name);
    return (
        <>
            <div>
                <h1>{article.title}</h1>
                <UpvotesSection name={name} voutes={articleInfo.voutes} setArticleInfo={setArticleInfo} />
                {article.content.map((paragraph, key) => (
                    <p key={key}>{paragraph}</p>
                ))}
            </div>
            <div>
                <h2>Other articles</h2>
                <Articles articles={otherArticles}></Articles>
                <div>
                    <h4>Comments</h4>
                    <AddComment name={name} setArticleInfo={setArticleInfo} />
                    <Comments comments={articleInfo.comments} />
                </div>
            </div>
        </>
    );
}
export default Article;
