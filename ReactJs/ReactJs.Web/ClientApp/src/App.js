import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { FetchData } from './pages/FetchData';
import { Counter } from './pages/Counter';
import { NotFoundPage } from './pages/NotFoundPage';
import Article from './pages/Article';
import { ArticlesList } from './pages/ArticlesList';
import { ThemeContextProvider } from './components/ThemeContextProvider';
import { ThemeButton } from './pages/ThemeButton';
import { CounterContextProvider } from './components/CounterContextProvider';
import { CounterButton } from './pages/CounterButton';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <ThemeContextProvider>
                <CounterContextProvider>
                    <Router>
                        <Layout>
                            <Switch>
                                <Route path='/' component={Home} exact />
                                <Route path='/article/:name' component={Article} />
                                <Route path='/articleslist' component={ArticlesList} />
                                <Route path='/counter' component={Counter} />
                                <Route path='/themebutton' component={ThemeButton} />
                                <Route path='/counterbutton' component={CounterButton} />
                                <Route path='/fetch-data' component={FetchData} />
                                <Route component={NotFoundPage} />
                            </Switch>
                        </Layout>
                    </Router>
                </CounterContextProvider>
            </ThemeContextProvider>
        );
    }
}
