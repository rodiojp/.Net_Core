import React from 'react';
import { useRecoilState } from 'recoil'
import { counterState } from './counterState'
import { incrementByState } from './incrementByState'

export const CounterButton = () => {
    const [clicksData, setClicksData] = useRecoilState(counterState);
    const [incrementBy, setIncrementBy] = useRecoilState(incrementByState);

    return (
        <div className="form-inline">
            <div className="form-group">
                <label htmlFor="incrementBy" className="col-form-label">Increment By:</label>
                <input type="number" className="form-control" id="incrementBy"
                    value={incrementBy}
                    onChange={e => setIncrementBy(Number(e.target.value))}
                />
            </div>

            <button className="btn btn-primary"
                onClick={() => setClicksData([...clicksData, { timestamp: Date.now(), amount: incrementBy }])}
            >Increment</button>
        </div>
    );
}


