import React, { Component } from 'react';

export class NotFoundPage extends Component {
    static displayName = NotFoundPage.name;

    render() {
        return (
            <React.Fragment>
                <h1>404: Page Not Found!</h1>
            </React.Fragment>
        );
    }
}
