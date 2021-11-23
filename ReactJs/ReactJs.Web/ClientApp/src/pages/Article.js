import React, { Component } from 'react';
import articleContent from '../components/article-content'
import { Articles } from '../components/Articles';
import { NotFoundPage } from './NotFoundPage';

export class Article extends Component {
    static displayName = Article.name;

    render() {
        const name = this.props.match.params.name;
        const article = articleContent.find(x => x.name === name);
        if (!article) return <NotFoundPage/>
        const otherArticles = articleContent.filter(x => x.name !== name);
        return (
            <>
                <div>
                    <h1>{article.title}</h1>
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
}
