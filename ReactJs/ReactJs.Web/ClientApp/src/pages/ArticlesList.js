import React, { Component } from 'react';
import articleContent from '../components/article-content'
import { Articles } from '../components/Articles';


export class ArticlesList extends Component {
    static displayName = ArticlesList.name;

    render() {
        if (!articleContent) return <h1>Articles do not exist!</h1>
        return (
            <>
                <h1>Articles</h1>
                <Articles articles={articleContent}></Articles>
            </>
        );
    }
}

