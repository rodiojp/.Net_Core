import React from 'react';
import { ThemeContext, themes } from './ThemeContext'
export class ThemeContextProvider extends React.Component {
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
        const value = { theme: this.state.theme, toggleTheme: this.toggleTheme }
        return <ThemeContext.Provider value={value}>{this.props.children}</ThemeContext.Provider>
    }
}

