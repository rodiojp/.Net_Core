import React, { Component } from 'react';
import { Articles } from '../components/Articles';

const _emptyArtiles = { articles: [], isFetching: true };

export class ArticlesList extends Component {
    constructor(props) {
        super(props);
        this.state = _emptyArtiles;
    }

    componentDidMount() {
        this.fetchUsers();
        this.timer = setInterval(() => this.fetchUsers(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    async fetchUsers() {
        this.setState({ ...this.state, isFetching: true });
        const url = `http://localhost:1337/api/articles/`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        this.setState({ articles: data, isFetching: false });
    }

    render() {
        let contents = this.state.isFetching
            ? <p><em>Loading...</em></p>
            : <Articles articles={this.state.articles}></Articles>
        return (
            <React.Fragment>
                <h1 id="articles">Articles</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </React.Fragment>
        );
    }
}

