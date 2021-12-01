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

#### bb
