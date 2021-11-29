import React, { useContext } from 'react';
import { CounterContext } from '../components/CounterContext';

export const CounterButton = () => {
    const { currentCount, incrementCounter } = useContext(CounterContext);

    return (
        <>
            <h1>Counter Button</h1>

            <p>This is a simple example of accessing Context inside a <strong>React Functional Component</strong>.</p>
            <p aria-live="polite">Current count: <strong>{currentCount}</strong></p>
            <button className="btn btn-primary"
                onClick={() => incrementCounter(2)}
            >Increment</button>
        </>
    );
}


