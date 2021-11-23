import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <>
                <NavMenu />
                <Container flex="true" className="px-4">
                    {this.props.children}
                </Container>
            </>
        );
    }
}
