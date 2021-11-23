import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { NotFoundPage } from './components/NotFoundPage';
import { Article } from './components/Article';

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
                        <Route path='/counter' component={Counter} />
                        <Route path='/fetch-data' component={FetchData} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </Layout>
            </Router>
        );
    }
}
