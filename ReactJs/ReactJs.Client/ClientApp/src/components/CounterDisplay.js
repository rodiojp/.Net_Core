import React from 'react';
import { useRecoilValue } from 'recoil'
import { counterSelector } from './counterSelector'

export const CounterDisplay = () => {
    const counter = useRecoilValue(counterSelector);

    return (
        <p aria-live="polite">Current count: <strong>{counter}</strong></p>
    );
}
