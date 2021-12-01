import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { FetchData } from './pages/FetchData';
import { Counter } from './pages/Counter';
import './custom.css'
import { About } from './pages/About';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/about' component={About} />
      </Layout>
    );
  }
}
