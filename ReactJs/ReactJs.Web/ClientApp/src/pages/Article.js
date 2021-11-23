import React, { Component, useState, useEffect } from 'react';
import articleContent from '../components/article-content'
import { Articles } from '../components/Articles';
import { NotFoundPage } from './NotFoundPage';

export class Article extends Component {
    static displayName = Article.name;
    constructor(props) {
        super(props);
        this.state = { upvotes: 0, comments: [] };
    }
    render() {
        const name = this.props.match.params.name;
        const article = articleContent.find(x => x.name === name);
        if (!article) return <NotFoundPage />
        const otherArticles = articleContent.filter(x => x.name !== name);
        return (
            <>
                <div>
                    <h1>{article.title}</h1>
                    <div>This post has been upvoted {this.state.upvotes} times  
                        <b className="btn btn-outline-primary btn-sm p-0" onClick={() => this.setState({ upvotes: this.state.upvotes + 1 })}>up vote</b>
                    </div>
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


