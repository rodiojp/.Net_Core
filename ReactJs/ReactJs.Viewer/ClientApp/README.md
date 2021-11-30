### Redux

#### Installation of Redux
[Install: Redux Core](https://redux.js.org/introduction/installation#redux-core)
- `npm install redux`

[Install Complementary Package: react-redux](https://redux.js.org/introduction/installation#complementary-packages)
- `npm install react-redux`

[react-redux Documentation](https://github.com/reduxjs/react-redux#react-redux)


#### Using Redux

**actions.js**
```jsx
export const counterButtonClicked = amount => ({
    type: 'COUNTER_BUTTON_CLICKED',
    payload: { amount },
});
```

**reducers.js**
```jsx
export const counterReducer = (state = 0, action) => {
    const { type } = action;
    switch (type) {
        case 'COUNTER_BUTTON_CLICKED':
            return state + action.payload.amount;
        default: return state;
    }
    return state;
}
```

**selectors.js**
```jsx
export const getCounter = state => state.counter;
```

**store.js**
```jsx
import { createStore, combineReducers } from 'redux';
import * as reducers from './reducers';

const rootReducer = combineReducers({ counter: reducers.counterReducer })

export const store = createStore(rootReducer);
```

**CounterButton.js**
```jsx
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
```

**App.js**
```jsx
import { Provider } from 'react-redux';
import { store } from './components/store';
import { CounterButton } from './pages/CounterButton';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Provider store={store}>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/fetch-data' component={FetchData} />
                    <Route path='/counterbutton' component={CounterButton} />
                </Layout>
            </Provider>
        );
    }
}
```


**NavMenu.js**
```jsx
<NavItem>
    <NavLink tag={Link} className="text-dark" to="/counterbutton">Counter Button</NavLink>
</NavItem>
```