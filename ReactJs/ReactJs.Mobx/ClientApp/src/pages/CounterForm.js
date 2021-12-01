import React from 'react';
import { CounterButton } from '../components/CounterButton';
import { CounterObservable } from '../components/CounterObservable';

const counterObservable = new CounterObservable();

export const CounterForm = () => {
    return (
        <>
            <h1>Counter Button</h1>
            <p>This is a simple example of accessing <strong>MobX Class component</strong> inside of <strong>React Functional Component</strong>.</p>
            <div className="border rounded p-3">
                <CounterButton counterObservable={counterObservable} />
            </div>
        </>
    );
}


