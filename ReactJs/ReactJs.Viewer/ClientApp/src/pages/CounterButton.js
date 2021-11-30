import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../components/selectors';
import * as actions from '../components/actions';

export const CounterButton = () => {
    const currentCounter = useSelector(selectors.getCounter);
    const dispatch = useDispatch();
    const [incrementBy, setIncrementBy] = useState(1);
    return (
        <>
            <h1>Counter Button</h1>

            <p>This is a simple example of accessing Context inside a <strong>React Functional Component</strong>.</p>
            <p aria-live="polite">Current count: <strong>{currentCounter}</strong></p>
            <div className="form-inline">
                <div className="form-group">
                    <label htmlFor="incrementBy" className="col-form-label">Increment By:</label>
                    <input type="number" className="form-control" id="incrementBy"
                        value={incrementBy}
                        onChange={e => setIncrementBy(Number(e.target.value))}
                    />
                </div>
                <button className="btn btn-primary"
                    onClick={() => dispatch(actions.counterButtonClicked(incrementBy))}
                >Increment</button>
            </div>
        </>
    );
}


