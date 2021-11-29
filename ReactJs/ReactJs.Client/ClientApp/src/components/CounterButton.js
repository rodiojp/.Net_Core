import React from 'react';
import { useRecoilState } from 'recoil'
import { counterState } from './counterState'
import { incrementByState } from './incrementByState'

export const CounterButton = () => {
    const [currentCount, setCurrentCount] = useRecoilState(counterState);
    const [incrementBy, setIncrementBy] = useRecoilState(incrementByState);

    return (
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
    );
}


