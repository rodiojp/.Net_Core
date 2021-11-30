import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { FetchData } from './pages/FetchData';
import { Counter } from './pages/Counter';
import './custom.css'
import { Provider } from 'react-redux';
import { store } from './components/store';
import { CounterButton } from './pages/CounterButton';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Provider store={store}>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/fetch-data' component={FetchData} />
                    <Route path='/counterbutton' component={CounterButton} />
                </Layout>
            </Provider>
        );
    }
}
