import React from 'react';
import { useRecoilValue } from 'recoil'
import { counterState } from './counterState'

export const CounterDisplay = () => {
    const currentCount = useRecoilValue(counterState);

    return (
        <p aria-live="polite">Current count: <strong>{currentCount}</strong></p>
    );
}
