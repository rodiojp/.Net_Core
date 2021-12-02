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
