import React, { useState } from 'react';
import { observer } from 'mobx-react';
export const CounterButton = observer(({ counterObservable }) => {
    const [incrementBy, setIncrementBy] = useState(1);
    return (
        <>
            <p aria-live="polite">Current count: <strong>{counterObservable.counter}</strong></p>
            <div className="form-inline">
                <div className="form-group">
                    <label htmlFor="incrementBy" className="col-form-label">Increment By:</label>
                    <input type="number" className="form-control" id="incrementBy"
                        value={incrementBy}
                        onChange={e => setIncrementBy(Number(e.target.value))}
                    />
                </div>
                <button className="btn btn-primary"
                    onClick={() => counterObservable.increment(incrementBy)}
                >Increment</button>
            </div>
        </>
    );
});


