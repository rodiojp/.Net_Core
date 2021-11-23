import React, { Component } from 'react';
import articleContent from '../components/article-content'
import { Link } from 'react-router-dom';


export class ArticlesList extends Component {
    static displayName = ArticlesList.name;

    render() {
        if (!articleContent) return <h1>Articles do not exist!</h1>
        return (
            <>
                <h1>Articles</h1>
                {articleContent.map((article, key) => (
                    <div>
                        <Link className="text-dark nav-link p-0" key={key} to={`/article/${article.name}`}>
                            <h3>{article.title}</h3>
                        </Link>
                        <p key={key}>{article.content[0].substring(0, 250)}...</p>
                    </div>
                ))}
            </>
        );
    }
}

