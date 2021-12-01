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
