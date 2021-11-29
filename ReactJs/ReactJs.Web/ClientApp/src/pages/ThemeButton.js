import React, { Component } from 'react';
import { ThemeContext } from '../components/ThemeContext';

export class ThemeButton extends Component {
    static displayName = ThemeButton.name;

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // let value = this.context;
        /* perform a side-effect at mount using the value of MyContext */
    }
    componentDidUpdate() {
        // let value = this.context;
        /* ... */
    }
    componentWillUnmount() {
        let value = this.context;
        /* ... */
    }

    // this.context: {
    //     theme: { foreground: '#000000', background: '#eeeeee' }
    //     toggleTheme: () => { … }
    //  }
    render() {
        // let props = this.props;
        let value = this.context;
        console.log(value);
        return (
            <>
                <h1>Theme Button</h1>

                <p>This is a simple example of accessing Context inside a <strong>React Class Component</strong>.</p>

                <button className="btn"
                    style={{ color: value.theme.foreground, backgroundColor: value.theme.background }}
                    onClick={value.toggleTheme}
                >Change Color</button>
            </>
        );
    }
}

ThemeButton.contextType = ThemeContext;
