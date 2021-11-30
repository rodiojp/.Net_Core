import React from 'react';
import { CounterButton } from '../components/CounterButton';
import { CounterDisplay } from '../components/CounterDisplay';

export const CounterForm = () => {
    return (
        <>
            <h1>Counter Button</h1>
            <p>This is a simple example of accessing <strong>Recoil State</strong> inside of <strong>React Functional Component</strong>.</p>
            <div className="border rounded p-3">
                <CounterDisplay/>
                <CounterButton />
            </div>
        </>
    );
}


