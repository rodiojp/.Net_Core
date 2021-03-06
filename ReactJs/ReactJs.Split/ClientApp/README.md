### Code splitting

#### Code splitting basics

The code splitting works for the `export default` components only;

**About.js**
```jsx
import React, { lazy, Suspense } from 'react';
//import { One } from '../components/One';
//import { Two } from '../components/Two';
//import { Three } from '../components/Three';
const One = lazy(() => import('../components/One'))
const Two = lazy(() => import('../components/Two'))
const Three = lazy(() => import('../components/Three'))
export const About = () => {
    return (
        <>
            <h1>About</h1>
            <Suspense fallback={<p>Loading components...</p>}>
                <One />
                <Two />
                <Three />
            </Suspense>
        </>
    );
};
```

**One.js**
```jsx
import React from 'react';

export const One = () => {
    return (
        <div>
            <h2>One</h2>
        </div>
    );
};

export default One;
```

**Two.js**
```jsx
import React from 'react';

export const Two = () => {
    return (
        <div>
            <h2>Two</h2>
        </div>
    );
};

export default Two;
```

**Three.js**
```jsx
import React from 'react';

export const Three = () => {
    return (
        <div>
            <h2>Three</h2>
        </div>
    );
};

export default Three;
```

#### Route-based code splitting

Add `export default` to the respect .js files
```jsx
export default About;
...
export default Counter;
...
export default FetchData;
...
export default Home;
```

**App.js**
```jsx
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
```

#### When to use code splitting

**About.js**
```jsx
import React, { lazy, Suspense, useState } from 'react';
//import { One } from '../components/One';
//import { Two } from '../components/Two';
//import { Three } from '../components/Three';
const One = lazy(() => import('../components/One'))
const Two = lazy(() => import('../components/Two'))
const Three = lazy(() => import('../components/Three'))

export const About = () => {
    const [showComponents, setShowComponents] = useState(false);

    return (
        <>
            <h1>About</h1>
            <button className="btn btn-primary" onClick={() => { setShowComponents(!showComponents) }}>{showComponents ? 'Hide' : 'Show'} Components</button>
            {showComponents && (
                <Suspense fallback={<p>Loading components...</p>}>
                    <One />
                    <Two />
                    <Three />
                </Suspense>
            )}

        </>
    );
};
export default About;
```

### Error boundaries

**ErrorBoundary.js**
```jsx
import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        }
    }
    componentDidCatch(error, errorInfo) {
        console.log({ error, errorInfo });
    }
    getDerivedStateFromError(error) {
        return { error };
    }
    render() {
        if (this.state.error) {
            return <p>Something went wrong!</p>
        }
        return this.props.children;
    }
}
```

**One.js**
```jsx
import React from 'react';

export const One = () => {
    return (
        <div>
            <h2>One</h2>
        </div>
    );
};

export default One;
```

**About.js**
```jsx
import React, { lazy, Suspense, useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary'
//import { One } from '../components/One';
//import { Two } from '../components/Two';
//import { Three } from '../components/Three';
const One = lazy(() => import('../components/One'))
const Two = lazy(() => import('../components/Two'))
const Three = lazy(() => import('../components/Three'))

export const About = () => {
    const [showComponents, setShowComponents] = useState(false);

    return (
        <>
            <h1>About</h1>
            <button className="btn btn-primary" onClick={() => { setShowComponents(!showComponents) }}>{showComponents ? 'Hide' : 'Show'} Components</button>
            {showComponents && (
                <Suspense fallback={<p>Loading components...</p>}>
                    <ErrorBoundary>
                        <One />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <Two />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <Three />
                    </ErrorBoundary>
                </Suspense>
            )}

        </>
    );
};
export default About;

```

**.js**
```jsx

```
