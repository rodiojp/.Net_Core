import React from 'react';
import { CounterContext, themes } from './CounterContext'
export class CounterContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: themes.light,
        };

        this.toggleTheme = () => {
            this.setState(state => ({
                theme:
                    state.theme === themes.dark
                        ? themes.light
                        : themes.dark,
            }));
        };
    }
    render() {
        return <CounterContext.Provider value={this.state.theme}>{this.props.children}</CounterContext.Provider>
    }
}

