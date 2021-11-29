import React, { useContext } from 'react';
import { useRecoilState } from 'recoil'
import { counterState } from '../components/counterState'
import { incrementByState } from '../components/incrementByState'

export const CounterButton = () => {
    const [currentCount, setCurrentCount] = useRecoilState(counterState);
    const [incrementBy, setIncrementBy] = useRecoilState(incrementByState);

    return (
        <>
            <h1>Counter Button</h1>
            <p>This is a simple example of accessing <strong>Recoil State</strong> inside of <strong>React Functional Component</strong>.</p>
            <p aria-live="polite">Current count: <strong>{currentCount}</strong></p>
            <div class="form-inline">
                <div class="form-group">
                    <label for="incrementBy" class="col-form-label">Increment By:</label>
                    <input type="number" class="form-control" id="incrementBy"
                        value={incrementBy}
                        onChange={e => setIncrementBy(Number(e.target.value))}
                    />
                </div>

                <button className="btn btn-primary"
                    onClick={() => setCurrentCount(currentCount + incrementBy)}
                >Increment</button>
            </div>
        </>
    );
}


