import React, { Component } from 'react';
import articleContent from '../components/article-content'
export class Article extends Component {
    static displayName = Article.name;

    render() {
        const name = this.props.match.params.name;
        const article = articleContent.find(x => x.name === name);
        if (!article) return <h1>Article does not exist!</h1>
        return (
            <>
                <h1>{article.title}</h1>
                {article.content.map((paragraph, key) => (
                    <p key={key}>{paragraph}</p>
                ))}
            </>
        );
    }
}
