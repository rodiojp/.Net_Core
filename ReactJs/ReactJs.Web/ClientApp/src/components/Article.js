import React, { Component } from 'react';
export class Article extends Component {
    static displayName = Article.name;

    render() {
        const { match, location, history } = this.props;
        console.log(match, location, history)
        return (
            <>
                <h1>This is an article:{match.params.name}</h1>
            </>
        );
    }
}
