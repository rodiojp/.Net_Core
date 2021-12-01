import React, { Component, lazy, Suspense } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
//import { Home } from './pages/Home';
//import { FetchData } from './pages/FetchData';
//import { Counter } from './pages/Counter';
import './custom.css'
//import { About } from './pages/About';
const Home = lazy(() => import('./pages/Home'))
const FetchData = lazy(() => import('./pages/FetchData'))
const Counter = lazy(() => import('./pages/Counter'))
const About = lazy(() => import('./pages/About'))

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Suspense fallback={<p>Loading components...</p>}>
                    <Route exact path='/' component={Home} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/fetch-data' component={FetchData} />
                    <Route path='/about' component={About} />
                </Suspense>
            </Layout>
        );
    }
}
