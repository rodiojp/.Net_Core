import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { FetchData } from './pages/FetchData';
import { Counter } from './pages/Counter';

import './custom.css'
import { RecoilRoot } from 'recoil'
import { CounterForm } from './pages/CounterForm';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <RecoilRoot>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/fetch-data' component={FetchData} />
                    <Route path='/counterform' component={CounterForm} />
               </Layout>
            </RecoilRoot>
        );
    }
}
