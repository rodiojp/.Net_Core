import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { FetchData } from './pages/FetchData';
import { Counter } from './pages/Counter';
import { NotFoundPage } from './pages/NotFoundPage';
import { Article } from './pages/Article';
import { ArticlesList } from './pages/ArticlesList';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route path='/' component={Home} exact />
                        <Route path='/article/:name' component={Article} />
                        <Route path='/articleslist' component={ArticlesList} />
                        <Route path='/counter' component={Counter} />
                        <Route path='/fetch-data' component={FetchData} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </Layout>
            </Router>
        );
    }
}
