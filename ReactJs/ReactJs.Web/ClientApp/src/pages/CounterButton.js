import React, { Component } from 'react';
import { CounterContext } from '../components/CounterContext';

export class CounterButton extends Component {
    static displayName = CounterButton.name;

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let value = this.context;
        /* perform a side-effect at mount using the value of MyContext */
    }
    componentDidUpdate() {
        let value = this.context;
        /* ... */
    }
    componentWillUnmount() {
        let value = this.context;
        /* ... */
    }
    // Assign a contextType to read the current theme context.
    // React will find the closest theme Provider above and use its value.
    // In this example, this.context
    // '{{this.state.currentCount, this.incrementCounter}'.
    render() {
        let props = this.props;
        let theme = this.context;
        return (
            <>
                <h1>Counter</h1>

                <p>This is a simple example of a React component.</p>

                <p aria-live="polite">Current count: <strong>5</strong></p>

                <button className="btn"
                    style={{ backgroundColor: theme.background }}
                    onClick={theme.toggleTheme}
                >Increment</button>
            </>
        );
    }
}

CounterButton.contextType = CounterContext;
