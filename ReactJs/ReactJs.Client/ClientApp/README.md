### Recoil

#### Installation
[How to install](https://recoiljs.org/docs/introduction/installation/)
- `npm install recoil`

#### Using Recoil atom state (Example #1)

**counterState.js**
```jsx
import { atom } from 'recoil';
export const counterState = atom({
    key: 'counterState',
    default: 0
});
```

**incrementByState.js**
```jsx
import { atom } from 'recoil';
export const incrementByState = atom({
    key: 'incrementByState',
    default: 1
});
```
**CounterButton.js**
```jsx
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
```

```jsx
...
import { RecoilRoot } from 'recoil'
import { CounterButton } from './pages/CounterButton';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <RecoilRoot>
                    ...
                    <Route path='/counterbutton' component={CounterButton} />
                    ...
            </RecoilRoot>

        );
    }
}

```

#### Using Recoil atom state (Example #2)

**counterState.js** (atom)
```jsx
import { atom } from 'recoil';
export const counterState = atom({
    key: 'counterState',
    default: 0
});
```

**incrementByState.js** (atom)
```jsx
import { atom } from 'recoil';
export const incrementByState = atom({
    key: 'incrementByState',
    default: 1
});
```


**CounterButton.js** (useRecoilState)
```jsx
import React from 'react';
import { useRecoilState } from 'recoil'
import { counterState } from './counterState'
import { incrementByState } from './incrementByState'

export const CounterButton = () => {
    const [currentCount, setCurrentCount] = useRecoilState(counterState);
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
                onClick={() => setCurrentCount(currentCount + incrementBy)}
            >Increment</button>
        </div>
    );
}
```
**CounterDisplay.js** (useRecoilValue)
```jsx
import React from 'react';
import { useRecoilValue } from 'recoil'
import { counterState } from './counterState'

export const CounterDisplay = () => {
    const currentCount = useRecoilValue(counterState);

    return (
        <p aria-live="polite">Current count: <strong>{currentCount}</strong></p>
    );
}
```
**CounterForm.js**
```jsx
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
```

**App.js**
```jsx
import { CounterButton } from './pages/CounterButton';
...
 <Route path='/counterbutton' component={CounterButton} />
```
**NavMenu.js**
```jsx
<NavItem>
    <NavLink tag={Link} className="text-dark" to="/counterbutton">Counter Button</NavLink>
</NavItem>

```

#### Using Recoil selector state (Example #3)

**counterState.js** (atom)
```jsx
import { atom } from 'recoil';
export const counterState = atom({
    key: 'counterState',
    default: [], //A comma is required!
});
```

**incrementByState.js** (atom)
```jsx
import { atom } from 'recoil';
export const incrementByState = atom({
    key: 'incrementByState',
    default: 1
});
```

**counterSelector.js** (selector)
```jsx
import { counterState } from './counterState'
import { selector } from 'recoil';
export const counterSelector = selector({
    key: 'counterSelector',
    get: ({ get }) => {
        const clicksData = get(counterState);
        const totalClicks = clicksData.reduce((sum, click) => { return sum + click.amount; }, 0);
        return totalClicks;
    },
});
```

**CounterButton.js** (useRecoilState)
```jsx
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
```
**CounterDisplay.js** (useRecoilValue)
```jsx
import React from 'react';
import { useRecoilValue } from 'recoil'
import { counterSelector } from './counterSelector'

export const CounterDisplay = () => {
    const counter = useRecoilValue(counterSelector);

    return (
        <p aria-live="polite">Current count: <strong>{counter}</strong></p>
    );
}
```
**CounterForm.js**
```jsx
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
```

