import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export class Articles extends Component {
    static displayName = Articles.name;

    render() {
        const articles = this.props.articles;
        if (!articles) return <h1>Articles do not exist!</h1>
        return (
            <>
                {articles.map((article, key) => (
                    <div>
                        <Link className="text-dark nav-link p-0" to={`/article/${article.name}`}>
                            <h4>{article.title}</h4>
                        </Link>
                        <p>{article.content[0].substring(0, 150)}...</p>
                    </div>
                ))}
            </>
        );
    }
}
