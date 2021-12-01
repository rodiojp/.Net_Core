### MobX

#### Installation
[Installation of mobx](https://mobx.js.org/installation.html)
- `npm install mobx`

This [mobx-react](https://www.npmjs.com/package/mobx-react) package provides the bindings for MobX and React.

- `npm install mobx-react`

`import { observer } from "mobx-react"`

#### Examples
[Example: makeObservable](https://mobx.js.org/actions.html#examples)

**CounterObservable.js**
```jsx
import { makeObservable, observable, action } from 'mobx';

export class CounterObservable {

    counter = 0;

    constructor() {
        makeObservable(this, {
            counter: observable,
            increment: action,
        });
    }
    increment = amount => this.counter += amount;

}
```

**CounterButton.js**
```jsx
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
```


**CounterForm.js**
```jsx
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
```

**App.js**
```jsx
import { CounterForm } from './pages/CounterForm';
...
    <Route path='/counterform' component={CounterForm} />
```

**NavMenu.js**
```jsx
<NavItem>
    <NavLink tag={Link} className="text-dark" to="/counterform">Counter Form</NavLink>
</NavItem>

```


